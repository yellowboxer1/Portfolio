import { Suspense } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/src/lib/gtag";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          const searchParams = new URLSearchParams(window.location.search);
          const referrer = document.referrer;
          const campaignSource =
            searchParams.get('utm_source') ||
            (referrer.includes('saramin.co.kr') ? 'saramin' : undefined);
          const campaignMedium =
            searchParams.get('utm_medium') ||
            (referrer.includes('saramin.co.kr') ? 'profile' : undefined);
          const campaignName =
            searchParams.get('utm_campaign') ||
            (referrer.includes('saramin.co.kr') ? 'portfolio' : undefined);
          const config = campaignSource
            ? {
                campaign_source: campaignSource,
                campaign_medium: campaignMedium,
                campaign_name: campaignName,
              }
            : undefined;

          gtag('config', '${GA_MEASUREMENT_ID}', config);
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView />
      </Suspense>
    </>
  );
}
