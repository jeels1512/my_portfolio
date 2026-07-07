// EDIT ME — Builds / Projects, framed through a security lens.

export interface Project {
  name: string;
  stack: string; // shown in the mono "file header" bar
  language: string; // shown in the file header bar
  tags: string[];
  description: string;
  repo: string;
  repoLabel: string;
}

export const projects: Project[] = [
  {
    name: "Uber Clone",
    stack: "MERN",
    language: "JavaScript",
    tags: ["MongoDB", "Express", "React", "Node", "JWT"],
    description:
      "Full-stack ride-booking app. Built the auth layer myself — JWT issuance, session handling, input validation — to understand exactly where token-based auth breaks.",
    repo: "https://github.com/jeels1512/Uber-clone",
    repoLabel: "Uber-clone",
  },
  {
    name: "Disney+ Clone",
    stack: "React",
    language: "JavaScript",
    tags: ["React", "Router", "Firebase"],
    description:
      "Streaming UI with client-side routing. Studied XSS surface in rendered content and route-level access patterns while building it.",
    repo: "https://github.com/jeels1512/Disney-Clone",
    repoLabel: "Disney-Clone",
  },
  {
    name: "Simon Says",
    stack: "Vanilla JS",
    language: "JavaScript",
    tags: ["DOM", "State machine"],
    description:
      "Event-driven state machine in the DOM. Small, but it's where I learned to reason about event flow — the same reasoning DOM-based XSS requires.",
    repo: "https://github.com/jeels1512/Simon-says-game",
    repoLabel: "Simon-says-game",
  },
];

export const projectsIntro =
  "I build the things I test. Understanding the stack from the inside is half of breaking it.";
