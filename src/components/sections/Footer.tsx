import { resume } from "@/content/resume";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {resume.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${resume.email}`} className="inline-flex min-h-11 items-center hover:text-text">
              Email
            </a>
          </li>
          <li>
            <a href={resume.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-text">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          {resume.links.github && (
            <li>
              <a href={resume.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-text">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          <li>
            <a href="#top" className="inline-flex min-h-11 items-center font-medium hover:text-text">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
