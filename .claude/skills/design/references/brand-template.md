# Brand template reference

The design skill holds rules that are the same for every project. The brand is different for every project, so it lives in the project's CLAUDE.md, in a "Brand" section. This file is the template for that section.

## When to use this

- Starting a new project: copy the template below into CLAUDE.md and fill it in with the user.
- A project has no brand section: don't block the work. Make neutral choices from `foundations.md`, list each one in your report, and recommend adding this section so the next task doesn't guess again.
- A project has a partial brand section: use what's there and fill only the gaps, stating what you added.

## Template

Copy from the next line into CLAUDE.md:

```markdown
## Brand

**Business:** [what the company does, in one sentence]
**Audience:** [who the site is for]
**Page goal:** [the single action a visitor should take]

### Colors
- Primary (buttons, links): #______
- Background: #______
- Surface (cards, alternate sections): #______
- Text: #______
- Muted text: #______
- Border: #______
- Accent or secondary (optional): #______

### Typography
- Heading font: [name, source]
- Body font: [name, source]

### Style
- Overall feel: [three adjectives, e.g. clean, bold, friendly]
- Corners: [sharp / slightly rounded / very rounded]
- Imagery: [photos of real work / illustrations / product screenshots]
- Reference sites we like: [URLs and what we like about each]
- Things to avoid: [e.g. stock photos of handshakes, gradients, dark mode]

### Voice
- Tone: [e.g. direct and practical, no jargon]
- We say: [preferred words and phrases]
- We don't say: [words to avoid]

### Assets
- Logo: [path in the repo]
- Favicon: [path]
- Photos: [path or "to be provided"]
```

## Rules for using the brand section

- Map the brand colors to role tokens (`primary`, `surface`, `text`) once, in the theme. Components never use the hex values directly.
- If a brand color fails contrast for its role (for example, a light yellow as button text on white), keep the brand color for large or decorative use, choose an accessible shade for text and controls, and report the change.
- Derive missing shades (hover, borders, muted text) from the given colors instead of introducing new hues.
- If only a logo is provided, sample the primary color from it and build neutrals around it; say so in the report.
- Reference sites are for the feel (spacing, density, tone). Never copy their layout, text, or images.
- When the user's request conflicts with the brand section, follow the request for that task and point out the conflict in the report.
