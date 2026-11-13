# Components reference

How common interface pieces should look and behave. Reuse the project's existing components or component library before creating new ones.

## Buttons and links

- Three roles: primary (filled, accent color), secondary (outline or neutral fill), and tertiary (text only). One primary button per view or section.
- Buttons do actions; links go places. Use `<button>` and `<a>` accordingly, and style each role consistently.
- Height of at least 44px, horizontal padding of 16 to 24px, and a label of one to three words that starts with a verb.
- States: hover (slightly darker or lighter), focus (a visible 2px ring with offset), active (pressed), disabled (lower contrast, no pointer), loading (spinner plus the label, and the button keeps its width).
- Destructive actions use the danger color and ask for confirmation.
- Links inside body text are underlined or clearly distinct by more than color alone.

## Forms

- Every input has a visible label above it. Placeholder text is an example, never the label.
- Ask only for what is needed. Each extra field lowers completion.
- One column for most forms. Group related fields and order them the way a person thinks about them.
- Use the right input type and autocomplete attribute (`type="email"`, `autocomplete="name"`) so phones show the right keyboard and browsers can fill it.
- Mark optional fields as "optional" instead of marking required ones with an asterisk, when most fields are required.
- Errors appear next to the field, in text, saying what is wrong and how to fix it ("Enter an email like name@example.com"). Keep what the user typed.
- Validate when the user leaves a field or submits, not on every keystroke.
- After submitting, show a clear success message or move to a confirmation view. Never leave the form looking unchanged.

## Cards and lists

- A card holds one subject: an optional image, a heading, short text, and at most one or two actions.
- Cards in a row share the same structure and height; align their buttons at the bottom.
- If the whole card is clickable, make the whole card the link target and keep one clear hover state.
- Use a grid with consistent gaps: one column on mobile, two on tablet, three or four on desktop.

## Navigation

- Header: logo on the left linking home, three to six links, and the primary action on the right.
- On mobile, collapse links into a menu button with an accessible label. Keep the primary action visible if space allows.
- Show the current page in the navigation.
- A sticky header is thin and doesn't cover content when jumping to anchors (use `scroll-margin-top`).
- Footer: secondary links, contact details, legal links, and social links. Keep it organized in columns.

## Feedback and states

- Loading: skeletons shaped like the content for page areas, spinners only for small inline waits.
- Empty: say why it's empty and offer the next step.
- Error: say what happened in plain words and offer a retry or a way out.
- Success: confirm briefly, then get out of the way (an inline message or a short toast).
- Dialogs are for decisions that must interrupt. Give them a clear title, one primary action, a way to cancel, and return focus on close.

## Icons and images

- Use one icon set with one stroke weight and size scale (16, 20, 24). Don't mix styles.
- Icons that stand alone need an accessible label; icons next to text are decorative.
- Images share a style and aspect ratio within a group. Use `object-fit: cover` inside a fixed-ratio container.
- Don't put text over a busy image without an overlay that guarantees contrast.
- Placeholder images are clearly marked and listed in the report so they get replaced.

## Motion

- Use motion to explain a change: something appears, moves, or responds to input.
- Duration of 150 to 300ms, with ease-out for things entering and ease-in for things leaving.
- Animate `transform` and `opacity`, not layout properties.
- Wrap non-essential animation in `@media (prefers-reduced-motion: no-preference)`.
- No autoplaying carousels, and nothing that moves forever in the visitor's line of sight.
