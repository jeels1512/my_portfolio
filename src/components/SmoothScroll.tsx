"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Lenis smooth scroll — disabled under prefers-reduced-motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // let anchor / palette navigation drive Lenis
    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: -72 });
    };
    window.addEventListener("app:goto", onGoto);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("app:goto", onGoto);
      lenis.destroy();
    };
  }, []);

  return null;
}
