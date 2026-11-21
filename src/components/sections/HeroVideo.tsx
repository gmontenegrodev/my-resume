"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  webm: string;
  mp4: string;
  poster: string;
};

// Decorative background video for the hero.
// - Plays muted and looped, only if the visitor has not asked for reduced motion.
// - Has a pause/play button, because moving content that lasts more than
//   5 seconds must be pausable (WCAG 2.2.2).
export function HeroVideo({ webm, mp4, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Start playback after mount, unless the visitor prefers reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {
      // Autoplay can be blocked (e.g. low power mode). The poster stays visible
      // and the visitor can press play.
    });
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={!playing}
        className="absolute right-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-dark/40 bg-hero/60 text-on-dark transition-colors duration-150 hover:bg-hero/90 sm:right-6 sm:bottom-6"
      >
        <span className="sr-only">{playing ? "Pause background video" : "Play background video"}</span>
        {playing ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        )}
      </button>
    </>
  );
}
