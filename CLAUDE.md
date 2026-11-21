# CLAUDE.md

Project instructions for Claude Code. Every agent reads this file first. Replace each `[placeholder]` when you start a new project, and delete sections that don't apply.

## Project

- **Name:** my-resume
- **What it is:** A one-page personal portfolio and resume site that shows my experience, projects and skills, with a downloadable PDF CV.
- **Who it's for:** Recruiters and hiring managers.
- **Status:** in progress (site built, not deployed yet)

## Stack

- **Frontend:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS
- **Backend:** none. This project has no backend, so do not use the `backend` agent.
- **Hosting:** Google Cloud: Firebase Hosting (serves the static `out/` folder)
- **Package managers:** npm

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Run locally | `npm run dev` |
| Build (static export to `out/`) | `npm run build` |
| Preview built site | `npm start` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` (run `npm run build` once first, so Next.js generates its route types) |
| Deploy | `npm run deploy` (builds, then `firebase deploy --only hosting`) |

## Folder structure

```
src/app/              pages, layout, metadata, sitemap, robots
src/components/       sections/ (page sections) and ui/ (buttons, tags, icons)
src/lib/site.ts       public site URL
src/content/resume.ts all resume text (the only file to edit for content)
public/               resume.pdf, images, favicon
firebase.json         Firebase Hosting config
PLAN.md               what we are building
CLAUDE.md             this file
```

## How we work

1. `PLAN.md` is the source of truth for what to build and for the API contract. If PLAN.md is missing, empty, or unclear, stop and ask; do not guess.
2. Never change the API contract without the user's approval. Report the problem instead.
3. Builders write the code; checkers review it and never edit files.
4. Never commit secrets. Use environment variables and keep `.env` out of git; update `.env.example` when a new variable is added.
5. Run tests, lint, and type checks before reporting a task as done.

## Team

| Agent | Persona | Role | Edits files? |
|---|---|---|---|
| `backend` | Pedro | APIs, database, business logic, auth | Yes |
| `frontend` | Frank | Pages, components, styling, design | Yes |
| `reviewer` | Rita | Code review against this file and PLAN.md | No |
| `security` | Sam | Security audit | No |
| `seo` | Peter | SEO review | No |

Suggested order for a feature: plan in PLAN.md, then backend and frontend build, then reviewer, then security and seo before release.

## Conventions

- Static export only: no API routes, server actions, middleware, or features that need a Node server at runtime.
- Never hardcode resume text in components; read it from `src/content/resume.ts`.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Commit messages: short imperative summary line (e.g. "Add projects section").

## Brand

Used by the `design` skill. Fill this in before any UI work.

**Business:** Personal portfolio of an engineering and applied AI leader focused on AI adoption and baseball decision systems.
**Audience:** Recruiters and hiring managers in tech, applied AI, and baseball operations.
**Page goal:** Contact me (by email, LinkedIn or GitHub).

### Colors
- Primary (buttons, links): #2563EB
- Background: #FFFFFF
- Surface (cards, alternate sections): #F8FAFC
- Text: #0F172A
- Muted text: #475569
- Border: #E2E8F0
- Accent or secondary (optional): none
- Hero (dark, over the background video): background #0B1120, text #FFFFFF, muted text #CBD5E1, eyebrow/links #93C5FD. Keep at least 4.5:1 contrast for every frame of the video.

### Typography
- Heading font: Inter (Google Fonts, loaded with `next/font/google`)
- Body font: Inter (Google Fonts, loaded with `next/font/google`)

### Style
- Overall feel: clean, minimal, professional
- Corners: slightly rounded
- Imagery: hero background video (small humanoid robot, muted loop), optional profile photo, and real project screenshots
- Reference sites we like: to be provided
- Things to avoid: dark mode, gradients, stock photos, skill progress bars or percentages, heavy animations. Exceptions: the hero background video (stock clip) and its dark overlay gradient, which keeps the hero text readable. The video must stay pausable and must not autoplay for visitors who prefer reduced motion.

### Voice
- Tone: direct and practical, first person, no jargon
- We say: concrete results with numbers ("cut load time by 40%")
- We don't say: buzzwords like "passionate", "rockstar", "ninja", "guru"

### Assets
- Logo: none (name in text)
- Favicon: `src/app/icon.svg` ("GM" monogram)
- Photos: to be provided (`public/images/profile.jpg`, optional)
- Hero video: `public/videos/hero.webm`, `hero.mp4` (720p, about 1 MB each, 20 s seamless loop) and `hero-poster.webp`
