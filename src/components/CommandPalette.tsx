"use client";

import { useCallback, useEffect, useState } from "react";
import { Command as Cmdk } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { site, sections } from "@/content/site";
import { EASE } from "@/lib/motion";
import { ArrowRight, Command as CmdIcon } from "./Icons";

function fireGoto(id: string) {
  window.dispatchEvent(new CustomEvent("app:goto", { detail: id }));
  const el = document.getElementById(id);
  if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ block: "start" });
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [bio, setBio] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // open via ⌘K / Ctrl+K or the app:palette event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("app:palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("app:palette", onOpen);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
    setBio(false);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      showToast("copied " + site.email);
    } catch {
      showToast(site.email);
    }
  }, [showToast]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "paper" ? "" : "paper";
    if (next) root.setAttribute("data-theme", next);
    else root.removeAttribute("data-theme");
    showToast(next === "paper" ? "theme → paper" : "theme → phosphor");
  }, [showToast]);

  const runEasterEgg = useCallback(() => {
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 1100);
    showToast("permission granted.");
  }, [showToast]);

  // detect easter-egg input
  const normalized = search.trim().toLowerCase();
  const isEgg = normalized === "sudo hire jeels";

  const runAction = (action: () => void) => {
    action();
    if (!bio) close();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-label="Close command palette"
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="relative w-full max-w-xl overflow-hidden rounded-md border border-line bg-ink-raise"
            >
              <Cmdk
                label="Command palette"
                shouldFilter={!isEgg}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                    return;
                  }
                  // focus trap — keep Tab within the palette (arrows drive the list)
                  if (e.key === "Tab") {
                    e.preventDefault();
                    return;
                  }
                  if (e.key === "Enter" && isEgg) {
                    e.preventDefault();
                    runEasterEgg();
                    setSearch("");
                  }
                }}
              >
                <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-sm">
                  <span className="text-phosphor">$</span>
                  <Cmdk.Input
                    value={search}
                    onValueChange={setSearch}
                    autoFocus
                    placeholder="type a command… (goto, resume, email, theme, help)"
                    className="w-full bg-transparent text-text caret-phosphor placeholder:text-text-dim/60 focus:outline-none"
                  />
                </div>

                <Cmdk.List className="max-h-[52vh] overflow-y-auto p-2 font-mono text-sm">
                  {isEgg ? (
                    <div className="px-3 py-4 text-signal">
                      press <span className="text-phosphor">enter</span> to run{" "}
                      <span className="text-text">sudo hire jeels</span>
                    </div>
                  ) : (
                    <Cmdk.Empty className="px-3 py-6 text-center text-text-dim">
                      no matching command.
                    </Cmdk.Empty>
                  )}

                  {bio && (
                    <div className="mb-2 space-y-1 border-b border-line px-3 pb-3 text-text-dim">
                      <p>
                        <span className="text-phosphor">jeels patel</span> — cybersecurity student,
                        toronto.
                      </p>
                      <p>
                        offensive security &amp; cloud pentesting; labs, ctfs, real engagements.
                      </p>
                      <p>
                        currently: security+ in progress, seeking cloud-sec / pentest internships.
                      </p>
                    </div>
                  )}

                  <Cmdk.Group
                    heading="navigate"
                    className="[&_[cmdk-group-heading]]:mono-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5"
                  >
                    {sections.map((s) => (
                      <Item
                        key={s.id}
                        value={`goto ${s.label} ${s.id}`}
                        onSelect={() => runAction(() => fireGoto(s.id))}
                        label={`goto ${s.label}`}
                        hint={s.path}
                      />
                    ))}
                  </Cmdk.Group>

                  <Cmdk.Group
                    heading="actions"
                    className="[&_[cmdk-group-heading]]:mono-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5"
                  >
                    <Item
                      value="resume cv download"
                      onSelect={() => runAction(() => window.open(site.resume, "_blank"))}
                      label="resume"
                      hint="open pdf"
                    />
                    <Item
                      value="email copy contact"
                      onSelect={() => runAction(copyEmail)}
                      label="email"
                      hint="copy address"
                    />
                    <Item
                      value="github"
                      onSelect={() => runAction(() => window.open(site.socials.github, "_blank"))}
                      label="github"
                      hint={site.socials.githubHandle}
                    />
                    <Item
                      value="linkedin"
                      onSelect={() => runAction(() => window.open(site.socials.linkedin, "_blank"))}
                      label="linkedin"
                      hint={site.socials.linkedinHandle}
                    />
                    <Item
                      value="theme light paper dark toggle"
                      onSelect={() => runAction(toggleTheme)}
                      label="theme"
                      hint="toggle paper / phosphor"
                    />
                    <Item
                      value="whoami bio about"
                      onSelect={() => setBio((v) => !v)}
                      label="whoami"
                      hint="print bio"
                    />
                    <Item
                      value="help commands"
                      onSelect={() => setBio(true)}
                      label="help"
                      hint="goto · resume · email · github · linkedin · theme · whoami"
                    />
                  </Cmdk.Group>
                </Cmdk.List>

                <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[11px] text-text-dim">
                  <span className="flex items-center gap-1.5">
                    <CmdIcon size={12} /> command palette
                  </span>
                  <span>esc to close</span>
                </div>
              </Cmdk>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-md border border-line bg-ink-raise px-4 py-2 font-mono text-[13px] text-signal"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* easter-egg confetti of amber > glyphs */}
      <Confetti active={confetti} />
    </>
  );
}

function Item({
  value,
  onSelect,
  label,
  hint,
}: {
  value: string;
  onSelect: () => void;
  label: string;
  hint: string;
}) {
  return (
    <Cmdk.Item
      value={value}
      onSelect={onSelect}
      className="group flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-text-dim data-[selected=true]:bg-ink data-[selected=true]:text-text"
    >
      <span className="flex items-center gap-2">
        <span className="text-phosphor opacity-0 group-data-[selected=true]:opacity-100">
          <ArrowRight size={13} />
        </span>
        <span>{label}</span>
      </span>
      <span className="text-[11px] text-text-dim/70">{hint}</span>
    </Cmdk.Item>
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const glyphs = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {glyphs.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.2;
        const x = (Math.random() - 0.5) * 120;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, top: "45%", left: `${left}%`, x: 0, rotate: 0 }}
            animate={{ opacity: 0, top: "110%", x, rotate: 180 }}
            transition={{ duration: 1, delay, ease: "easeIn" }}
            className="absolute font-mono text-lg text-phosphor"
          >
            &gt;
          </motion.span>
        );
      })}
    </div>
  );
}
