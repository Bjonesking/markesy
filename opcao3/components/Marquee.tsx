"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Marquee({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const boost = gsap.utils.clamp(-4, 4, velocity / 500);
        tween.timeScale(1 + Math.abs(boost));
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  return (
    <div className={`pointer-events-none select-none overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((i) => (
          <span key={i} className="font-display px-4 text-[9vw] font-bold uppercase leading-none sm:text-7xl">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
