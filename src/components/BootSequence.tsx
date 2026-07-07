"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";

const LINE = "jeels@recon:~$ init --portfolio";
const KEY = "boot-shown";

// First-visit boot: types a line, blinks, dissolves upward. Skippable, once per session.
export function BootSequence() {
  const [phase, setPhase] = useState<"idle" | "typing" | "done" | "hidden">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(KEY)) {
      setPhase("hidden");
      return;
    }
    sessionStorage.setItem(KEY, "1");
    setPhase("typing");
  }, []);

  // typewriter
  useEffect(() => {
    if (phase !== "typing") return;
    if (count < LINE.length) {
      const t = setTimeout(() => setCount((c) => c + 1), 34);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("done"), 420);
    return () => clearTimeout(t);
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setPhase("hidden"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  const skip = () => setPhase("hidden");

  if (phase === "hidden" || phase === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40 }}
        animate={phase === "done" ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={skip}
      >
        <p className="font-mono text-sm text-text md:text-base">
          <span className="text-signal">{LINE.slice(0, count)}</span>
          <motion.span
            className="ml-0.5 inline-block h-4 w-2 bg-phosphor align-middle"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </p>
        <span className="absolute bottom-8 font-mono text-[11px] text-text-dim">click to skip</span>
      </motion.div>
    </AnimatePresence>
  );
}
