import Image from "next/image";
import { resume, type Project } from "@/content/resume";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { ExternalIcon, GitHubIcon } from "@/components/ui/icons";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline";

function ProjectImage({ project }: { project: Project }) {
  if (!project.image) {
    // Placeholder until a real screenshot is added in resume.ts.
    return (
      <div
        aria-hidden="true"
        className="flex aspect-video w-full items-center justify-center bg-surface text-2xl font-bold tracking-tight text-border"
      >
        {project.title}
      </div>
    );
  }
  return (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={1600}
      height={900}
      sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
      className="aspect-video w-full object-cover"
    />
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects" tone="surface">
      <ul className="grid gap-6 md:grid-cols-2">
        {resume.projects.map((project) => (
          <li key={project.title} className="flex">
            <article className="flex w-full flex-col overflow-hidden rounded-lg border border-border bg-background">
              <div className="border-b border-border">
                <ProjectImage project={project} />
              </div>
              <div className="flex flex-1 flex-col p-6">
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
                <p className="mt-4 leading-relaxed text-text">{project.description}</p>
                {project.highlights.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-border">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
                </div>
                {(project.codeUrl || project.demoUrl) && (
                  <div className="mt-auto flex flex-wrap gap-6 pt-4">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <ExternalIcon />
                        Visit website<span className="sr-only"> of {project.title} (opens in a new tab)</span>
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
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
