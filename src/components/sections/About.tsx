import { PortableTextBody } from "../PortableTextBody";
import { urlForImage } from "@/sanity/image";
import type { AboutSection } from "@/sanity/types";

export function About({ data }: { data: AboutSection }) {
  const img = data.image
    ? urlForImage(data.image).width(1600).quality(82).url()
    : null;

  return (
    <section className="section-bleed split split--reverse" id="about">
      <div className="split__media">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={data.image?.alt || "Amason"} loading="lazy" />
        ) : (
          <div className="split__placeholder" aria-hidden="true">
            <span>Amason</span>
          </div>
        )}
      </div>

      <div className="split__text">
        <span className="eyebrow">About</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        <PortableTextBody value={data.body} className="split__body" />
      </div>
    </section>
  );
}
