"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { experience } from "@/content/experience";

export function Log() {
  return (
    <Section id="log" path="~/log" title="Experience">
      <Reveal as="ul" className="relative flex flex-col gap-8 border-l border-line pl-6">
        {experience.map((e) => (
          <RevealItem key={`${e.org}-${e.role}`} as="li" className="relative">
            {/* timeline node */}
            <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-phosphor bg-ink" />
            <div className="font-mono text-[12px] text-phosphor-dim">
              {e.role} <span className="text-line">·</span>{" "}
              <span className="text-text-dim">
                {e.org}, {e.location}
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-dim">
                  <span className="mt-1 text-phosphor-dim">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
