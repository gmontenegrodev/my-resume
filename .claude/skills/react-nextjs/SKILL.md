---
name: react-nextjs
description: Best practices for building frontends with React 19 and the Next.js 16 App Router, based on the official react.dev and nextjs.org documentation. Use this skill for ANY frontend work in a React or Next.js project, including creating pages, components, layouts, forms, data fetching, state, styling decisions, connecting the UI to an API, SEO metadata, or deciding folder structure, even if the request doesn't mention React or Next.js by name.
---

# React + Next.js Frontend Practices

These rules come from the official React (react.dev) and Next.js (nextjs.org) documentation, condensed into how to work day to day. Follow the core rules below on every task, and read the matching reference file when a task touches that area.

## Before you write code

1. Read the project's CLAUDE.md and PLAN.md. The API contract in PLAN.md is the source of truth for data shapes; never invent fields.
2. If the project has an AGENTS.md or version-matched Next.js docs bundled in node_modules, prefer those over memory. APIs change between versions, and the bundled docs match the installed version.
3. Check package.json for the actual React and Next.js versions before using a newer API.
4. Look at how the existing code is organized and follow it. Consistency beats your preference.

## Core rules (always apply)

**Components**
- Components and hooks must be pure: same inputs, same output, no side effects during render. Never mutate props, state, or values created outside the component during render.
- Call hooks only at the top level of a component or custom hook, never inside conditions, loops, or nested functions.
- Keep components small and focused. When a component does two jobs, split it.
- Never define a component inside another component; it remounts and loses state on every render.
- Give list items stable, unique keys from the data (an id), never the array index for lists that can reorder or change.

**Server vs client (Next.js App Router)**
- Components are Server Components by default. Keep them that way unless they need interactivity, state, effects, or browser APIs.
- Add `'use client'` as low in the tree as possible, on the small interactive leaf, not on a whole page or layout.
- Pass Server Components into Client Components as `children` instead of importing them, so they stay on the server.
- Never import server-only code (database clients, secrets, private env vars) into a client file. Mark server modules with `import 'server-only'`.
- Only variables prefixed `NEXT_PUBLIC_` reach the browser. Everything else stays server-side.

**State and effects**
- Don't store anything in state that can be calculated from props or other state; compute it during render.
- Keep state as close as possible to where it's used. Lift it only when two components truly need to share it.
- Avoid Effects for data transformation or for responding to user events; put that logic in event handlers or render. Effects are for syncing with something outside React.
- Fetch data on the server in Server Components whenever possible, not in client-side Effects.

**Data and mutations**
- Fetch in the component that needs the data. Fetch independent data in parallel, not as a waterfall.
- Use Server Actions for form submissions and mutations. Treat every Server Action like a public API endpoint: validate input and check authorization inside it.
- After a mutation, invalidate the right cache so the UI shows fresh data.

**Every async UI has three states**
- Handle loading (`loading.tsx` or `<Suspense>` with a fallback), errors (`error.tsx` boundaries and clear messages), and empty results. Never leave a blank screen.

**Discoverability and accessibility**
- Every route exports metadata: a unique title and description at minimum.
- Use semantic HTML, one `<h1>` per page, real `<button>` and `<a>` elements, labels on every input, and alt text on every image.
- Use `next/image`, `next/font`, and `next/link` instead of raw `<img>`, font links, and `<a>` for internal navigation.

**Performance**
- With the React Compiler enabled, don't add `useMemo`, `useCallback`, or `memo` by hand. Without it, add them only when you've measured a real problem.
- Keep client bundles small: less `'use client'`, dynamic imports for heavy client-only widgets.

**TypeScript**
- Use TypeScript in strict mode. Type API responses from the contract in PLAN.md, and share those types instead of retyping them.
- No `any`. If a type is unknown, use `unknown` and narrow it.

## When to read the reference files

| Task touches... | Read |
|---|---|
| Component design, hooks, effects, refs, React 19 features | `references/react.md` |
| Routing, layouts, server/client boundaries, caching, Server Actions | `references/nextjs.md` |
| Fetching from the backend, mocks, forms, client and server state | `references/data-and-state.md` |
| Folder structure for a new project or feature | `references/structure.md` |
| Metadata, sitemap, images, fonts, Core Web Vitals | `references/seo-and-performance.md` |

## Before reporting back

- Run the type check, linter, and tests; fix what fails.
- Confirm loading, error, and empty states exist for every new data-driven view.
- Report what you built, the files you changed, and anything in PLAN.md that seemed wrong or missing. Don't silently work around a contract problem.
