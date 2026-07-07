"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "../Reveal";
import { site } from "@/content/site";
import { Copy, Check, Github, Linkedin, Mail, Download, ArrowUpRight } from "../Icons";

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
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
      aria-labelledby="contact-title"
    >
      <Reveal>
        <RevealItem>
          <div className="flex items-center gap-3">
            <span className="eyebrow">Contact</span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="font-mono text-xs text-text-dim">06</span>
          </div>
        </RevealItem>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="relative p-8 md:p-12">
            <div
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-20 blur-[90px]"
              style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <RevealItem>
              <h2
                id="contact-title"
                className="max-w-xl font-display text-3xl font-bold tracking-tight text-text md:text-[40px] md:leading-tight"
              >
                {site.contact.heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-text-muted">
                {site.contact.sub}
              </p>
            </RevealItem>

            <RevealItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
                >
                  <Mail size={16} />
                  {site.email}
                </a>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-accent" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy
                    </>
                  )}
                </button>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  {
                    href: site.socials.github,
                    label: "GitHub",
                    handle: site.socials.githubHandle,
                    Icon: Github,
                  },
                  {
                    href: site.socials.linkedin,
                    label: "LinkedIn",
                    handle: site.socials.linkedinHandle,
                    Icon: Linkedin,
                  },
                ].map(({ href, label, handle, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-lg border border-line px-4 py-2.5 text-sm text-text-muted transition-colors hover:border-line-strong hover:text-text"
                  >
                    <Icon
                      size={16}
                      className="text-text-dim transition-colors group-hover:text-accent"
                    />
                    {handle}
                    <ArrowUpRight size={14} className="text-text-dim" />
                  </a>
                ))}
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-line px-4 py-2.5 text-sm text-text-muted transition-colors hover:border-line-strong hover:text-text"
                >
                  <Download
                    size={16}
                    className="text-text-dim transition-colors group-hover:text-accent"
                  />
                  Résumé
                </a>
              </div>
            </RevealItem>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-8 text-sm text-text-dim">
        <p>© 2026 {site.name}</p>
        <p>Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
