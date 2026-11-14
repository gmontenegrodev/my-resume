import { resume } from "@/content/resume";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DownloadIcon, MapPinIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          {resume.focus}
        </p>
        <h1 id="hero-heading" className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {resume.name}
        </h1>
        <p className="mt-3 text-xl font-semibold text-text sm:text-2xl">{resume.title}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{resume.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <MapPinIcon />
            {resume.location}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            {resume.availability}
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#contact">Contact me</ButtonLink>
          {resume.resumePdf && (
            <ButtonLink href={resume.resumePdf} variant="secondary" download>
              <DownloadIcon />
              Download resume
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
