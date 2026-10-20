const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

function loadTypeScript(file, overrides = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, URL, Request, Response, Date, console, ...overrides });
  return exports;
}

const { shouldRecoverAssetError, recoveryUrl } = loadTypeScript("src/lib/client-recovery.ts");

test("retries asset failures once per minute without retrying other runtime errors", () => {
  const entries = new Map();
  const storage = {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  };
  const error = { name: "ChunkLoadError", message: "Loading chunk 512 failed" };
  assert.equal(shouldRecoverAssetError(error, storage, "/portfolio/smart-village", 1000), true);
  assert.equal(shouldRecoverAssetError(error, storage, "/portfolio/smart-village", 2000), false);
  assert.equal(shouldRecoverAssetError(error, storage, "/portfolio/smart-village", 62000), true);
  assert.equal(shouldRecoverAssetError({ name: "TypeError", message: "broken UI" }, storage, "/", 1000), false);
});

test("blocked WebView storage cannot cause a recovery loop", () => {
  const storage = { getItem() { throw new Error("SecurityError"); }, setItem() {} };
  assert.equal(shouldRecoverAssetError({ name: "ChunkLoadError", message: "failed" }, storage, "/", 1000), false);
});

test("fresh navigation preserves the destination and replaces the cache-busting parameter", () => {
  assert.equal(
    recoveryUrl("https://example.com/portfolio/smart-village?utm_source=profile&_reload=old#context", 123),
    "https://example.com/portfolio/smart-village?utm_source=profile&_reload=123#context",
  );
});

test("diagnostics reject other origins and malformed payloads, and bound logged values", async () => {
  const logged = [];
  const { POST } = loadTypeScript("src/app/api/client-errors/route.ts", {
    console: { error: (...args) => logged.push(args) },
  });
  const request = (body, origin = "https://example.com", extraHeaders = {}) => new Request(
    "https://example.com/api/client-errors",
    { method: "POST", headers: { origin, ...extraHeaders }, body },
  );
  assert.equal((await POST(request("{}", "https://other.example"))).status, 403);
  assert.equal((await POST(request("invalid"))).status, 400);
  assert.equal((await POST(request("{}"))).status, 400);
  assert.equal((await POST(request("{}", undefined, { "content-length": "9000" }))).status, 413);
  assert.equal((await POST(request(JSON.stringify({
    name: "TypeError", message: "x".repeat(1000), path: "/portfolio/smart-village?secret=value#context", userAgent: "Test WebView",
  })))).status, 204);
  assert.equal(logged.length, 1);
  assert.equal(logged[0][1].message.length, 500);
  assert.equal(logged[0][1].path, "/portfolio/smart-village");
});
