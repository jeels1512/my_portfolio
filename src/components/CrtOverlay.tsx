"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function CrtOverlay() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <div className="crt-overlay" aria-hidden="true" />;
}
