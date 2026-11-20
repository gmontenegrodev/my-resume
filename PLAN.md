# PLAN.md

What we are building. The frontend and reviewer agents treat this file as the source of truth. Update it when a decision changes.

## 1. Goal

- **Problem:** Recruiters need to see my experience, projects and skills fast, and reach me easily. A PDF alone is hard to find, and it doesn't show real work.
- **Outcome:** A one-page portfolio and resume site. A visitor can read who I am, see my experience and projects, download my CV as a PDF, and contact me with one click.
- **Success looks like:**
  - A recruiter understands my role and seniority within 10 seconds of opening the page (the hero section).
  - The "Contact me" action is always one click away (the hero button, plus a link in the header).
  - Lighthouse scores of 95 or more for Performance, Accessibility, Best Practices and SEO on mobile.
  - The site works without JavaScript for reading content, because it is static HTML.

## 2. Scope

**In this version**
- One page (`/`) with the sections listed in section 3.
- A downloadable PDF resume (`/resume.pdf`).
- Contact by links only: email (`mailto:`), LinkedIn, GitHub.
- SEO basics: page title and description, Open Graph image, JSON-LD `Person` data, `sitemap.xml`, `robots.txt`, favicon.
- A custom 404 page.
- A short privacy page (`/privacy`), linked from the footer.
- A responsive layout (mobile first) and accessibility to WCAG 2.2 AA.
- Static export (`next build` with `output: "export"`) deployed to Firebase Hosting.

**Not in this version**
- No backend, no database, no API routes, no server actions.
- No contact form and no third-party form service.
- No blog or writing section.
- No separate project detail pages (projects link out to GitHub or a live demo).
- No dark mode or theme toggle.
- No CMS or admin page. Content is edited in one TypeScript file.
- No analytics, cookie banner, or Terms and Conditions. The site sets no cookies and collects no data, so none are needed. If analytics, a form, or embeds are added later, update `/privacy` and add a consent banner for EU/UK visitors.
- No multiple languages.

## 3. Pages and sections

### Page `/` (home): sections in order

| Section | Purpose | Content | Primary action |
|---|---|---|---|
| Header (sticky) | Fast navigation on a long page | Name or initials (links to top), anchor links: About, Experience, Projects, Skills, Contact | "Contact me" link, goes to `#contact` |
| Hero | Answers "who is this and what do they do?" in under 10 seconds | Full name (H1), job title (e.g. "Software & AI Engineer"), a one-sentence value line, location and availability (e.g. "Open to remote roles"), optional photo | Primary button "Contact me" goes to `#contact`; secondary button "Download resume" goes to `/resume.pdf` |
| About | Short personal summary | 2 or 3 short paragraphs: what I do, what I'm good at, what I'm looking for | none |
| Experience | Show career history and results | One entry per job, newest first: role, company (with link), dates, location or remote, 2 to 4 bullet points focused on results (numbers where possible), tech tags | none |
| Projects | Show real work | Grid of project cards (2 columns on tablet and desktop, 1 on mobile), BallGameAI first. Every card has a 16:9 image at the top (screenshot or cover, in `public/images/projects/`), then: title, one or two sentence description, my role, tech tags, links to "Code" (GitHub) and "Visit website" when available | Each card links out (opens in a new tab) |
| Skills | Let recruiters scan for keywords | Skills grouped, e.g. Languages, Frontend, Backend, AI / ML, Cloud & DevOps, Tools. Plain text tags, no progress bars or percentages | none |
| Education & certifications | Formal background | Degree, school, years; certifications with issuer and year | none |
| Contact | Turn interest into a conversation | Short line (e.g. "I'm open to new roles. The fastest way to reach me is email."), then buttons: Email, LinkedIn, GitHub | "Email me" button (`mailto:`) |
| Footer | Close the page | © year and name, the same social links, a "Back to top" link | none |

### Page `/privacy`

| Section | Purpose | Content | Primary action |
|---|---|---|---|
| Privacy note | Be transparent about data | No cookies, analytics or tracking; Firebase Hosting server logs; how emails are used; links to other sites; changes; contact email. Text lives in `src/content/privacy.ts` | none (linked from the footer) |

### Page `/404`

| Section | Purpose | Content | Primary action |
|---|---|---|---|
| Not found | Help a lost visitor | "Page not found" heading, one sentence | "Back to home" button goes to `/` |

### Content source

All text lives in **one typed data file**: `src/content/resume.ts`. Components only read from it. To update the resume, I edit that file and replace `public/resume.pdf`. Nothing else should need to change.

Example shape (the frontend agent finalizes the types):

```ts
export const resume = {
  name: "…",
  title: "…",
  tagline: "…",
  location: "…",
  availability: "…",
  email: "…",
  links: { linkedin: "…", github: "…" },
  about: ["…", "…"],
  experience: [
    { role: "…", company: "…", companyUrl: "…", start: "2023-01", end: null, location: "Remote",
      highlights: ["…"], tech: ["…"] },
  ],
  projects: [
    { title: "…", description: "…", role: "…", tech: ["…"], codeUrl: "…", demoUrl: "…", image: "…" },
  ],
  skills: [{ group: "Languages", items: ["TypeScript", "Python"] }],
  education: [{ degree: "…", school: "…", start: "…", end: "…" }],
  certifications: [{ name: "…", issuer: "…", year: "…" }],
};
```

**Status:** first draft created from the CV PDF (2026-11-13). Waiting for my review and the open items marked `TODO` in the file.

## 4. API contract

No backend in this project, so there is no API contract.

## 5. Data model

Nothing is stored. All content is static and lives in `src/content/resume.ts`.

## 6. Forms and integrations

