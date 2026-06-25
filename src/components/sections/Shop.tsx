import { urlForImage } from "@/sanity/image";
import { Arrow } from "../Arrow";
import type { ShopSection } from "@/sanity/types";

export function Shop({ data }: { data: ShopSection }) {
  const products = data.products ?? [];

  // Render nothing if the editor hasn't added products or a shop link yet.
  if (products.length === 0 && !data.shopUrl) return null;

  return (
    <section className="section" id="shop">
      <div className="container">
        <span className="eyebrow">Shop</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        {data.intro && <p className="section-intro">{data.intro}</p>}

        {products.length > 0 && (
          <div className="shop">
            {products.map((p) => {
              const img = p.image
                ? urlForImage(p.image).width(600).height(600).quality(82).url()
                : null;

              const inner = (
                <>
                  <div className="shop__media">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={p.image?.alt || p.title}
                        loading="lazy"
                      />
                    ) : (
                      <span>{p.title}</span>
                    )}
                    {p.soldOut && <span className="shop__soldout">Sold out</span>}
                  </div>
                  <div className="shop__meta">
                    <span className="shop__title">{p.title}</span>
                    {p.price && <span className="shop__price">{p.price}</span>}
                  </div>
                </>
              );

              return (
                <div className="shop__item" key={p._key}>
                  {p.url && !p.soldOut ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy ${p.title}`}
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
        )}

        {data.shopUrl && (
          <div className="shop__cta">
            <a
              className="btn btn-secondary"
              href={data.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.ctaLabel || "Visit the shop"}
              <Arrow />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
