// Shared motion constants — one easing everywhere.

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  micro: 0.15,
  reveal: 0.4,
  hero: 0.7,
} as const;

// Section reveal: fade + rise 16px, children stagger.
export const revealParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const revealChild = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE },
  },
};

// viewport config for whileInView — reveal once, never re-animate on scroll-up
export const viewportOnce = { once: true, margin: "-80px" } as const;
