"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return (
    <div className="fixed inset-x-0 top-[3px] z-[55] h-[2px] bg-transparent" aria-hidden="true">
      <div className="h-full bg-navy/40 transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}
