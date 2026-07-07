# Jeels Patel — Portfolio

A single-page portfolio for an offensive-security / cloud-pentesting student.
Design language: **Phosphor Recon** — a calibrated instrument (phosphor CRT
terminal meets aviation HUD), not a movie-hacker screen.

Built with Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Framer Motion,
React Three Fiber for the hero scene, Lenis smooth scroll, and `cmdk` for the
⌘K command palette.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run format   # prettier --write
```

## Editing content

**All copy and data live in `src/content/` — components never contain copy.**
Each file is typed and marked with `// EDIT ME`. You never need to touch a
component to update the site's text.

| File                        | What it controls                                                        |
| --------------------------- | ----------------------------------------------------------------------- |
| `src/content/site.ts`       | Name, role, location, email, social links, hero copy, nav sections      |
| `src/content/labs.ts`       | `~/labs` rows (name, platform, difficulty, summary, writeup) + stats     |
| `src/content/projects.ts`   | `~/builds` project cards                                                 |
| `src/content/skills.ts`     | `~/skills` capability columns + cert-roadmap timeline                    |
| `src/content/experience.ts` | `~/creds` verified credentials + `~/log` experience timeline            |

### Common edits

- **Add a completed room/box:** append an object to the `labs` array in
  `src/content/labs.ts`. The index (`001`, `002`, …) is derived from array
  order — oldest first, so the numbering stays "earned". Add a `writeup: "https://…"`
  to show the writeup link.
- **Embed your TryHackMe badge:** set `thmUsername` in `labs.ts` (currently blank
  so nothing renders).
- **Replace the résumé:** drop the PDF at `public/assets/Jeels-Patel-Resume.pdf`.
- **Change accent colors / design tokens:** edit the CSS variables at the top of
  `src/app/globals.css` (`--phosphor`, `--signal`, `--ink`, …). The light "paper"
  theme variables live in the same file under `:root[data-theme="paper"]`.

## The ⌘K command palette

Press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> (or click the chip in the nav) to open a
terminal-styled palette. Commands: `goto <section>`, `resume`, `email` (copies),
`github`, `linkedin`, `theme` (toggles the light "paper" variant), `whoami`,
`help`. Easter egg: type `sudo hire jeels`.

## Accessibility & motion

- Everything is keyboard-operable; the palette is focus-trapped and closes on Esc.
- `prefers-reduced-motion` fully disables the boot sequence, Lenis, CRT scanlines,
  the animated 3D loop (a static SVG graph renders instead), and all scroll reveals.
- The hero 3D scene is lazy-loaded (`next/dynamic`, `ssr: false`) and its render
  loop pauses when off-screen. On mobile / reduced motion it falls back to a static
  SVG of the same graph.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework preset
   (Next.js) is detected automatically; no configuration needed.
3. Set the production domain, then update `site.url` in `src/content/site.ts`
   so canonical/OG/sitemap URLs point at the live domain.

The OpenGraph image is generated on the fly at `/og`, and `sitemap.xml` /
`robots.txt` are produced by `src/app/sitemap.ts` and `src/app/robots.ts`.
