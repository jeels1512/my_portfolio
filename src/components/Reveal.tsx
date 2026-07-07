"use client";

import { motion } from "motion/react";
import { revealParent, revealChild, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
}

// Container that staggers its Reveal.Item children on first view.
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      variants={revealParent}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag className={className} variants={revealChild}>
      {children}
    </MotionTag>
  );
}
