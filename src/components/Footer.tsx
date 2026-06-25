import { platformLabel } from "./platforms";
import type { SiteSettings } from "@/sanity/types";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.title ?? "Amason";
  const year = new Date().getFullYear();
  const socials = settings?.socialLinks ?? [];
  const contacts = (settings?.contacts ?? []).filter((c) => c.email);

  return (
    <footer className="site-footer">
      <div>
        <div className="footer-grid">
          <div className="footer__brand">
            <div className="wordmark-sm">{name}</div>
            {settings?.tagline && <p className="footer__tag">{settings.tagline}</p>}
          </div>

          {socials.length > 0 && (
            <div className="footer-col">
              <h4>Follow</h4>
              <ul>
                {socials.map((s) => (
                  <li key={s._key}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {platformLabel(s.platform)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {contacts.length > 0 && (
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                {contacts.map((c) => (
                  <li key={c._key}>
                    <span className="footer__contact-role">{c.role}</span>
                    <a href={`mailto:${c.email}`}>{c.name || c.email}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {settings?.footerText || name}
          </span>
          <span>New album · 2027</span>
        </div>
      </div>
    </footer>
  );
}
