import { urlForImage } from "@/sanity/image";
import type { DiscographySection, Release } from "@/sanity/types";

function year(date?: string): string | null {
  if (!date) return null;
  const y = date.slice(0, 4);
  return /^\d{4}$/.test(y) ? y : null;
}

export function Discography({
  data,
  releases,
}: {
  data: DiscographySection;
  releases: Release[];
}) {
  if (releases.length === 0) return null;

  return (
    <section className="section" id="music">
      <div className="container">
        <span className="eyebrow">Discography</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        {data.intro && <p className="section-intro">{data.intro}</p>}

        <div className="disco">
          {releases.map((r) => {
            const cover = r.coverArt
              ? urlForImage(r.coverArt).width(600).height(600).quality(82).url()
              : null;
            const link = r.streamingLinks?.[0]?.url;
            const y = r.upcoming ? "2027" : year(r.releaseDate);

            const inner = (
              <>
                <div
                  className={
                    r.upcoming
                      ? "disco__cover disco__cover--upcoming"
                      : "disco__cover"
                  }
                >
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt={r.coverArt?.alt || `${r.title} cover art`}
                      loading="lazy"
                    />
                  ) : (
                    <span>{r.title}</span>
                  )}
                </div>
                <div>
                  <div className="disco__meta">
                    <span className="disco__title">{r.title}</span>
                    {y && <span className="disco__year">{y}</span>}
                  </div>
                  {r.upcoming && <span className="tag">Upcoming</span>}
                  {r.description && (
                    <p className="disco__desc">{r.description}</p>
                  )}
                </div>
              </>
            );

            return (
              <div className="disco__item" key={r._id}>
                {link && !r.upcoming ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Listen to ${r.title}`}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
