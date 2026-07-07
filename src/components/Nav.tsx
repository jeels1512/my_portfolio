"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections } from "@/content/site";
import { EASE } from "@/lib/motion";
import { Command, Menu, X } from "./Icons";

function goto(id: string) {
  window.dispatchEvent(new CustomEvent("app:goto", { detail: id }));
  // fallback for reduced-motion (no Lenis listener)
  const el = document.getElementById(id);
  if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ block: "start" });
  }
}

function openPalette() {
  window.dispatchEvent(new CustomEvent("app:palette"));
}

export function Nav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll-spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    goto(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-ink/85" aria-hidden="true" />
      <nav
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <button
          onClick={() => handleNav(sections[0].id)}
          className="font-mono text-sm text-phosphor transition-opacity hover:opacity-80"
        >
          jp@recon:~
        </button>

        {/* desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleNav(s.id)}
                  className={`relative font-mono text-[13px] transition-colors ${
                    active === s.id ? "text-phosphor" : "text-text-dim hover:text-text"
                  }`}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-phosphor"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={openPalette}
            className="inner-glow-hover flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[12px] text-text-dim transition-colors hover:border-phosphor-dim hover:text-text"
            aria-label="Open command palette"
          >
            <Command size={13} />
            <span>⌘K</span>
          </button>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-1.5 font-mono text-[12px] text-text-dim md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
          <span>[ menu ]</span>
        </button>
      </nav>

      {/* mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-0 top-14 z-40 bg-ink md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-8">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: EASE }}
                >
                  <button
                    onClick={() => handleNav(s.id)}
                    className="flex w-full items-baseline gap-3 py-3 text-left"
                  >
                    <span className="mono-label">{s.path}</span>
                    <span className="font-display text-2xl text-text">{s.label}</span>
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * sections.length + 0.05, duration: 0.3, ease: EASE }}
                className="mt-4"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openPalette();
                  }}
                  className="flex items-center gap-2 font-mono text-sm text-phosphor"
                >
                  <Command size={15} /> command palette · ⌘K
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
