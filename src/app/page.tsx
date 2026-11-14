import { resume } from "@/content/resume";
import { siteUrl } from "@/lib/site";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Structured data so search engines understand this page is about a person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: resume.title,
  description: resume.tagline,
  url: siteUrl,
  email: `mailto:${resume.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Sunrise", addressRegion: "FL", addressCountry: "US" },
  sameAs: [resume.links.linkedin, resume.links.github].filter(Boolean),
  knowsAbout: resume.skills.flatMap((group) => group.items),
  knowsLanguage: resume.languages,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Florida International University" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Content is our own static data; escape "<" so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
