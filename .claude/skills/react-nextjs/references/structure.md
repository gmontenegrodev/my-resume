# Folder structure reference

Next.js doesn't force a structure; it supports several. Pick one by looking at the project, then stay consistent. If the project already has a structure, follow it and don't reorganize without being asked.

## Step 1: assess the project

- How many distinct features or domains does the plan describe (e.g. quizzes, user accounts, billing)?
- Will multiple agents or people work on different features at once?
- Is it expected to keep growing after the first version?

## Structure A: simple (small apps, 1–3 features)

Use when the app is small and unlikely to grow much.

```
src/
├── app/              # routes only: pages, layouts, loading, error
├── components/
│   ├── ui/           # generic building blocks (Button, Card, Input)
│   └── ...           # app-specific components
├── lib/
│   ├── api/          # typed API client + mocks
│   └── utils.ts
└── types/            # shared types from the API contract
```

## Structure B: feature-based (larger or growing apps)

Use when there are several distinct features, parallel work, or expected growth. Each feature owns its components, data access, actions, and types, so changes stay local and agents don't collide.

```
src/
├── app/                      # thin routes that compose features
│   ├── (marketing)/
│   └── quiz/[topic]/page.tsx
├── features/
│   ├── quiz/
│   │   ├── components/
│   │   ├── actions.ts        # Server Actions for this feature
│   │   ├── data.ts           # server-only data access
│   │   └── types.ts
│   └── topics/
├── components/ui/            # shared generic UI only
└── lib/                      # cross-cutting: API client, auth, env
```

- Routes in `app/` stay thin: they read params, call feature code, and compose components.
- Features don't import each other's internals. Shared code moves to `components/ui` or `lib`.

## Rules for either structure

- Use `src/` to separate app code from config files.
- Colocate files next to what uses them; move them to a shared folder only when a second place needs them.
- Use private folders (`_components`) for route-local files inside `app/`.
- Use route groups `(name)` to give sections different layouts without changing URLs.
- One component per file, named in PascalCase; hooks start with `use`.
- Avoid barrel files (`index.ts` that re-export everything); they slow builds and blur boundaries.
- State which structure you chose and why in your report, so the decision is visible.
