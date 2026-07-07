# Jeels Patel — Portfolio

A single-page portfolio for an offensive-security / cloud-pentesting student.
Design language: **modern dark & polished** — deep navy, off-white type, and a
single teal accent. Clean cards, restrained motion, no gimmicks.

Built with Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Framer Motion
for reveals, and Lenis for smooth scrolling.

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

| File                        | What it controls                                                               |
| --------------------------- | ------------------------------------------------------------------------------ |
| `src/content/site.ts`       | Name, role, location, email, social links, hero copy, About text, nav sections |
| `src/content/labs.ts`       | Labs rows (name, platform, difficulty, summary, writeup) + stats               |
| `src/content/projects.ts`   | Projects cards                                                                 |
| `src/content/skills.ts`     | Capability columns + cert-roadmap timeline                                     |
| `src/content/experience.ts` | Verified credentials + experience timeline                                     |

### Common edits

- **Add a completed room/box:** append an object to the `labs` array in
  `src/content/labs.ts` (oldest first). Add a `writeup: "https://…"` to show the
  writeup link.
- **Embed your TryHackMe badge:** set `thmUsername` in `labs.ts` (currently blank
  so nothing renders).
- **Replace the résumé:** drop the PDF at `public/assets/Jeels-Patel-Resume.pdf`.
- **Change the accent color / design tokens:** edit the CSS variables at the top of
  `src/app/globals.css` (`--accent`, `--bg`, `--surface`, `--text`, …).

## Accessibility & motion

- Semantic landmarks, `h1`→`h2` hierarchy, visible teal focus rings, keyboard-
  operable nav and mobile menu.
- `prefers-reduced-motion` disables Lenis smooth scroll and all reveal
  animations — content simply appears.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). The included
   `vercel.json` pins the framework preset to Next.js, so no configuration is
   needed even if the project was previously a static site.
3. Set the production domain, then update `site.url` in `src/content/site.ts`
   so canonical/OG/sitemap URLs point at the live domain.

The OpenGraph image is generated on the fly at `/og`, and `sitemap.xml` /
`robots.txt` are produced by `src/app/sitemap.ts` and `src/app/robots.ts`.
