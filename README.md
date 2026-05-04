
# Jeels Patel — Security Portfolio

[![Live Site](https://img.shields.io/badge/Live-jeelspatel.vercel.app-0066cc?style=flat-square&logo=vercel)](https://jeelspatel.vercel.app)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=flat-square&logo=github)](https://github.com/jeels1512)

A macOS-themed single-page security portfolio built single-handedly. Interactive terminal, glassmorphism windows, draggable widgets, and responsive support all the way down to Apple Watch viewports.

**Live:** https://jeelspatel.vercel.app

---

## Design overview

The portfolio is structured as a faux desktop operating system rather than a traditional scrolling page. Each portfolio section (About, Projects, Skills, Certifications, Experience, Contact) opens as its own draggable window inside the OS shell, complete with traffic-light controls and keyboard shortcuts (⌘1–⌘6).

### Visual identity

- **Theme:** dark-mode macOS desktop aesthetic with subtle gradient wallpaper
- **Accent palette:** electric blue and cyan against deep navy/black backgrounds
- **Typography:** SF Pro / system font stack for UI chrome; JetBrains Mono for terminal and code blocks
- **Glassmorphism:** semi-transparent windows with backdrop-blur, soft borders, and layered shadows
- **Motion:** smooth window opening/closing animations, hover states on every interactive element

### Core components

- **Menu bar** — top-of-screen macOS-style bar with File / View / Layout / Window / Help menus, each containing functional shortcuts
- **Window manager** — every section is a real window: drag, focus, minimize, close, cascade, tile, and "show all"
- **Terminal emulator** — bottom-of-screen command-line interface with input sanitization; type `help` for available commands
- **Apple Watch widget** — live time display in the top-right with a watch face design that scales for narrow viewports
- **Dock-like nav** — icon-based section switcher (👤 ⚙️ 📊 🛡️ 💼 📡 ⌨️ ⌚ 📄)
- **Status indicators** — live counters showing project, cert, and skill counts

### Sections

1. **About** — terminal-style intro with `cat mission.txt` and `cat goals.txt` outputs framing focus areas (Pentest, Cloud Security, Red Team, OSINT)
2. **Projects** — repo cards with stack tags, descriptions, and GitHub/Live links; filterable by category (Full-Stack, Security)
3. **Skills** — proficiency matrix with visual progress bars (Web Dev Core, Data & Engineering, Cybersecurity Foundations, Pentest & Recon, Cloud Security), tooling cloud, and cert roadmap
4. **Certifications** — verified credential cards with platform logos and direct verification links (TryHackMe, Credly)
5. **Experience** — chronological work log styled as a `cat experience.log` output
6. **Contact** — interfaces panel listing email, GitHub, and LinkedIn with copy and download actions

### Responsive design

The portfolio adapts across four distinct breakpoints:

- **Desktop (≥1280px)** — full OS shell with multiple windows visible simultaneously
- **Tablet (768–1279px)** — single-window focus with dock navigation
- **Mobile (≤767px)** — vertically stacked card layout, dock collapses to bottom-of-screen icon row
- **Apple Watch / ultra-narrow (≤320px)** — minimal widget view with progress rings, focus areas, and section icons

---

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | React |
| Styling | Custom CSS (no Tailwind), CSS variables for theming |
| Animation | CSS transitions + JavaScript window manager |
| Terminal | Vanilla JS event-driven command parser |
| Hosting | Vercel |
| Domain | jeelspatel.vercel.app |

---

## Recreation prompt

If you want to recreate this design or use it as a reference, here's the full prompt I'd give to an AI design tool to reproduce the visual language and structure:

> Build a single-page personal portfolio website styled as a macOS desktop operating system. The portfolio should not scroll vertically — instead, each portfolio section should open as a draggable window inside an OS shell. Use a dark-mode aesthetic with electric blue and cyan accents on deep navy backgrounds. Apply glassmorphism throughout: semi-transparent panels with backdrop-blur, soft 1px borders, and layered shadows for depth.
>
> **Layout requirements:**
> - Top menu bar with macOS-style File / View / Window / Help menus, each containing keyboard shortcuts (⌘1–⌘6 to open sections, ⌘W to close, ⌘T to tile, ⌘D to cascade)
> - Bottom dock with circular section icons (About, Projects, Skills, Certifications, Experience, Contact, Terminal, Watch, Resume)
> - Live time display styled as an Apple Watch widget in the top-right corner
> - Wallpaper gradient background, subtle and non-distracting
>
> **Sections to include (each opens as its own draggable window):**
> 1. **About** — terminal-style with `$ cat mission.txt` and `$ cat goals.txt` blocks framing the user's mission and career goals; tags listing focus areas (Penetration Testing, Cloud Security, Red Team, OSINT)
> 2. **Projects** — card grid with stack tags, descriptions, GitHub and Live demo links; filterable by category
> 3. **Skills** — visual proficiency bars for skill domains, plus a tooling tag cloud and a "certification roadmap" arrow list
> 4. **Certifications** — verified credential cards with platform logos and links to public verification pages
> 5. **Experience** — chronological work log styled as `cat experience.log` terminal output
> 6. **Contact** — "interfaces" panel listing email, GitHub, LinkedIn with copy buttons and a resume download
>
> **Interactive features:**
> - A working terminal emulator pinned to the bottom of the screen with a `$` prompt; typing `help` lists available commands; commands include `whoami`, `skills`, `projects`, `contact`, `clear`
> - All windows must be draggable, focusable, and closable; clicking a window brings it forward
> - Keyboard shortcuts must actually work (⌘1 opens About, etc.)
> - Smooth open/close animations on all windows
>
> **Responsive behavior:**
> - Desktop (≥1280px): multi-window OS shell as designed
> - Tablet (768–1279px): single-window focus mode
> - Mobile (≤767px): vertical card stack, dock collapses to bottom row
> - Apple Watch / ≤320px: minimal widget showing time, progress rings for focus areas, and tap-to-section icons
>
> **Tech stack:** React with vanilla CSS (no Tailwind), CSS variables for theming, deployed on Vercel. Use system font stack (SF Pro Display) for UI and JetBrains Mono for terminal. No external UI libraries — build the window manager and terminal from scratch.
>
> **Tone:** professional but playful. The user is a cybersecurity student pivoting into offensive security and DevSecOps, so reflect that identity in the copy (mission statement should reference cybersecurity, the cert roadmap should include CompTIA Security+, eJPT, AWS Cloud Practitioner, OSCP). Avoid stock language. Avoid generic "creative developer" framing — this is a security portfolio.

---

## Local development

```bash
git clone https://github.com/jeels1512/my_portfolio.git
cd my_portfolio
npm install
npm run dev
```

Visit `http://localhost:5173` (or whichever port Vite assigns).

---

## Connect

- 🌐 **Portfolio:** https://jeelspatel.vercel.app
- 💼 **LinkedIn:** [in/jeels-patel](https://www.linkedin.com/in/jeels-patel/)
- 🐙 **GitHub:** [@jeels1512](https://github.com/jeels1512)
- 🛡️ **TryHackMe:** [jeelspatel1512](https://tryhackme.com/p/jeelspatel1512) — Top 20% · 33 rooms · 8 badges
- ✉️ **Email:** jeelsspatel1512@gmail.com

---

## License

© 2026 Jeels Patel. All design and code original work — feel free to use the recreation prompt above as inspiration, but please don't fork the styling 1:1.
