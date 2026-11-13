import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <Section id="contact" title="Let's talk">
      <p className="max-w-2xl text-lg leading-relaxed text-muted">
        I&apos;m open to engineering leadership and applied AI roles. The fastest way to reach me is
        email. I usually reply within a day or two.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${resume.email}`}>
          <MailIcon />
          Email me
        </ButtonLink>
        <ButtonLink href={resume.links.linkedin} variant="secondary" external>
          <LinkedInIcon />
          LinkedIn
        </ButtonLink>
        {resume.links.github && (
          <ButtonLink href={resume.links.github} variant="secondary" external>
            <GitHubIcon />
            GitHub
          </ButtonLink>
        )}
      </div>
      <p className="mt-6 text-sm text-muted">
        Or write to{" "}
        <a href={`mailto:${resume.email}`} className="font-medium text-primary underline underline-offset-4">
          {resume.email}
        </a>
      </p>
    </Section>
  );
}
