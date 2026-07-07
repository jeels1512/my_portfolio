import { Reveal, RevealItem } from "./Reveal";

interface SectionProps {
  id: string;
  n: string; // section number, e.g. "02"
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

// Standard section shell: numbered accent eyebrow + heading.
export function Section({ id, n, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
      aria-labelledby={`${id}-title`}
    >
      <Reveal className="mb-12 md:mb-16">
        <RevealItem>
          <div className="flex items-center gap-3">
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="font-mono text-xs text-text-dim">{n}</span>
          </div>
        </RevealItem>
        <RevealItem>
          <h2
            id={`${id}-title`}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-[40px] md:leading-tight"
          >
            {title}
          </h2>
        </RevealItem>
        {intro && (
          <RevealItem>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-muted md:text-base">
              {intro}
            </p>
          </RevealItem>
        )}
      </Reveal>
      {children}
    </section>
  );
}
