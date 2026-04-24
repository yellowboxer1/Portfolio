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
  preload = 'auto',
  ...props
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resolvedPreload: VideoPreload =
    preload === 'auto' || preload === 'none' || preload === 'metadata' ? preload : 'auto';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const tryPlay = () => {
      if (!autoPlay) {
        return;
      }

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      {
        rootMargin: '240px 0px',
        threshold: 0.05,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const tryPlay = () => {
      if (!autoPlay) {
        return;
      }

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      tryPlay();
    };

    video.preload = resolvedPreload;
    video.load();
    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoPlay, resolvedPreload]);

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
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={resolvedPreload}
      {...props}
    />
  );
}
