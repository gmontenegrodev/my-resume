import { resume } from "@/content/resume";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DownloadIcon, MapPinIcon } from "@/components/ui/icons";
import { HeroVideo } from "@/components/sections/HeroVideo";

export function Hero() {
  const video = resume.heroVideo;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-hero text-on-dark"
    >
      {video && (
        <>
          <HeroVideo webm={video.webm} mp4={video.mp4} poster={video.poster} />
          {/* Darken the video so the text stays readable: strong on the left
              (where the text is), lighter on the right (where the robot is).
              On phones and tablets the text covers most of the width, so darken evenly. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-hero/75 lg:bg-transparent lg:bg-linear-to-r lg:from-hero/95 lg:via-hero/85 lg:via-55% lg:to-hero/15"
          />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary-on-dark uppercase">
            {resume.focus}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {resume.name}
          </h1>
          <p className="mt-3 text-xl font-semibold sm:text-2xl">{resume.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted">{resume.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-dark-muted">
            <li className="flex items-center gap-1.5">
              <MapPinIcon />
              {resume.location}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-on-dark" aria-hidden="true" />
              {resume.availability}
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#contact">Contact me</ButtonLink>
            {resume.resumePdf && (
              <ButtonLink href={resume.resumePdf} variant="secondaryOnDark" download>
                <DownloadIcon />
                Download resume
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
