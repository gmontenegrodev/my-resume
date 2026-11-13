# Foundations reference

How to set up the base of a visual system: tokens, spacing, type, and color. If the project already has these, use them and don't redefine them.

## Design tokens

- Tokens are named values defined in one place. Components use the names, never raw values.
- Where they live depends on the styling system: the Tailwind theme (the `@theme` block in the global CSS for Tailwind 4, or `tailwind.config` for older versions), or CSS custom properties in a global stylesheet. Check the project's version before choosing.
- Minimum set: colors, font families, font sizes, spacing, border radius, shadows, and breakpoints.

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f6f7f9;
  --color-text: #111827;
  --color-text-muted: #5b6472;
  --color-border: #d9dde3;
  --color-primary: #1d4ed8;
  --color-primary-hover: #1e40af;
  --color-on-primary: #ffffff;
  --color-danger: #b91c1c;
  --color-success: #15803d;
  --radius: 8px;
}
```

These values are an example of the shape, not a default palette. Take real values from the brand section.

## Spacing

- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (px). Pick from it; don't use values in between.
- Typical uses: 4 to 8 between an icon and its label, 12 to 16 inside buttons and inputs, 16 to 24 inside cards, 24 to 32 between elements in a section, 64 to 128 between page sections.
- Vertical space between page sections is the same throughout a page. Reduce it on mobile (for example 96 on desktop, 64 on mobile).
- Use `gap` on flex and grid containers instead of margins on children.

## Typography

- Type scale (px): 12, 14, 16, 18, 20, 24, 30, 36, 48, 60. Body is 16 or 18.
- Suggested roles: page headline 48 to 60 on desktop and 32 to 36 on mobile, section heading 30 to 36, card heading 20 to 24, body 16 to 18, caption 14. Use 12 only for legal or meta text.
- Use fluid sizes for large headings so they shrink smoothly: `font-size: clamp(2rem, 5vw, 3.75rem)`.
- Weights: regular (400) for body, medium or semibold (500 to 600) for labels and buttons, bold (700) for headings. Avoid more than three weights.
- Line height: about 1.5 for body, 1.1 to 1.3 for headings. Line length: 60 to 75 characters (`max-width: 65ch`).
- Font choice with no brand guidance: one clean sans-serif for everything, loaded through the framework's font tool. Add a second family only for headings and only if it gives the brand character.
- Don't use all caps for more than a short label, and add slight letter spacing when you do.

## Color

- Start from the brand's primary color. Build the rest around it:
  - Neutrals: a background, a surface, a border, a main text color, and a muted text color. Slightly tinted neutrals look better than pure gray.
  - Primary: the accent for buttons and links, plus a darker hover shade and a text color that sits on top of it.
  - Feedback: danger, success, and warning. Use them only for their meaning.
- Avoid pure black text on pure white; a very dark gray is easier to read.
- Check every text and background pair for contrast (4.5:1 body, 3:1 large text of 24px or 18.66px bold and above).
- Dark mode is a separate set of token values, not inverted colors. Add it only when the plan asks for it.
- Gradients and shadows are subtle and consistent: one shadow style for raised elements, one for overlays.

## Shape and depth

- One border radius scale (for example 4, 8, 16, full). Buttons, inputs, and cards use the same radius family.
- Use either borders or shadows to separate a card from its background, rarely both.
- Depth has meaning: flat for page content, a small shadow for cards, a larger one for menus and dialogs.
