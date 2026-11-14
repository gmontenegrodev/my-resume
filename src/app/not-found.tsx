import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2.5 font-semibold text-on-primary transition-colors duration-150 hover:bg-primary-hover"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
