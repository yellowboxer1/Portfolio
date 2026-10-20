"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import imageAssets from "./image-assets.json";

const poster = imageAssets["logo-glass-poster-v3.webp"].src;

export default function GlassLogo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReady(false);
      setMotionAllowed(!preference.matches);
    };
    update();
    // Older app browsers still expose the legacy MediaQueryList listener.
    if (preference.addEventListener) {
      preference.addEventListener("change", update);
      return () => preference.removeEventListener("change", update);
    }
    preference.addListener(update);
    return () => preference.removeListener(update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motionAllowed || !posterReady || failed || !video) return;
    let inView = true;
    let mounted = true;
    const updatePlayback = () => {
      if (document.hidden || !inView) video.pause();
      else void video.play().catch(() => { if (mounted) setReady(false); });
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0 });
    observer?.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();
    return () => {
      mounted = false;
      video.pause();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [motionAllowed, posterReady, failed]);

  return <>
    <div className={styles.coverMark} aria-hidden="true" data-ready={ready && motionAllowed && !failed}>
      <Image className={styles.coverPoster} src={poster} width={768} height={768} alt="" priority unoptimized onLoad={() => setPosterReady(true)} />
      {motionAllowed && posterReady && !failed && <video
        key={poster}
        ref={videoRef}
        className={styles.coverVideo}
        width={768}
        height={768}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        onPlaying={() => setReady(true)}
        onError={() => setFailed(true)}
      >
        <source src="/portfolio/partnerit/visuals/logo-glass-motion-v3.mp4" type="video/mp4" />
        <source src="/portfolio/partnerit/visuals/logo-glass-motion-v3.webm" type="video/webm" />
      </video>}
    </div>
  </>;
}
