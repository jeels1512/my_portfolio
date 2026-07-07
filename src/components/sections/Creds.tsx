"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { credentials } from "@/content/experience";
import { ArrowUpRight, Check } from "../Icons";

export function Creds() {
  return (
    <Section id="creds" path="~/creds" title="Verified credentials">
      <Reveal as="ul" className="flex flex-col gap-3">
        {credentials.map((c) => (
          <RevealItem key={c.id} as="li">
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inner-glow-hover flex items-center justify-between gap-4 rounded-md border border-line bg-ink-raise px-4 py-3.5 transition-colors hover:border-phosphor-dim"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-display text-base text-text">{c.platform}</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                  <Check size={13} /> verified
                </span>
                <span className="font-mono text-[12px] text-text-dim">{c.id}</span>
              </div>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-text-dim transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-phosphor"
              />
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
