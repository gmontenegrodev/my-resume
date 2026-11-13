import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { resume } from "@/content/resume";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// next/font downloads the font at build time and serves it from our own
// domain, so there is no request to Google when a visitor opens the page.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${resume.name} | ${resume.title}`;
const description = `${resume.name}, ${resume.title.toLowerCase()} with 10+ years building production software, cloud platforms and AI-assisted engineering workflows. Founder of BallGameAI, a baseball decision-intelligence platform.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: resume.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: resume.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
