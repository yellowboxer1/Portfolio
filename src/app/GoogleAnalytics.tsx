import { Suspense } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/src/lib/analytics-config";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          const searchParams = new URLSearchParams(window.location.search);
          const pagePath = window.location.pathname + window.location.search;
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
          const config = {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
          };

          if (campaignSource) {
            config.campaign_source = campaignSource;
            config.campaign_medium = campaignMedium;
            config.campaign_name = campaignName;
          }

          gtag('config', '${GA_MEASUREMENT_ID}', config);
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={GA_MEASUREMENT_ID} />
      </Suspense>
    </>
  );
}
