"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  recoveryUrl,
  shouldRecoverAssetError,
} from "@/src/lib/client-recovery";

type Props = { error: Error & { digest?: string } };

const actionStyle: CSSProperties = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "14px 22px",
  border: "1px solid #b5c9d8",
  borderRadius: 10,
  background: "#fff",
  color: "#233f53",
  font: "inherit",
  fontWeight: 700,
  textDecoration: "none",
  cursor: "pointer",
};

export default function ClientErrorPage({ error }: Props) {
  const reported = useRef(false);
  const [chromeHref, setChromeHref] = useState<string>();

  useEffect(() => {
    if (reported.current) return;
    reported.current = true;
    console.error("Portfolio client error", error);

    try {
      const report = JSON.stringify({
        name: error.name,
        message: error.message.slice(0, 500),
        stack: error.stack?.slice(0, 1500),
        digest: error.digest,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
      });
      navigator.sendBeacon(
        "/api/client-errors",
        new Blob([report], { type: "application/json" }),
      );
    } catch {
      // Reporting must never prevent the recovery controls from appearing.
    }

    if (/Android/i.test(navigator.userAgent)) {
      const url = new URL(window.location.href);
      url.searchParams.delete("_reload");
      setChromeHref(
        `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=https;package=com.android.chrome;end`,
      );
    }

    try {
      if (
        shouldRecoverAssetError(
          error,
          window.sessionStorage,
          window.location.pathname,
          Date.now(),
        )
      ) {
        window.location.replace(recoveryUrl(window.location.href, Date.now()));
      }
    } catch {
      // Manual navigation stays available if this browser restricts storage.
    }
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#f3f8fc",
        color: "#213746",
        display: "grid",
        placeItems: "center",
        padding: "64px 24px",
        boxSizing: "border-box",
        fontFamily: "system-ui, sans-serif",
        overflowWrap: "anywhere",
        wordBreak: "keep-all",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        <p style={{ color: "#5c809a", fontSize: 14 }}>Gunho park</p>
        <h1 style={{ fontSize: 28, lineHeight: 1.5, margin: "20px 0" }}>
          페이지를 불러오지 못했습니다.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: "#546a79" }}>
          페이지를 다시 열어 주세요. 앱 안에서 열리지 않는다면 Chrome에서 확인할
          수 있습니다.
        </p>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}
        >
          <button
            type="button"
            style={{ ...actionStyle, background: "#245d81", color: "#fff" }}
            onClick={() =>
              window.location.replace(
                recoveryUrl(window.location.href, Date.now()),
              )
            }
          >
            페이지 다시 열기
          </button>
          {chromeHref && (
            <a href={chromeHref} style={actionStyle}>
              Chrome에서 열기
            </a>
          )}
          <a href="/works" style={actionStyle}>
            프로젝트 목록
          </a>
        </div>
      </div>
    </main>
  );
}
