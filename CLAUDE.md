# CLAUDE.md

Project instructions for Claude Code. Every agent reads this file first. Replace each `[placeholder]` when you start a new project, and delete sections that don't apply.

## Project

- **Name:** [project name]
- **What it is:** [one or two sentences]
- **Who it's for:** [the users or visitors]
- **Status:** [new / in progress / live]

## Stack

- **Frontend:** [Next.js 16, React 19, TypeScript, Tailwind CSS]
- **Backend:** [Python, FastAPI, SQLAlchemy, PostgreSQL, or "none"]
- **Hosting:** [Vercel, Railway, other]
- **Package managers:** [pnpm or npm for frontend, uv for backend]

If this project has no backend, say so here so the backend agent is not used.

## Commands

| Task | Frontend | Backend |
|---|---|---|
| Install | `[npm install]` | `[uv sync]` |
| Run locally | `[npm run dev]` | `[uv run fastapi dev app/main.py]` |
| Tests | `[npm test]` | `[uv run pytest]` |
| Lint | `[npm run lint]` | `[uv run ruff check .]` |
| Type check | `[npx tsc --noEmit]` | `[uv run mypy .]` |

## Folder structure

```
[frontend/   Next.js app]
[backend/    FastAPI app]
PLAN.md      what we are building and the API contract
CLAUDE.md    this file
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

- [Branch names, commit message style, or other team rules]
- [Anything Claude should always or never do in this project]

## Brand

Used by the `design` skill. Fill this in before any UI work.

**Business:** [what the company does, in one sentence]
**Audience:** [who the site is for]
**Page goal:** [the single action a visitor should take]

### Colors
- Primary (buttons, links): #______
- Background: #______
- Surface (cards, alternate sections): #______
- Text: #______
- Muted text: #______
- Border: #______
- Accent or secondary (optional): #______

### Typography
- Heading font: [name, source]
- Body font: [name, source]

### Style
- Overall feel: [three adjectives, e.g. clean, bold, friendly]
- Corners: [sharp / slightly rounded / very rounded]
- Imagery: [photos of real work / illustrations / product screenshots]
- Reference sites we like: [URLs and what we like about each]
- Things to avoid: [e.g. stock photos, gradients, dark mode]

### Voice
- Tone: [e.g. direct and practical, no jargon]
- We say: [preferred words and phrases]
- We don't say: [words to avoid]

### Assets
- Logo: [path in the repo]
- Favicon: [path]
- Photos: [path or "to be provided"]
