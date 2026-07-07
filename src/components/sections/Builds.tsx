"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { projects, projectsIntro } from "@/content/projects";
import { ArrowUpRight, Github } from "../Icons";

export function Builds() {
  return (
    <Section id="builds" path="~/builds" title="Builds" intro={projectsIntro}>
      <Reveal as="ul" className="grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <RevealItem key={p.name} as="li">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inner-glow-hover flex h-full flex-col rounded-md border border-line bg-ink-raise p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-phosphor-dim"
            >
              {/* file header bar */}
              <div className="mb-4 flex items-center justify-between border-b border-line pb-2 font-mono text-[10px] text-text-dim">
                <span>
                  {p.repoLabel} <span className="text-line">—</span> main{" "}
                  <span className="text-line">—</span> {p.language}
                </span>
                <Github size={13} className="text-text-dim" />
              </div>

              <p className="mono-label">build 0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg text-text">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-dim">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[12px] text-phosphor">
                {p.repoLabel}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
