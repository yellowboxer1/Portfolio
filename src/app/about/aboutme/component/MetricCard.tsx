import { useEffect, useState } from "react";

export type MetricItem = {
  label?: string;
  value: string;
  description: string;
  highlight?: string;
  hasSupDollar?: boolean;
};

export type MetricCardProps = {
  title: string;
  eyebrow: string;
  items: MetricItem[];
  iconSrc?: string;
  iconAlt?: string;
  backgroundVariant?: string;
  videoWebmSrc?: string;
  videoMp4Src?: string;
  /** @deprecated Use videoWebmSrc/videoMp4Src instead */
  videoSrc?: string;
  isMediaEnabled?: boolean;
  index: number;
  scrollStage: number;
};

export default function MetricCard({
  title,
  eyebrow,
  items,
  iconSrc,
  iconAlt,
  backgroundVariant,
  videoWebmSrc,
  videoMp4Src,
  videoSrc,
  isMediaEnabled = true,
  index,
  scrollStage,
}: MetricCardProps) {
  const [stackGap, setStackGap] = useState(36);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateStackGap = () => {
      setStackGap(desktopQuery.matches ? 36 : 20);
    };

    updateStackGap();
    desktopQuery.addEventListener("change", updateStackGap);

    return () => {
      desktopQuery.removeEventListener("change", updateStackGap);
    };
  }, []);

  const distance = index - scrollStage;
  const isFuture = distance > 1;
  const entryProgress = distance > 0 ? 1 - distance : 1;
  const stackDepth = distance <= 0 ? Math.min(Math.abs(distance), 2) : 0;
  const translateX = distance <= 0 ? stackDepth * stackGap : 0;
  const easedEntry = 1 - Math.pow(1 - Math.max(0, entryProgress), 3);
  const translateY = distance > 0 ? (1 - easedEntry) * 780 : -stackDepth * 18;
  const scale = distance > 0 ? 0.955 + easedEntry * 0.045 : 1 - stackDepth * 0.024;
  const opacity = isFuture ? 0 : 1;
  const zIndex = distance > 0 ? 50 + index : 50 + index - Math.ceil(stackDepth) * 12;
  const isCurrent = Math.abs(distance) < 0.18;

  const stackStyle = {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
    zIndex,
    opacity,
    transition: "transform 980ms cubic-bezier(.77,0,.175,1), opacity 260ms ease",
  };

  const hasVideo = videoWebmSrc || videoMp4Src || videoSrc;
  const shouldLoadVideo = hasVideo && isMediaEnabled && distance <= 1;

  return (
    <article
      className={`absolute left-0 top-0 min-h-[min(520px,calc(100svh-260px))] w-full overflow-hidden rounded-[14px] border border-white/18 bg-black text-white shadow-[0_28px_80px_rgba(0,0,0,0.46)] will-change-transform md:aspect-[1328/660] md:min-h-[min(660px,calc(100svh-230px))] ${
        isCurrent ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={stackStyle}
      aria-hidden={!isCurrent}
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full bg-black">
          {/* Optional background variant overlay */}
          {backgroundVariant && (
            <div
              className={`absolute inset-0 bg-no-repeat bg-cover bg-center pointer-events-none z-[1] ${backgroundVariant}`}
            />
          )}

          {/* Video background */}
          {shouldLoadVideo && (
            <video
              className="absolute inset-0 inline h-full w-full object-cover opacity-86"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              {videoWebmSrc && <source type="video/webm" src={videoWebmSrc} />}
              {videoMp4Src && <source type="video/mp4" src={videoMp4Src} />}
              {/* Fallback for legacy single-source prop */}
              {!videoWebmSrc && !videoMp4Src && videoSrc && (
                <source src={videoSrc} />
              )}
            </video>
          )}
        </div>
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_49%,rgba(150,120,255,0.08),transparent_42%),linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.05)_48%,rgba(0,0,0,0.38))]" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.01)_44%,rgba(0,0,0,0.22))]" />
      
      {/* ── Icon overlay image ── */}
      {iconSrc && (
        <div className="absolute inset-px z-[2] pointer-events-none">
          <img
            src={iconSrc}
            alt={iconAlt ?? ""}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-[3] flex min-h-[min(520px,calc(100svh-260px))] flex-col justify-between gap-14 p-5 md:min-h-[min(660px,calc(100svh-230px))] md:gap-0 md:p-10">
        {/* Title block */}
        <div>
          <p className="sr-only">{eyebrow}</p>
          <h3 className="max-w-[720px] text-[34px] font-semibold uppercase leading-none tracking-[-0.03em] whitespace-pre-wrap md:text-[54px]">
            {title}
          </h3>
        </div>

        {/* Metrics grid — 2-col on md (matching card 2), 3-col on lg */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-5 md:gap-y-[21px] lg:grid-cols-3 lg:gap-x-10">
          {items.map((item, idx) => (
            <div key={`${item.label ?? item.value}-${idx}`} className="min-w-0">
              {/* Value row */}
              <p className="relative mb-3 pb-3 text-[38px] font-medium leading-none tracking-[-0.08em] md:text-[72px] md:tracking-[-4px] md:leading-[76px] lg:text-[80px]">
                {item.hasSupDollar && (
                  <sup className="relative -top-6 text-5xl leading-none align-baseline md:text-5xl">
                    $
                  </sup>
                )}
                {item.value}
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/50" />
              </p>

              {/* Label (screen reader only when present) */}
              {item.label && <p className="sr-only">{item.label}</p>}

              {/* Description */}
              <p className="max-w-[360px]">
                {item.highlight && (
                  <strong className="block text-[13px] font-medium tracking-[0.39px] text-white md:block">
                    {item.highlight}
                  </strong>
                )}
              <span className="text-[13px] lg:text-[14px] xl:text-[15px] font-[300] first-line:font-[500] leading-snug whitespace-pre-wrap text-white/72 tracking-[0.39px] inline-block break-keep">
                {item.description}
              </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
