import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { ExternalIcon, GitHubIcon } from "@/components/ui/icons";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline";

export function Projects() {
  return (
    <Section id="projects" title="Projects" tone="surface">
      <ul className="grid gap-6">
        {resume.projects.map((project) => (
          <li key={project.title}>
            <article className="rounded-lg border border-border bg-background p-6 sm:p-8">
              <header>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.status && (
                    <span className="rounded-full border border-primary px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-muted">{project.role}</p>
              </header>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text">{project.description}</p>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
              </div>
              {(project.codeUrl || project.demoUrl) && (
                <div className="mt-4 flex flex-wrap gap-6">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <ExternalIcon />
                      Live demo<span className="sr-only"> of {project.title} (opens in a new tab)</span>
                    </a>
                  )}
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <GitHubIcon className="h-4 w-4 shrink-0" />
                      Code<span className="sr-only"> for {project.title} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
