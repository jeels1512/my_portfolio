"use client";

import { motion } from "motion/react";
import { Section } from "../Section";
import { labs, labStats, type Difficulty } from "@/content/labs";
import { EASE, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight } from "../Icons";

const diffColor: Record<Difficulty, string> = {
  easy: "text-signal border-signal/40",
  medium: "text-phosphor border-phosphor/40",
  hard: "text-danger border-danger/40",
};

export function Labs() {
  const reduced = useReducedMotion();
  return (
    <Section
      id="labs"
      path="~/labs"
      title="Labs & Writeups"
      intro="Security evidence first. Boxes owned, rooms cleared, and what each one taught me — ordered oldest to newest, so the numbering is earned."
    >
      <div className="overflow-hidden rounded-md border border-line">
        {labs.map((lab, i) => (
          <motion.div
            key={lab.name}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
            className="group relative border-b border-line last:border-b-0"
          >
            {/* left-edge bar */}
            <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-phosphor transition-transform duration-150 group-hover:scale-y-100" />
            <div className="flex flex-col gap-2 px-4 py-4 transition-colors group-hover:bg-ink-raise md:flex-row md:items-center md:gap-4 md:px-5">
              <span className="font-mono text-[13px] text-text-dim transition-colors group-hover:text-phosphor">
                {String(i + 1).padStart(3, "0")}
              </span>

              <div className="flex items-center gap-3 md:w-56 md:shrink-0">
                <span className="font-display text-base text-text">{lab.name}</span>
                <span className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-dim">
                  {lab.platform}
                </span>
              </div>

              <span
                className={`inline-flex w-fit rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${diffColor[lab.difficulty]}`}
              >
                {lab.difficulty}
              </span>

              <p className="flex-1 text-sm text-text-dim">{lab.summary}</p>

              {lab.writeup ? (
                <a
                  href={lab.writeup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[12px] text-phosphor md:shrink-0"
                >
                  writeup
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-text-dim/50 md:shrink-0">—</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* stat strip */}
      <p className="mt-6 font-mono text-[12px] text-text-dim">
        <span className="text-phosphor-dim">platforms:</span> {labStats.platforms}{" "}
        <span className="mx-2 text-line">|</span>
        <span className="text-phosphor-dim">focus:</span> {labStats.focus}
      </p>
    </Section>
  );
}
