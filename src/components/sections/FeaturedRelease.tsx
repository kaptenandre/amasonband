import { CtaButton } from "../CtaButton";
import { PortableTextBody } from "../PortableTextBody";
import { urlForImage } from "@/sanity/image";
import type { ReleaseSection } from "@/sanity/types";

export function FeaturedRelease({ data }: { data: ReleaseSection }) {
  const release = data.release;
  const cover = release?.coverArt
    ? urlForImage(release.coverArt).width(1000).quality(85).url()
    : null;

  return (
    <section className="section" id="release">
      <div className="container feature">
        <div
          className={cover ? "cover" : "cover cover--placeholder"}
          aria-hidden={cover ? undefined : true}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={
                release?.coverArt?.alt ||
                `${release?.title ?? "Upcoming release"} cover art`
              }
            />
          ) : (
            <span>{release?.title ?? "New Album"}</span>
          )}
        </div>

        <div className="feature__text">
          {data.badge && <span className="badge">{data.badge}</span>}
          {data.heading && (
            <h2 className="section-heading" style={{ marginTop: "1.2rem" }}>
              {data.heading}
            </h2>
          )}
          <PortableTextBody value={data.body} className="feature__body" />
          {data.ctas && data.ctas.length > 0 && (
            <div className="feature__actions">
              {data.ctas.map((cta) => (
                <CtaButton key={cta._key} cta={cta} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
