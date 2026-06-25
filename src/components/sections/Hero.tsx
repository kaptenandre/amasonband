import { CtaButton } from "../CtaButton";
import { urlForImage } from "@/sanity/image";
import type { Hero as HeroType } from "@/sanity/types";

export function Hero({ hero }: { hero?: HeroType }) {
  if (!hero?.heading) return null;

  const bg = hero.backgroundImage
    ? urlForImage(hero.backgroundImage).width(2000).quality(80).url()
    : null;

  return (
    <section className="hero" id="top">
      {bg ? (
        <div className="hero__bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg} alt={hero.backgroundImage?.alt || ""} />
        </div>
      ) : null}
      <div className="aurora" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="container">
        <div className="hero__content">
          {hero.eyebrow && (
            <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>
          )}
          <h1 className="wordmark">{hero.heading}</h1>
          {hero.subheading && <p className="hero__sub">{hero.subheading}</p>}
          {hero.ctas && hero.ctas.length > 0 && (
            <div className="hero__actions">
              {hero.ctas.map((cta) => (
                <CtaButton key={cta._key} cta={cta} />
              ))}
            </div>
          )}
        </div>
      </div>

      <span className="scroll-cue" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
