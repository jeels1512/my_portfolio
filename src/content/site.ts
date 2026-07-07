// EDIT ME — global site config, links, and hero copy.

export const site = {
  name: "Jeels Patel",
  role: "Offensive Security & Cloud Pentesting",
  location: "Toronto, ON",
  url: "https://jeelspatel.vercel.app",
  email: "jeelsspatel1512@gmail.com",
  resume: "/assets/Jeels-Patel-Resume.pdf",

  socials: {
    github: "https://github.com/jeels1512",
    githubHandle: "github.com/jeels1512",
    linkedin: "https://www.linkedin.com/in/jeels-patel",
    linkedinHandle: "in/jeels-patel",
  },

  hero: {
    eyebrow: "~/recon · target acquired",
    nameLine: "Jeels Patel",
    tagline: "breaks things to learn how they're secured.",
    sub: "Cybersecurity student focused on offensive security and cloud pentesting — building skills through hands-on labs, CTFs, and real engagements. Toronto, ON.",
    status: "seeking cloud-sec / pentest internships — 2026",
  },

  // ~/net closing section
  contact: {
    heading: "Open to cloud-sec & pentest internships.",
  },
} as const;

// nav sections — order = scroll order; label is what shows in the nav (lowercase mono)
export const sections = [
  { id: "labs", label: "labs", path: "~/labs" },
  { id: "builds", label: "builds", path: "~/builds" },
  { id: "skills", label: "skills", path: "~/skills" },
  { id: "creds", label: "creds", path: "~/creds" },
  { id: "log", label: "log", path: "~/log" },
  { id: "net", label: "net", path: "~/net" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
