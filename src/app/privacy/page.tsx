import type { Metadata } from "next";
import { privacy } from "@/content/privacy";
import { resume } from "@/content/resume";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: `Privacy | ${resume.name}`,
  description: "How this website handles your data: no cookies, no analytics, no tracking.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy</h1>
          <p className="mt-3 text-sm text-muted">Last updated: {privacy.lastUpdated}</p>
          <p className="mt-8 text-lg leading-relaxed text-muted">{privacy.intro}</p>

          {privacy.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {"link" in section && (
                <p className="mt-3">
                  <a
                    href={section.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {section.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              )}
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-xl font-semibold">Questions</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Email me at{" "}
              <a href={`mailto:${resume.email}`} className="font-medium text-primary underline underline-offset-4">
                {resume.email}
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
