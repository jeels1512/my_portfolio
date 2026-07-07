"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { projects, projectsIntro } from "@/content/projects";
import { ArrowUpRight, Github } from "../Icons";

export function Builds() {
  return (
    <Section id="projects" n="03" eyebrow="Builds" title="Projects" intro={projectsIntro}>
      <Reveal as="ul" className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <RevealItem key={p.name} as="li">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-hover"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text-muted transition-colors group-hover:text-accent">
                  <Github size={17} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-text-dim transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </div>

              <h3 className="font-display text-lg font-semibold text-text">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
