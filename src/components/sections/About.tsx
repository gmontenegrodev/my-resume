import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" title="About" tone="surface">
      <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
        {resume.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
