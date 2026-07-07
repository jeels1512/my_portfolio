"use client";

import { motion } from "motion/react";
import { Section } from "../Section";
import { labs, labStats, type Difficulty } from "@/content/labs";
import { EASE, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowUpRight, Terminal } from "../Icons";

const diffStyle: Record<Difficulty, string> = {
  easy: "text-accent border-accent/30 bg-accent-soft",
  medium: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  hard: "text-rose-300 border-rose-400/30 bg-rose-400/10",
};

export function Labs() {
  const reduced = useReducedMotion();
  return (
    <Section
      id="labs"
      n="02"
      eyebrow="Hands-on"
      title="Labs & Writeups"
      intro="Security evidence first — boxes owned and rooms cleared, with what each one taught me. Ordered oldest to newest."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {labs.map((lab, i) => (
          <motion.div
            key={lab.name}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, ease: EASE, delay: (i % 2) * 0.06 }}
            className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-accent">
                  <Terminal size={15} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-text">{lab.name}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
                    {lab.platform}
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${diffStyle[lab.difficulty]}`}
              >
                {lab.difficulty}
              </span>
            </div>

            <p className="flex-1 text-sm leading-relaxed text-text-muted">{lab.summary}</p>

            {lab.writeup && (
              <a
                href={lab.writeup}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent"
              >
                Read writeup
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm text-text-dim">
        <span className="text-text-muted">Platforms:</span> {labStats.platforms}
        <span className="mx-2 text-line-strong">·</span>
        <span className="text-text-muted">Focus:</span> {labStats.focus}
      </p>
    </Section>
  );
}
