# Data and state reference

How the frontend talks to the backend and manages state, aligned with React and Next.js docs and with this team's contract-first workflow.

## The API contract comes first

- PLAN.md defines every endpoint, its request, and its response shape. Treat it as fixed.
- Create a typed API client module (e.g. `lib/api/`) with one function per endpoint, typed from the contract. Components call these functions, never raw `fetch` with inline URLs.
- Keep the backend base URL in a server env var. Call the backend from the server (Server Components, Server Actions) so the URL and any tokens never reach the browser.

## Building before the backend is ready

- Write mock data shaped exactly like the contract, in `lib/api/mocks/`.
- Switch between mock and real implementations in one place (an env flag in the API client), never with conditionals scattered in components.
- When the real backend lands, delete the mock path for that endpoint and run the tests against the real shape.
- If the real response differs from the contract, stop and report it. Don't adapt the UI silently.

## Choosing where state lives

| Kind of state | Where it lives |
|---|---|
| Data from the server | Fetched in Server Components; on the client, a data library (TanStack Query or SWR) with caching |
| Shareable UI state (filters, tabs, page number, selected topic) | The URL search params, so it survives refresh and can be linked |
| Local UI state (open menu, input value) | `useState` in the component |
| Complex local transitions | `useReducer` |
| App-wide values read deep in the tree (theme, user) | Context, kept small |
| Large client-only shared state | A small store library only if Context becomes painful |

- Never copy server data into `useState` just to display it.
- Prefer the URL over global state for anything a user might want to share or bookmark.

## Forms

- Use `<form action={serverAction}>` with `useActionState` for results and errors, and `useFormStatus` for the pending button.
- Validate on the server always (the Action) and on the client only for faster feedback.
- Show field-level errors next to the field, keep the user's input on error, and disable the submit button while pending.
- Use `useOptimistic` when the result is predictable, like toggling a like.

## Loading, error, and empty states

- Every data-driven view handles all three. Use skeletons shaped like the real content rather than generic spinners.
- Error messages say what happened and what the user can do; offer a retry when possible.
- Empty states explain why it's empty and what to do next.
