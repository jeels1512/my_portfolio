"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { capabilities, certRoadmap } from "@/content/skills";
import { credentials } from "@/content/experience";
import { ArrowUpRight, Check, Shield } from "../Icons";

function Column({
  heading,
  items,
  variant,
}: {
  heading: string;
  items: string[];
  variant: "working" | "learning" | "next";
}) {
  const dot =
    variant === "working" ? "bg-accent" : variant === "learning" ? "bg-amber-400" : "bg-text-dim";
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {heading}
        </h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-md border px-2.5 py-1 text-[13px] ${
              variant === "next"
                ? "border-line text-text-dim"
                : "border-line-strong text-text-muted"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      n="04"
      eyebrow="Capabilities"
      title="Skills & Certifications"
      intro="An honest map of what I use, what I'm learning, and where I'm headed — no self-rated percentages."
    >
      <Reveal className="grid gap-4 md:grid-cols-3">
        <RevealItem>
          <Column heading="Working with" items={capabilities.workingWith} variant="working" />
        </RevealItem>
        <RevealItem>
          <Column heading="Learning now" items={capabilities.learningNow} variant="learning" />
        </RevealItem>
        <RevealItem>
          <Column heading="Next up" items={capabilities.nextUp} variant="next" />
        </RevealItem>
      </Reveal>

      {/* verified certifications */}
      <Reveal className="mt-10">
        <RevealItem>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Verified credentials
          </h3>
        </RevealItem>
        <RevealItem as="ul" className="grid gap-3 sm:grid-cols-2">
          {credentials.map((c) => (
            <li key={c.id} className="min-w-0">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-hover"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                  <Shield size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text">{c.platform}</span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-accent">
                      <Check size={12} /> verified
                    </span>
                  </div>
                  <span className="block truncate font-mono text-xs text-text-dim">{c.id}</span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-text-dim transition-colors group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </RevealItem>
      </Reveal>

      {/* cert roadmap */}
      <Reveal className="mt-10">
        <RevealItem>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Certification roadmap
          </h3>
        </RevealItem>
        <RevealItem>
          <ol className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
            {certRoadmap.map((cert, i) => (
              <li key={cert.name} className="flex items-center gap-3 md:flex-1 md:gap-0">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      cert.active ? "bg-accent ring-4 ring-accent-soft" : "bg-line-strong"
                    }`}
                  />
                  <div className="text-sm">
                    <span className={cert.active ? "font-medium text-text" : "text-text-muted"}>
                      {cert.name}
                    </span>
                    <span className="ml-1.5 font-mono text-xs text-text-dim">[{cert.status}]</span>
                  </div>
                </div>
                {i < certRoadmap.length - 1 && (
                  <span className="mx-4 hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
