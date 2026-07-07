"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { StaticGraph } from "./StaticGraph";

// R3F scene is lazy-loaded (ssr:false) behind an amber skeleton.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <Skeleton />,
});

function Skeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full border border-phosphor-dim/30" />
    </div>
  );
}

export function HeroCanvas() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(true);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // pause the render loop when the hero scrolls off-screen
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const useStatic = !mounted || reduced || isMobile;

  return (
    <div ref={ref} className="absolute inset-0">
      {useStatic ? <StaticGraph className="h-full w-full opacity-70" /> : <Scene active={inView} />}
    </div>
  );
}
