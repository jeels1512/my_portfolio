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
    linkedinHandle: "linkedin.com/in/jeels-patel",
  },

  hero: {
    eyebrow: "Offensive Security · Cloud Pentesting",
    name: "Jeels Patel",
    tagline: "I break things to learn how they're secured.",
    sub: "Cybersecurity student focused on offensive security and cloud pentesting — building real skills through hands-on labs, CTFs, and engagements.",
    status: "Available for cloud-security / pentest internships — 2026",
  },

  // Short professional summary for the About section.
  about: [
    "I'm a cybersecurity student in Toronto working toward a career in offensive security and cloud penetration testing. My focus is practical: I spend my time in hands-on labs and CTFs, mapping how real systems are attacked so I can understand how they should be defended.",
    "I build web applications too — not just to ship them, but to learn where authentication, input handling, and access control actually break. Understanding the stack from the inside is half of testing it well.",
  ],

  contact: {
    heading: "Let's talk security.",
    sub: "I'm open to cloud-security and penetration-testing internships for 2026. The fastest way to reach me is email.",
  },
} as const;

// nav / scroll sections — order = scroll order.
export const sections = [
  { id: "about", label: "About", n: "01" },
  { id: "labs", label: "Labs", n: "02" },
  { id: "projects", label: "Projects", n: "03" },
  { id: "skills", label: "Skills", n: "04" },
  { id: "experience", label: "Experience", n: "05" },
  { id: "contact", label: "Contact", n: "06" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
