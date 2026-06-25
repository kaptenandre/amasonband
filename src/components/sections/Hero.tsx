import { CtaButton } from "../CtaButton";
import { urlForImage } from "@/sanity/image";
import type { Hero as HeroType } from "@/sanity/types";

export function Hero({ hero }: { hero?: HeroType }) {
  if (!hero?.heading) return null;

  const bg = hero.backgroundImage
    ? urlForImage(hero.backgroundImage).width(2400).quality(82).url()
    : null;
  const video = hero.backgroundVideoUrl ?? null;

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        {video ? (
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster={bg ?? undefined}
          >
            <source src={video} />
          </video>
        ) : bg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bg} alt="" />
        ) : (
          <div className="hero__gradient" />
        )}
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner">
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

      <span className="scroll-cue" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
