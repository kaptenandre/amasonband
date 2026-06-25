import { Arrow } from "../Arrow";
import type { LinksSection } from "@/sanity/types";

export function Links({ data }: { data: LinksSection }) {
  const links = data.links ?? [];
  if (links.length === 0) return null;

  return (
    <section className="section" id="links">
      <div className="container">
        <span className="eyebrow">Links</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        {data.intro && <p className="section-intro">{data.intro}</p>}

        <ul className="links">
          {links.map((l) => (
            <li key={l._key}>
              <a
                className="links__row"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="links__text">
                  <span className="links__label">{l.label}</span>
                  {l.description && (
                    <span className="links__desc">{l.description}</span>
                  )}
                </span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
