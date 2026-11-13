# SEO and performance reference

Condensed from the Next.js Metadata, Image, Font, and optimization docs. Peter (SEO) reviews against these, so build to them from the start.

## Metadata

- Export a static `metadata` object from layouts and pages, or `generateMetadata()` when it depends on data (like a topic name).
- Set defaults in the root layout with a title template, e.g. `{ default: 'App', template: '%s | App' }`, so each page only sets its own title.
- Every public page needs a unique title and description, plus Open Graph and Twitter fields for sharing.
- Set `metadataBase` in the root layout so relative image URLs resolve.
- Mark private or duplicate pages `robots: { index: false }`.

## Crawlable site

- Add `app/sitemap.ts` and `app/robots.ts` for public apps; generate sitemap entries from data for dynamic routes.
- Use readable URLs (`/quiz/react`, not `/quiz?id=42`) for content that should rank.
- Content meant to be found by search engines must render on the server. Don't load important text only in a client-side effect.
- Add JSON-LD structured data in a `<script type="application/ld+json">` where it fits (articles, FAQs, products).
- Provide `opengraph-image` files or generate them so shared links look right.

## Images and fonts

- Use `next/image` with `width` and `height` (or `fill` in a sized container) to prevent layout shift. Add `priority` only to the main above-the-fold image.
- Every meaningful image has descriptive alt text; decorative images use `alt=""`.
- Load fonts with `next/font` so they're self-hosted and don't shift layout.

## Core Web Vitals

- **LCP (load):** render the main content on the server, prioritize the hero image, avoid blocking client JavaScript.
- **CLS (stability):** reserve space for images, ads, and late-loading content; use skeletons with the real dimensions.
- **INP (responsiveness):** keep client components small, move heavy work off the main thread, and use transitions for non-urgent updates.

## Bundle size

- Keep `'use client'` minimal, since everything under it ships to the browser.
- Lazy-load heavy client-only components with `next/dynamic`.
- Import only what you use from large libraries.
- Use `next/script` with the right strategy for third-party scripts, and add them only when needed.
