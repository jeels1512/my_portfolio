"use client";

import { useState } from "react";
import { Section } from "../Section";
import { Reveal, RevealItem } from "../Reveal";
import { site } from "@/content/site";
import { ArrowUpRight, Copy, Check, Download } from "../Icons";

export function Net() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Section id="net" path="~/net" title={site.contact.heading}>
      <Reveal className="max-w-2xl">
        <RevealItem as="ul" className="flex flex-col divide-y divide-line border-y border-line">
          {/* email row with copy */}
          <li className="flex items-center justify-between gap-3 py-4">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <span className="mono-label w-12 shrink-0 md:w-16">email</span>
              <span className="truncate font-mono text-[13px] text-text md:text-sm">
                {site.email}
              </span>
            </div>
            <button
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[12px] transition-colors hover:border-phosphor-dim"
              aria-label="Copy email address"
            >
              {copied ? (
                <span className="inline-flex items-center gap-1 text-signal">
                  <Check size={13} /> copied ✓
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-text-dim">
                  <Copy size={13} /> copy
                </span>
              )}
            </button>
          </li>

          <li className="flex items-center justify-between gap-3 py-4">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <span className="mono-label w-12 shrink-0 md:w-16">github</span>
              <span className="truncate font-mono text-[13px] text-text md:text-sm">
                {site.socials.githubHandle}
              </span>
            </div>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-text-dim transition-colors hover:text-phosphor"
              aria-label="Open GitHub profile"
            >
              <ArrowUpRight size={16} />
            </a>
          </li>

          <li className="flex items-center justify-between gap-3 py-4">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <span className="mono-label w-12 shrink-0 md:w-16">linkedin</span>
              <span className="truncate font-mono text-[13px] text-text md:text-sm">
                {site.socials.linkedinHandle}
              </span>
            </div>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-text-dim transition-colors hover:text-phosphor"
              aria-label="Open LinkedIn profile"
            >
              <ArrowUpRight size={16} />
            </a>
          </li>
        </RevealItem>

        <RevealItem className="mt-8">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inner-glow-hover inline-flex items-center gap-2 rounded-md border border-phosphor/60 px-5 py-2.5 text-sm text-phosphor transition-colors hover:border-phosphor"
          >
            <Download size={16} />
            Download résumé
          </a>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-6 py-6">
        <p className="font-mono text-[12px] text-text-dim">
          © 2026 jeels patel <span className="text-line">—</span> built with next.js{" "}
          <span className="text-line">·</span>{" "}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("app:palette"))}
            className="text-phosphor-dim transition-colors hover:text-phosphor"
          >
            press ⌘K
          </button>
        </p>
      </div>
    </footer>
  );
}
