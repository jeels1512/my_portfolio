"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { Menu, X, Download } from "./Icons";

function goto(id: string) {
  window.dispatchEvent(new CustomEvent("app:goto", { detail: id }));
  const el = document.getElementById(id);
  if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ block: "start" });
  }
}

export function Nav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <button
          onClick={() => handleNav(sections[0].id)}
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-text"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line-strong font-mono text-[13px] text-accent transition-colors group-hover:border-accent">
            JP
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </button>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNav(s.id)}
              className={`relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active === s.id ? "text-text" : "text-text-muted hover:text-text"
              }`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-md bg-surface"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
            </button>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            <Download size={14} />
            Résumé
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-text md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="fixed inset-0 top-16 z-40 bg-bg md:hidden"
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
                    className="flex w-full items-center gap-4 border-b border-line py-4 text-left"
                  >
                    <span className="font-mono text-xs text-accent">{s.n}</span>
                    <span className="font-display text-xl text-text">{s.label}</span>
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * sections.length + 0.05, duration: 0.3, ease: EASE }}
                className="mt-6"
              >
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink"
                >
                  <Download size={16} /> Download résumé
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
