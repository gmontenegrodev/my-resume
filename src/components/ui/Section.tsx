import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  /** Alternate background to separate neighbouring sections. */
  tone?: "default" | "surface";
};

export function Section({ id, title, children, tone = "default" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-16 py-16 sm:py-24 ${tone === "surface" ? "bg-surface" : "bg-background"}`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id={headingId} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
