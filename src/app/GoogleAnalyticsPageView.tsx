"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/src/lib/gtag";

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSkippedInitialPageView = useRef(false);

  useEffect(() => {
    if (!hasSkippedInitialPageView.current) {
      hasSkippedInitialPageView.current = true;
      return;
    }

    const queryString = searchParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
