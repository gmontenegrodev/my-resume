import { resume } from "@/content/resume";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="text-base font-bold tracking-tight">
          {resume.name}
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href} className="hidden md:block">
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-semibold text-on-primary transition-colors duration-150 hover:bg-primary-hover"
              >
                Contact me
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
