"use client";

import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { capabilities, certRoadmap } from "@/content/skills";

function Column({
  heading,
  items,
  variant,
}: {
  heading: string;
  items: string[];
  variant: "working" | "learning" | "next";
}) {
  return (
    <div>
      <p className="mono-label mb-3">{heading}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[12px] " +
              (variant === "working"
                ? "border-phosphor-dim/60 text-text"
                : variant === "learning"
                  ? "border-line text-text"
                  : "border-line text-text-dim/60")
            }
          >
            {variant === "learning" && (
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal text-signal" />
            )}
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
      path="~/skills"
      title="Capability map"
      intro="No percentage bars, no self-ratings — just an honest read of what I use, what I'm learning, and what's next."
    >
      <Reveal className="grid gap-8 md:grid-cols-3">
        <RevealItem>
          <Column heading="working with" items={capabilities.workingWith} variant="working" />
        </RevealItem>
        <RevealItem>
          <Column heading="learning now" items={capabilities.learningNow} variant="learning" />
        </RevealItem>
        <RevealItem>
          <Column heading="next up" items={capabilities.nextUp} variant="next" />
        </RevealItem>
      </Reveal>

      {/* cert roadmap timeline */}
      <Reveal className="mt-14">
        <RevealItem>
          <p className="mono-label mb-4">cert roadmap</p>
        </RevealItem>
        <RevealItem>
          <ol className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
            {certRoadmap.map((cert, i) => (
              <li key={cert.name} className="flex items-center gap-3 md:gap-0">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "inline-block h-2.5 w-2.5 rounded-full " +
                      (cert.active ? "pulse-dot bg-phosphor text-phosphor" : "bg-phosphor-dim")
                    }
                  />
                  <div className="font-mono text-[13px]">
                    <span className={cert.active ? "text-phosphor" : "text-text"}>{cert.name}</span>{" "}
                    <span className="text-text-dim">[{cert.status}]</span>
                  </div>
                </div>
                {i < certRoadmap.length - 1 && (
                  <span className="mx-3 hidden h-px w-10 bg-line md:block" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
