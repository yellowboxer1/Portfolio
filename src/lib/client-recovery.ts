type BrowserError = { name: string; message: string };

export function shouldRecoverAssetError(
  error: BrowserError,
  storage: Pick<Storage, "getItem" | "setItem">,
  path: string,
  now: number,
) {
  const isAssetError =
    error.name === "ChunkLoadError" ||
    /Loading (?:CSS )?chunk .*failed|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
      error.message,
    );
  if (!isAssetError) return false;

  try {
    const key = `portfolio:asset-recovery:${path}`;
    const previous = storage.getItem(key);
    if (previous !== null && now - Number(previous) < 60_000) return false;
    storage.setItem(key, String(now));
    return true;
  } catch {
    // A restricted WebView may deny storage; do not risk a reload loop.
    return false;
  }
}

export function recoveryUrl(href: string, now: number) {
  const url = new URL(href);
  url.searchParams.set("_reload", String(now));
  return url.href;
}
