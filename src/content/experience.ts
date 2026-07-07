// EDIT ME — Experience log. Newest entries go at the top.

export interface Credential {
  platform: string;
  id: string;
  link: string;
}

// ~/creds — verified credentials
export const credentials: Credential[] = [
  {
    platform: "TryHackMe",
    id: "THM-A1PHNEIIPB",
    link: "https://tryhackme.com/certificate/THM-A1PHNEIIPB",
  },
  {
    platform: "Cisco · Credly",
    id: "4f3bcdec-bb35-4dbe-af15-5b8c373cecab",
    link: "https://www.credly.com/badges/4f3bcdec-bb35-4dbe-af15-5b8c373cecab",
  },
];

// ~/log — experience timeline
export interface ExperienceEntry {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Web Developer Intern",
    org: "STEM Canada",
    location: "Toronto, ON",
    period: "internship",
    bullets: [
      "Built and maintained responsive pages for STEM education initiatives.",
      "Improved navigation and usability, reducing drop-off.",
      "Applied secure-coding and QA review to catch vulnerabilities pre-release.",
    ],
  },
];
