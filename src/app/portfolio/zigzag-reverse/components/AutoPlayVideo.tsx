'use client';

import { useEffect, useRef } from 'react';

type AutoPlayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  loopEndSeconds?: number;
  loopStartSeconds?: number;
};
type VideoPreload = '' | 'auto' | 'metadata' | 'none';

export default function AutoPlayVideo({
  autoPlay = true,
  loop = true,
  loopEndSeconds,
  loopStartSeconds = 0,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  src,
  ...props
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resolvedPreload: VideoPreload =
    preload === 'auto' || preload === 'none' || preload === 'metadata' ? preload : 'auto';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let nearby = false;
    const syncPlayback = () => {
      if (!nearby || document.hidden) {
        video.pause();
        return;
      }
      // Attach the source only when this video approaches the viewport.
      if (!video.getAttribute('src')) video.src = src;
      if (autoPlay) video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    observer.observe(video);
    video.addEventListener('canplay', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [autoPlay, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || loopEndSeconds == null) {
      return;
    }

    const handleTimeUpdate = () => {
      if (video.currentTime < loopEndSeconds) {
        return;
      }

      video.currentTime = loopStartSeconds;

      if (autoPlay) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [autoPlay, loopEndSeconds, loopStartSeconds]);

  return (
    <video
      ref={videoRef}
      autoPlay={false}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={resolvedPreload}
      {...props}
    />
  );
}
