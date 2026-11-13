# starting-template

Starter template for new web projects built with [Claude Code](https://claude.com/claude-code). It contains ready-made agents and skills, plus starter `CLAUDE.md` and `PLAN.md` files, so every new project begins with the same team and the same standards.

## What's inside

```
.claude/
├── agents/     the team
└── skills/     the practices the team follows
CLAUDE.md       project instructions: stack, commands, rules, brand
PLAN.md         what to build, and the API contract
.gitignore
```

### Agents

| Agent | Persona | Role | Edits files? |
|---|---|---|---|
| `backend` | Pedro | APIs, database models, migrations, business logic, auth | Yes |
| `frontend` | Frank | Pages, components, styling, design, connecting the UI to the API | Yes |
| `reviewer` | Rita | Reviews code against CLAUDE.md, PLAN.md, and the skills | No |
| `security` | Sam | Audits for leaked secrets, vulnerable dependencies, injection, auth flaws | No |
| `seo` | Peter | Reviews pages for search optimization | No |

Builders write code. Checkers are read-only and report findings, so every change gets a second look.

### Skills

| Skill | Covers | Used by |
|---|---|---|
| `python-fastapi` | Python, FastAPI, SQLAlchemy, migrations, security, testing | backend, reviewer |
| `react-nextjs` | React 19, Next.js App Router, data and state, SEO and performance | frontend, reviewer |
| `design` | Layout, spacing, typography, color, components, landing pages, accessibility | frontend, reviewer |

## How to use

1. Click **Use this template** on GitHub and create a new repository, then clone it. Or with the GitHub CLI:
   ```bash
   gh repo create my-new-project --template gmontenegrodev/starting-template --private --clone
   ```
2. Fill in `CLAUDE.md`: the project description, stack, commands, and the Brand section.
3. Fill in `PLAN.md`: the goal, the pages, and the API contract if there is a backend.
4. Open the folder in Claude Code and run `/agents` to confirm the five agents are loaded.
5. Ask for work by role or by name:
   - "Frank, build the landing page from PLAN.md."
   - "Pedro, implement the endpoints in the contract."
   - "Rita, review my last changes."
   - "Sam, audit the repo." / "Peter, review the home page for SEO."

## Suggested workflow

1. Plan: write or update `PLAN.md`.
2. Build: backend and frontend agents implement the plan.
3. Review: the reviewer checks the changes.
4. Before release: run the security and SEO agents.

## Customizing

- Change an agent by editing its file in `.claude/agents/`.
- Change a practice by editing the skill in `.claude/skills/`. Each skill has a short `SKILL.md` and a `references/` folder with the details.
- If a project uses a different stack, state it in `CLAUDE.md`; the agents follow that file first.
