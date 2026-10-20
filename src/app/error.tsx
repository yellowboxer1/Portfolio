"use client";

import ClientErrorPage from "@/src/components/ClientErrorPage";

export default function ErrorPage({
  error,
}: { error: Error & { digest?: string } }) {
  return <ClientErrorPage error={error} />;
}
