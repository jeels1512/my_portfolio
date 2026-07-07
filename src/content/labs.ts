// EDIT ME — Labs & Writeups.
// order = chronology (oldest first); the index numbering is "earned", so keep it in order.
// TODO: replace the placeholder rows below with your actual completed rooms/boxes.

export type Platform = "THM" | "HTB" | "CTF";
export type Difficulty = "easy" | "medium" | "hard";

export interface Lab {
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  // one-line: what you exploited / what you learned
  summary: string;
  // optional writeup link — omit or leave "" if none yet
  writeup?: string;
}

export const labs: Lab[] = [
  // <!-- TODO: replace with your actual completed rooms -->
  {
    name: "Blue",
    platform: "THM",
    difficulty: "easy",
    summary:
      "Exploited MS17-010 (EternalBlue) to land a SYSTEM shell on an unpatched Windows host.",
  },
  {
    name: "Basic Pentesting",
    platform: "THM",
    difficulty: "easy",
    summary:
      "Enumerated services with Nmap, brute-forced SSH, and escalated via a weak SUID binary.",
  },
  {
    name: "Mr Robot CTF",
    platform: "THM",
    difficulty: "medium",
    summary: "WordPress foothold, cracked hashes, and privesc through an nmap interactive shell.",
  },
  {
    name: "RootMe",
    platform: "THM",
    difficulty: "easy",
    summary:
      "Bypassed a file-upload filter to plant a PHP web shell, then SUID-based root escalation.",
  },
  {
    name: "Pickle Rick",
    platform: "THM",
    difficulty: "easy",
    summary: "Web enumeration and command injection to chain three flags across the filesystem.",
  },
  {
    name: "Simple CTF",
    platform: "THM",
    difficulty: "easy",
    summary: "Found a vulnerable CMS via version fingerprinting, then sudo misconfig to root.",
  },
  // <!-- TODO: add more as you complete them -->
];

// EDIT ME — footer stat strip
export const labStats = {
  platforms: "TryHackMe · HackTheBox",
  focus: "web · network · privesc",
  // TODO: add your TryHackMe username to embed the public badge (leave "" to hide)
  thmUsername: "",
};
