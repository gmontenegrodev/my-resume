---
name: design
description: Visual and UX design practices for web interfaces, covering layout, spacing, typography, color, components, responsive behavior, and landing page structure and copy. Use this skill for ANY work that changes how a page looks or reads, including building a landing page, adding a page or section, styling components, choosing colors or fonts, writing headlines and button text, or fixing something that "looks off", even if the request doesn't mention design by name.
---

# Web Design Practices

These rules condense widely accepted interface design guidance (WCAG 2.2, the web.dev Learn Design and Learn Accessibility courses, and common design-system conventions) into how to work day to day. Follow the core rules on every task, and read the matching reference file when a task touches that area.

This skill covers how the page looks and reads. Code structure, metadata, and performance belong to the `react-nextjs` skill; follow both.

## Before you write code

1. Read the project's CLAUDE.md and PLAN.md. Look for a "Brand" section: colors, fonts, tone of voice, logo, and reference sites. The brand section is the source of truth; never replace its colors or fonts with your own taste.
2. If there is no brand section, don't stop. Choose a small, neutral system using `references/foundations.md`, state every choice in your report, and recommend adding a brand section (see `references/brand-template.md`).
3. Look at the existing pages and components. Reuse the tokens, components, and spacing already in the project. Consistency beats a nicer one-off.
4. Check which styling system the project uses (Tailwind, CSS Modules, a component library) and work inside it. Don't add a second one.
5. Know the page's single goal before designing it (get a quote, sign up, buy). PLAN.md should say it. If it doesn't, ask in your report and assume the most likely one.

## Core rules (always apply)

**Design tokens**
- Define colors, font sizes, spacing, radii, and shadows once (theme config or CSS variables) and use only those. No hardcoded hex values or arbitrary pixel values in components.
- Name color tokens by role (`primary`, `surface`, `text-muted`, `border`, `danger`), not by appearance (`blue-500`), so a rebrand changes one file.

**Layout and spacing**
- Use one spacing scale based on 4px (4, 8, 12, 16, 24, 32, 48, 64, 96). Every margin, padding, and gap comes from it.
- Space shows relationships: related items sit close, unrelated groups sit far apart. Space inside a group is always smaller than space between groups.
- Constrain content width: about 1200px for page containers, 60 to 75 characters per line for body text.
- Align everything to a shared grid or edge. When something looks off, check alignment and spacing before adding decoration.
- Be generous with white space, especially around the most important element.

**Typography**
- Use at most two font families (one is often enough) and a fixed type scale. Don't invent in-between sizes.
- Body text is at least 16px with a line height near 1.5. Headings use tighter line height (1.1 to 1.3).
- Build hierarchy with size, weight, and color, in that order. One clear focal point per section.
- Left-align body text. Center only short blocks such as a hero headline.

**Color**
- Follow a 60/30/10 balance: a neutral background, a secondary surface or text color, and one accent color reserved for actions.
- The accent color means "clickable or important". Don't use it for decoration.
- Meet WCAG AA contrast: 4.5:1 for body text, 3:1 for large text and for UI elements such as borders of inputs and icons.
- Never use color alone to carry meaning; pair it with text or an icon.

**Components**
- Each view has one primary action, styled as the primary button. Other actions are secondary or text links.
- Every interactive element has visible default, hover, focus, active, and disabled states. Never remove the focus outline without replacing it.
- Touch targets are at least 44 by 44 pixels.
- The same thing looks the same everywhere: one button style per role, one card style, one input style.

**Responsive**
- Design mobile first: start at about 360px wide and add breakpoints as the layout needs them.
- Nothing scrolls horizontally, and text never needs zooming on a phone.
- Stack columns on small screens, and keep the primary action visible without hunting for it.

**Copy**
- Headlines state the benefit to the visitor, in plain words. Avoid slogans that could describe any company.
- Button text says what happens next ("Get a quote", "Start free trial"), never "Submit" or "Click here".
- Short sentences, active voice, and the visitor's vocabulary. Never ship lorem ipsum; write realistic draft copy and flag it for review.

**Images and motion**
- Use real, relevant images with a consistent style. Keep every image's aspect ratio; never stretch.
- Motion is short (150 to 300ms), purposeful, and respects `prefers-reduced-motion`.

## When to read the reference files

| Task touches... | Read |
|---|---|
| Setting up tokens, spacing, type scale, or a color palette | `references/foundations.md` |
| Buttons, forms, cards, navigation, states, icons, motion | `references/components.md` |
| A landing page or marketing section, headlines, calls to action | `references/landing-page.md` |
| Breakpoints, mobile layout, contrast, keyboard and screen reader use | `references/responsive-and-accessibility.md` |
| A project with no brand section, or starting a new project | `references/brand-template.md` |

## Before reporting back

- View the page at mobile (about 375px), tablet (about 768px), and desktop (about 1280px) widths, if a browser or screenshot tool is available. If not, say the visual check was not done.
- Check contrast for text and buttons, tab through the page with the keyboard, and confirm every interactive element shows a focus state.
- Confirm no hardcoded colors or off-scale spacing values were added.
- Report what you built, the files changed, every design decision you made that the brand section or PLAN.md did not specify (colors, fonts, copy, section order), and any draft copy or placeholder images the user must review or replace.
