"use client";

import { MotionConfig } from "motion/react";

// Honor prefers-reduced-motion across all Framer Motion animations.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
