export const runtime = "nodejs";

let periodStart = 0;
let reports = 0;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 8192) {
    return new Response(null, { status: 413 });
  }
  const now = Date.now();
  if (now - periodStart >= 60_000) {
    periodStart = now;
    reports = 0;
  }
  if (++reports > 20) return new Response(null, { status: 429 });

  try {
    const text = await request.text();
    if (text.length > 8192) return new Response(null, { status: 413 });
    const data = JSON.parse(text);
    if (!data || typeof data.message !== "string") {
      return new Response(null, { status: 400 });
    }
    const field = (key: string, length: number) =>
      typeof data[key] === "string" ? data[key].slice(0, length) : undefined;
    console.error("[portfolio-client-error]", {
      name: field("name", 100),
      message: field("message", 500),
      stack: field("stack", 1500),
      digest: field("digest", 100),
      path: field("path", 200)?.split(/[?#]/)[0],
      userAgent: field("userAgent", 400),
    });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
