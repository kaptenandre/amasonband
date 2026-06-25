import type { SiteSettings } from "@/sanity/types";

export function Header({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.title ?? "Amason";
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label={`${name} — home`}>
          {name}
        </a>
        <nav className="nav" aria-label="Primary">
          <div className="nav__links">
            <a href="#about">About</a>
            <a href="#music">Music</a>
            <a href="#listen">Listen</a>
          </div>
          <a className="btn btn-secondary" href="#newsletter">
            Get notified
          </a>
        </nav>
      </div>
    </header>
  );
}
