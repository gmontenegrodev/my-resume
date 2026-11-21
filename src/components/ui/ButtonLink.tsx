import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryOnDark";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  download?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover",
  secondary:
    "border border-border bg-background text-text hover:border-muted hover:bg-surface",
  secondaryOnDark:
    "border border-on-dark/40 text-on-dark hover:border-on-dark hover:bg-on-dark/10",
};

// A link styled as a button. Uses <a> because every target here is an
// anchor on the page, a mailto: link, a file, or an external site.
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-base font-semibold transition-colors duration-150 ${styles[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
