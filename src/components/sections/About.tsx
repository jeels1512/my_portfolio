"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { site } from "@/content/site";
import { capabilities } from "@/content/skills";

const highlights = [
  { value: "6+", label: "Rooms & CTFs solved" },
  { value: "2", label: "Verified certifications" },
  { value: "3", label: "Full-stack builds" },
];

export function About() {
  return (
    <Section id="about" n="01" eyebrow="About" title="Learning security by doing it.">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <Reveal>
          {site.about.map((para, i) => (
            <RevealItem key={i}>
              <p className="mb-4 text-[15px] leading-relaxed text-text-muted md:text-base">
                {para}
              </p>
            </RevealItem>
          ))}

          <RevealItem>
            <div className="mt-6 flex flex-wrap gap-2">
              {capabilities.workingWith.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </RevealItem>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          {highlights.map((h) => (
            <RevealItem key={h.label}>
              <div className="rounded-xl border border-line bg-surface p-5">
                <div className="font-display text-3xl font-bold text-accent">{h.value}</div>
                <div className="mt-1 text-sm text-text-muted">{h.label}</div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
