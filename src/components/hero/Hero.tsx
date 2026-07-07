"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroCanvas } from "./HeroCanvas";
import { ArrowRight, Download } from "../Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function goto(id: string) {
  window.dispatchEvent(new CustomEvent("app:goto", { detail: id }));
  const el = document.getElementById(id);
  if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ block: "start" });
  }
}

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D scene — right 45%, background/dimmed on mobile */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:w-[45%] md:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:from-ink/90 md:via-transparent" />
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          className="max-w-2xl md:w-[55%]"
          variants={container}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={item} className="mono-label">
            {site.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-[64px]"
          >
            {site.hero.nameLine}
            <br />
            <span className="text-text-dim">{site.hero.tagline}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-dim md:text-lg"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => goto("labs")}
              className="group inline-flex items-center gap-2 rounded-md bg-phosphor px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              View labs &amp; writeups
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inner-glow-hover inline-flex items-center gap-2 rounded-md border border-phosphor/60 px-5 py-2.5 text-sm text-phosphor transition-colors hover:border-phosphor"
            >
              <Download size={16} />
              Download résumé
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-text-dim"
          >
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-signal text-signal" />
            {site.hero.status}
          </motion.p>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-text-dim/60">
        scroll ↓
      </div>
    </section>
  );
}
