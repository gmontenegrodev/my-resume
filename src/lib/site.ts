// Public site URL, without a trailing slash.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://germanresume.com"
).replace(/\/$/, "");
