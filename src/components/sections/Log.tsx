"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { experience } from "@/content/experience";
import { Check } from "../Icons";

export function Log() {
  return (
    <Section id="experience" n="05" eyebrow="Track record" title="Experience">
      <Reveal as="ul" className="flex flex-col gap-4">
        {experience.map((e) => (
          <RevealItem key={`${e.org}-${e.role}`} as="li">
            <div className="rounded-xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-text">{e.role}</h3>
                <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
                  {e.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-accent">
                {e.org} <span className="text-text-dim">· {e.location}</span>
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
