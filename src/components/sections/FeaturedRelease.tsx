import { CtaButton } from "../CtaButton";
import { PortableTextBody } from "../PortableTextBody";
import { urlForImage } from "@/sanity/image";
import type { ReleaseSection } from "@/sanity/types";

export function FeaturedRelease({ data }: { data: ReleaseSection }) {
  const release = data.release;
  const cover = release?.coverArt
    ? urlForImage(release.coverArt).width(1600).quality(85).url()
    : null;

  return (
    <section className="section-bleed split" id="release">
      <div className="split__media">
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
          <div className="split__placeholder" aria-hidden="true">
            <span>{release?.title ?? "New Album"}</span>
          </div>
        )}
      </div>

      <div className="split__text">
        {data.badge && <span className="badge">{data.badge}</span>}
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        <PortableTextBody value={data.body} className="split__body" />
        {data.ctas && data.ctas.length > 0 && (
          <div className="split__actions">
            {data.ctas.map((cta) => (
              <CtaButton key={cta._key} cta={cta} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
