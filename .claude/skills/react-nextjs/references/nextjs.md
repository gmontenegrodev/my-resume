# Next.js reference (App Router, Next.js 16)

Condensed from the nextjs.org App Router docs. If the project has bundled, version-matched docs or an AGENTS.md, those win over this file.

## Routing files

Inside `app/`, a folder is a route segment and these files give it behavior:

| File | Purpose |
|---|---|
| `page.tsx` | The route's UI; makes the segment publicly reachable |
| `layout.tsx` | Shared UI that wraps child routes and keeps state across navigation |
| `loading.tsx` | Instant loading UI, wraps the page in Suspense |
| `error.tsx` | Error boundary for the segment (must be a Client Component) |
| `not-found.tsx` | UI shown when `notFound()` is called |
| `route.ts` | An HTTP endpoint (GET, POST...) instead of a page |

- Dynamic segments: `[id]`, catch-all: `[...slug]`.
- Route groups `(marketing)` organize files without changing the URL.
- Private folders `_components` are never routable; use them to colocate files.
- Request-time APIs are async: `await params`, `await searchParams`, `await cookies()`, `await headers()`.
- In Next.js 16, `middleware.ts` became `proxy.ts`. Keep it thin; don't put auth logic only there. Check authorization where data is accessed.

## Server and Client Components

- Server Components (the default) can be `async`, fetch data directly, read secrets, and send no JavaScript to the browser.
- Client Components (`'use client'`) are needed for state, effects, event handlers, and browser APIs.
- The `'use client'` directive marks a boundary: everything imported from that file becomes client code. Put it on small leaves.
- Props passed from Server to Client Components must be serializable (no functions, except Server Actions).
- Third-party components that use hooks but lack `'use client'` need a thin client wrapper file.

## Data fetching

- Fetch in Server Components with `async`/`await`, close to where data is used.
- Start independent requests together with `Promise.all`, not one after another.
- Wrap slow parts in `<Suspense>` so the rest of the page streams immediately.
- Use React's `cache()` to dedupe the same request across components in one render.
- Put data access in a dedicated server-only module (a data access layer) that also checks authorization.

## Caching (Cache Components, Next.js 16)

- In Next.js 16 caching is explicit: data is dynamic by default and you opt in to caching with the `'use cache'` directive on a function, component, or page (enabled with `cacheComponents` in next.config).
- Control lifetime with `cacheLife()` and label entries with `cacheTag()`.
- After a mutation, invalidate with `updateTag()` (read-your-own-writes inside a Server Action) or `revalidateTag()` / `revalidatePath()`.
- Never cache per-user data in a shared cache. Personalized data stays dynamic.
- Older projects may use `fetch(url, { next: { revalidate } })` and segment config; follow what the project already uses unless asked to migrate.

## Server Actions

- Define with `'use server'` in a separate `actions.ts` file, or inline in a Server Component.
- Use them for mutations and form submissions; pair with `useActionState` for validation errors and pending state.
- Every Action is a public endpoint: validate input with a schema (e.g. Zod), check the session and permissions inside the Action, and return only what the UI needs.
- After changing data, invalidate the cache and, if needed, `redirect()`.
- Don't use Server Actions for data fetching; fetch in Server Components.

## Route Handlers vs Server Actions

- Use Server Actions for mutations triggered by your own UI.
- Use Route Handlers (`route.ts`) for endpoints other clients call: webhooks, public APIs, mobile apps.
- If a separate backend (like Pedro's API) exists, call it from Server Components and Server Actions, not from a duplicate Route Handler.

## Environment and config

- Secrets and server env vars stay server-side; only `NEXT_PUBLIC_` vars are bundled for the browser.
- Validate required env vars at startup so a missing one fails loudly.
- Turbopack is the default bundler in Next.js 16. Run ESLint through the ESLint CLI, not `next lint`.
