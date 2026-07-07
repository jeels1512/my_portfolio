import { Reveal, RevealItem } from "./Reveal";

interface SectionProps {
  id: string;
  path: string; // mono eyebrow, e.g. "~/labs"
  title: string;
  intro?: string;
  children: React.ReactNode;
}

// Standard section shell: mono path eyebrow + Space Grotesk heading.
export function Section({ id, path, title, intro, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-20 md:py-28"
      aria-labelledby={`${id}-title`}
    >
      <Reveal className="mb-10 md:mb-14">
        <RevealItem>
          <p className="mono-label">{path}</p>
        </RevealItem>
        <RevealItem>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-3xl font-medium tracking-tight text-text md:text-4xl"
          >
            {title}
          </h2>
        </RevealItem>
        {intro && (
          <RevealItem>
            <p className="mt-4 max-w-2xl text-text-dim">{intro}</p>
          </RevealItem>
        )}
      </Reveal>
      {children}
    </section>
  );
}