| Form or service | What it does | Where the data goes |
|---|---|---|
| Email link | Opens the visitor's email app with my address filled in | Visitor's own email client (`mailto:`) |
| LinkedIn / GitHub links | Opens my profiles in a new tab | External sites |
| Firebase Hosting | Serves the static files from `out/` over HTTPS with a CDN | Google Cloud (Firebase project) |

**Environment variables needed:**
- `NEXT_PUBLIC_SITE_URL`: the public URL (e.g. `https://<project-id>.web.app` or a custom domain). Used for canonical URLs, Open Graph, the sitemap and JSON-LD. Not a secret. Goes in `.env.example`.

**Firebase files (in git, not secrets):** `firebase.json` (hosting config: `public: "out"`, clean URLs, cache headers) and `.firebaserc` (Firebase project ID).

## 7. Tasks

Ordered list of work. Mark items done as you go.

- [x] Plan the site and fill in PLAN.md and CLAUDE.md (main session)
- [x] Paste the CV; convert it into `src/content/resume.ts` content (main session)
- [ ] Review `src/content/resume.ts` and fill in its TODOs (me)
- [x] Scaffold Next.js 16 + React 19 + TypeScript + Tailwind at the repo root; set up static export (`output: "export"`, `images.unoptimized: true`, `trailingSlash` as needed for Firebase); ESLint; add scripts for lint and type check (frontend / Frank)
- [x] Build the layout: fonts with `next/font`, colors from the Brand section as Tailwind theme tokens, sticky header with skip link, footer (frontend / Frank)
- [x] Build the sections from section 3, all reading from `src/content/resume.ts` (frontend / Frank)
- [x] Build the 404 page (frontend / Frank)
- [x] SEO: metadata, Open Graph image, JSON-LD `Person`, `sitemap.ts` and `robots.ts` (static), favicon (frontend / Frank)
- [ ] Add `public/resume.pdf` (me, then frontend links it)
- [x] Add `firebase.json` and `.env.example`; document the deploy steps in README (main session)
- [ ] Create `.firebaserc` with `firebase use --add` (me, needs my Firebase project)
- [x] Add more experience entries: Tambourine and J.M. Field Marketing (main session)
- [ ] Add more projects, each with an image (me: send them; main session: add to `resume.ts` and `public/images/projects/`)
- [ ] Code review (reviewer / Rita)
- [ ] Security audit: dependencies, no secrets, safe external links (`rel="noopener noreferrer"`), security headers in `firebase.json` (security / Sam)
- [ ] SEO review (seo / Peter)
- [ ] Fix the review findings (frontend / Frank)
- [x] GitHub Action: checks on every PR, deploy to Firebase Hosting on every push to `main` (main session)
- [x] Service account `github-deploy-german-resume` with deploy roles (me)
- [x] Switch deploy login to Workload Identity Federation, because the organization blocks key files (main session)
- [ ] One-time setup: Workload Identity pool and provider (Cloud Shell commands in README) and three GitHub variables (me)
- [ ] First deploy: `npm run build` then `firebase deploy --only hosting` (me, with help from the main session)

## 8. Decisions and open questions

**Decided**
- 2026-11-13 Portfolio + resume on a single page, because recruiters scan quickly and one page is easy to share.
- 2026-11-13 Static site with no backend, because nothing needs to be stored. This means lower cost, fewer security risks, and simple hosting.
- 2026-11-13 Main audience is recruiters, and the main action is "Contact me".
- 2026-11-13 Hosting on Google Cloud through Firebase Hosting, using Next.js static export. It has a free tier, HTTPS and a CDN, and it fits the Google account I already have.
- 2026-11-13 Contact by links only (email, LinkedIn, GitHub), so there is no form service to set up or protect from spam.
- 2026-11-13 Content comes from my real CV, which I will paste in chat.
- 2026-11-13 Clean and minimal visual style, light theme only.
- 2026-11-13 Jazwares Lead React Developer ended in 2025 (2019 – 2025). NextEra Energy role is shown without dates, by choice.
- 2026-11-13 Phone number is not shown on the site; email and LinkedIn are, because the CV already makes them public.
- 2026-11-13 Custom domain is germanresume.com (currently the old site). Build and test the new site first; switch DNS to Firebase later.
- 2026-11-13 The "Download resume" and GitHub buttons stay hidden until `resumePdf` and `links.github` are set in `src/content/resume.ts`.
- 2026-11-20 GitHub logs in to Google Cloud with Workload Identity Federation (no key file). The shakochat.com organization blocks service account keys, and key-free login is safer anyway. Only runs from this repo's `main` branch are trusted.
- 2026-11-14 Deploy automatically with GitHub Actions on every push to `main`. Pull requests run lint, type check, and build only.
- 2026-11-14 Add a short privacy page; no cookie banner and no Terms, because the site sets no cookies and collects no data (checked in the browser).
- 2026-11-14 BallGameAI card uses a cropped screenshot of the ballgameai.com hero and links to the live site.
- 2026-11-14 Every project card has an image (16:9). A neutral placeholder shows until the real image is added.
- 2026-11-13 Next.js app at the repo root (no `frontend/` folder), because there is no backend.

**Open**
- GitHub profile URL (the plan has a GitHub button, but the CV has no GitHub link).
- The phone number is left off the site on purpose (public pages get scraped for spam). Should the downloadable PDF on the site also drop the phone number?
- Any other projects to show besides BallGameAI? Is there a public link or screenshot for BallGameAI?
- Do you want a profile photo in the hero? If yes, add it as `public/images/profile.jpg`.
- Do you want privacy-friendly analytics later (for example Firebase/Google Analytics), knowing that some regions then require a cookie notice?
- What is your Firebase project ID? (Needed for `.firebaserc`; it is not a secret. You can also run `firebase use --add` yourself.)
