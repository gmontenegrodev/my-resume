# React reference (React 19)

Condensed from react.dev: Thinking in React, Rules of React, Managing State, Escape Hatches, and the React 19 release notes.

## Thinking in React: how to build a UI

1. Break the design into a component hierarchy. One component, one responsibility.
2. Build a static version first with props only, no state.
3. Find the minimal state the UI needs. Ask of each piece of data: does it change over time? Is it passed in by a parent? Can it be computed from something else? If it doesn't change, comes from props, or can be computed, it isn't state.
4. Decide where state lives: the closest common parent of every component that reads it.
5. Add inverse data flow: children update parent state through callbacks passed as props.

## Rules of React

- **Components are pure during render.** Rendering calculates JSX; it doesn't change anything. Side effects belong in event handlers or, as a last resort, Effects.
- **Props and state are immutable snapshots.** To update an object or array in state, create a new one (spread, `map`, `filter`), never mutate in place.
- **Values passed to hooks are immutable** after being passed.
- **Never call components as functions** (`Header()`); render them as JSX (`<Header />`).
- **Hooks at the top level only**, and only from components or custom hooks.

## Structuring state

- Group state that always changes together into one object.
- Avoid contradictions: instead of `isLoading` and `isError` booleans that can both be true, use one `status` value ('idle' | 'loading' | 'error' | 'success').
- Avoid redundant state you can derive during render.
- Avoid duplicating the same object in two state variables; store the id of the selected item instead of a copy of it.
- Avoid deeply nested state; flatten it.
- To reset a component's state, give it a different `key`, rather than syncing with an Effect.

## You might not need an Effect

Effects sync a component with an external system (a browser API, a third-party widget, a subscription). Use something else when:

- **Transforming data for display:** compute it during render.
- **Expensive calculation:** compute during render; memoize only if measured slow and the compiler isn't on.
- **Resetting state when a prop changes:** use a `key`.
- **Responding to a user action:** do it in the event handler. If it happened because the user clicked, it belongs in `onClick`.
- **Notifying a parent about a change:** call the parent's callback in the same event handler.
- **Fetching data:** in Next.js, fetch in a Server Component. On the client, use a data library rather than raw Effects.

If you do write an Effect: include every reactive value it uses in the dependency array, return a cleanup function when it subscribes or starts something, and expect it to run twice in development under Strict Mode.

## Refs

- Use refs for values that don't affect rendering (timer ids, DOM nodes). Don't read or write `ref.current` during render.
- In React 19, `ref` is a regular prop for function components; `forwardRef` isn't needed.

## Custom hooks

- Extract a custom hook when the same stateful logic appears in more than one component.
- Name it `useSomething`. A custom hook shares logic, not state; each caller gets its own state.

## React 19 features to prefer

- **Actions:** async functions passed to `<form action={...}>` or run in a transition. React handles pending state, errors, and form reset.
- **`useActionState`:** holds the result and pending state of a form Action, such as validation errors returned from a Server Action.
- **`useFormStatus`:** lets a child (like a submit button) read whether its parent form is submitting.
- **`useOptimistic`:** shows the expected result immediately while the Action runs, then settles on the real result.
- **`use`:** reads a promise (suspending until it resolves) or a context, and can be called conditionally.
- **Document metadata:** `<title>` and `<meta>` can be rendered inside components, though in Next.js prefer the Metadata API.
- **React Compiler:** automatically memoizes components and values. When it's enabled, remove manual `useMemo`, `useCallback`, and `memo` rather than adding them.

## Composition patterns

- Prefer passing `children` or render props over long lists of configuration props.
- Use Context for values many components need deep in the tree (theme, current user), not as a general state store. Split contexts that change at different rates.
- Lift content up: if a wrapper only passes props through, let the parent render the inner component as `children` instead.
