# Responsive and accessibility reference

Condensed from WCAG 2.2 (level AA) and the web.dev Learn Responsive Design and Learn Accessibility courses. Accessibility is part of design, not a later fix.

## Responsive layout

- Start with the smallest screen (about 360px) and add complexity as space appears.
- Common breakpoints: 640, 768, 1024, 1280px. Add a breakpoint where the layout breaks, not for a specific device. Use the project's existing breakpoints if it has them.
- Use fluid layouts: CSS grid and flexbox with `gap`, `minmax()`, `auto-fit`, and `clamp()` so things adapt between breakpoints too.

```css
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

- Use relative units: `rem` for type and spacing, `%`, `fr`, and viewport units for layout. Avoid fixed heights on containers that hold text.
- Container: a max width (about 1200px), centered, with side padding of 16px on mobile and 24 to 32px above.
- Multi-column sections stack on mobile in reading order. Check that the order still makes sense when stacked.
- Images and media never overflow: `max-width: 100%; height: auto;`.
- Tables scroll inside their own container or change to stacked rows on mobile.
- Test at 320px, 375px, 768px, 1024px, and 1440px, and at 200% browser zoom.

## Touch and pointer

- Targets are at least 44 by 44px with at least 8px between them.
- Don't hide essential information or actions behind hover; touch screens have none.
- Inputs use 16px text or larger so mobile browsers don't zoom in on focus.

## Contrast and color

- Body text 4.5:1, large text 3:1, and interactive element boundaries and icons 3:1 against what's next to them.
- Check text over images and gradients at its worst point.
- Don't rely on color alone: errors get an icon and text, links in text get an underline, charts get labels or patterns.

## Keyboard and focus

- Everything that works with a mouse works with a keyboard: Tab to move, Enter or Space to activate, Escape to close.
- Focus order follows the visual order. Don't use positive `tabindex` values.
- Focus is always visible: a 2px outline with offset, at 3:1 contrast. Style `:focus-visible`; never set `outline: none` without a replacement.
- Dialogs and menus trap focus while open and return it to the trigger on close.
- Add a "Skip to content" link as the first focusable element on pages with a long header.

## Structure and semantics

- One `<h1>` per page, and headings in order without skipping levels. Choose the heading level by structure and the size by style.
- Use landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Use native elements (`<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`) before building custom ones. Add ARIA only when no native element fits.
- Every image has `alt`: describe meaningful images, and use `alt=""` for decorative ones.
- Every form field has a `<label>`; error messages are linked with `aria-describedby`.
- Icon-only buttons have an accessible name (`aria-label`).
- Set the page language (`<html lang="en">`).

## Motion and media

- Respect `prefers-reduced-motion`: remove or shorten non-essential animation.
- Nothing flashes more than three times per second.
- Video and audio don't autoplay with sound; provide captions for speech.

## Content

- Plain language, short sentences, and descriptive link text ("View pricing", not "Click here").
- Don't justify text, and don't put long passages in italics or all caps.
- Text can be resized to 200% without loss of content or function.

## Quick check before reporting

1. Tab through the whole page: every control is reachable, visible when focused, and in a sensible order.
2. Run an automated check (Lighthouse or axe) if available, and fix what it reports. It finds only some issues, so do the manual checks too.
3. View at 375px and at 200% zoom: no horizontal scroll, nothing cut off.
4. Check contrast for text, buttons, and inputs.
