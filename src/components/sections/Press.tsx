import type { PressSection } from "@/sanity/types";

export function Press({ data }: { data: PressSection }) {
  const quotes = data.quotes ?? [];
  if (quotes.length === 0) return null;

  return (
    <section className="section" id="press">
      <div className="container">
        <span className="eyebrow">Press</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        <div className="disco" style={{ marginTop: "2.5rem" }}>
          {quotes.map((q) => (
            <figure key={q._key} style={{ margin: 0 }}>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  lineHeight: 1.5,
                  color: "var(--ink)",
                }}
              >
                “{q.text}”
              </blockquote>
              {q.source && (
                <figcaption
                  style={{
                    marginTop: "0.75rem",
                    color: "var(--ink-faint)",
                    fontSize: "0.9rem",
                  }}
                >
                  — {q.source}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
