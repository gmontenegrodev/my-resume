import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";

export function Education() {
  return (
    <Section id="education" title="Education & certifications" tone="surface">
      <ul className="grid gap-6 md:grid-cols-3">
        {resume.education.map((item) => (
          <li key={item.title} className="rounded-lg border border-border bg-background p-6">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.institution}</p>
            <p className="mt-3 text-sm font-medium text-muted">{item.period}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-base text-muted">
        <span className="font-semibold text-text">Languages:</span> {resume.languages.join(", ")}
      </p>
    </Section>
  );
}
