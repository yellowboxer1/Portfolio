"use client";

import ClientErrorPage from "@/src/components/ClientErrorPage";

export default function GlobalError({
  error,
}: { error: Error & { digest?: string } }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        <ClientErrorPage error={error} />
      </body>
    </html>
  );
}
