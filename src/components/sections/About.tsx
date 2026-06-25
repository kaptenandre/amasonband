import { PortableTextBody } from "../PortableTextBody";
import { urlForImage } from "@/sanity/image";
import type { AboutSection } from "@/sanity/types";

export function About({ data }: { data: AboutSection }) {
  const img = data.image
    ? urlForImage(data.image).width(1200).quality(82).url()
    : null;

  return (
    <section className="section" id="about">
      <div className="container about">
        <div>
          <span className="eyebrow">About</span>
          {data.heading && (
            <h2 className="section-heading" style={{ marginBottom: "1.75rem" }}>
              {data.heading}
            </h2>
          )}
          <PortableTextBody value={data.body} className="about__body" />
        </div>
        {img && (
          <div className="about__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={data.image?.alt || "Amason"} loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
}
