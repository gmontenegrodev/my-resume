import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-12">
        {resume.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="border-l-2 border-border pl-6">
            <article>
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 text-base font-medium text-muted">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        {job.company}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      job.company
                    )}
                    {job.location && <span> · {job.location}</span>}
                  </p>
                </div>
                {job.period && (
                  <p className="shrink-0 text-sm font-medium text-muted">{job.period}</p>
                )}
              </header>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {job.tech && job.tech.length > 0 && (
                <div className="mt-4">
                  <TagList items={job.tech} label={`Technologies used at ${job.company}`} />
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
