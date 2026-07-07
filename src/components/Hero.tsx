"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight, Download, MapPin, Github, Linkedin, Mail } from "./Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function goto(id: string) {
  window.dispatchEvent(new CustomEvent("app:goto", { detail: id }));
  const el = document.getElementById(id);
  if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ block: "start" });
  }
}

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* subtle background: radial accent glow + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pt-20">
        <motion.div variants={container} initial={reduced ? false : "hidden"} animate="show">
          <motion.p variants={item} className="eyebrow">
            {site.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 max-w-3xl font-display text-[44px] font-bold leading-[1.05] tracking-tight md:text-[72px]"
          >
            <span className="text-gradient">{site.hero.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 max-w-2xl font-display text-2xl font-medium text-text-muted md:text-3xl"
          >
            {site.hero.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-muted"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => goto("labs")}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={16} />
              Download résumé
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-text-dim" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {site.hero.status}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2">
            {[
              { href: site.socials.github, label: "GitHub", Icon: Github },
              { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
