// EDIT ME — Capability map (no percentages, honest three-state).

export const capabilities = {
  // used regularly
  workingWith: [
    "Burp Suite",
    "Nmap",
    "Wireshark",
    "Linux CLI",
    "Kali",
    "Git",
    "OWASP Top 10",
    "JS / React / Node",
  ],
  // actively learning
  learningNow: [
    "Metasploit",
    "Cloud security (AWS / Azure)",
    "Privilege escalation",
    "Active Directory basics",
  ],
  // on the roadmap
  nextUp: ["Exploit dev", "C2 frameworks"],
};

// cert roadmap timeline — order = chronology.
export interface Cert {
  name: string;
  status: string; // e.g. "in progress", "2026", "long-term"
  active?: boolean; // the currently in-progress node pulses
}

export const certRoadmap: Cert[] = [
  { name: "Security+", status: "in progress", active: true },
  { name: "eJPT", status: "2026" },
  { name: "AWS CCP", status: "2026" },
  { name: "OSCP", status: "long-term" },
];
