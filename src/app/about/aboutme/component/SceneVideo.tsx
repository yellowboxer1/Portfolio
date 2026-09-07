"use client";

import { useEffect, useRef, useState } from "react";

type SceneVideoProps = {
  src: string;
  poster?: string;
  active: boolean;
  className?: string;
};

export default function SceneVideo({ src, poster, active, className }: SceneVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!active || loaded) return;
    let idleId: number | undefined;
    let timerId: number | undefined;
    // Keep decorative video requests out of the initial document load.
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setLoaded(true), { timeout: 1000 });
      } else {
        timerId = window.setTimeout(() => setLoaded(true), 100);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [active, loaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;
    const syncPlayback = () => {
      if (active && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [active, loaded, src]);

  return (
    <video
      ref={videoRef}
      src={loaded ? src : undefined}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
