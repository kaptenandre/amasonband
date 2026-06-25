import { platformLabel } from "../platforms";
import { Arrow } from "../Arrow";
import type { ListenSection } from "@/sanity/types";

function normalizeEmbed(url: string): string {
  // Accept either a normal Spotify URL or an /embed/ URL.
  if (url.includes("/embed/")) return url;
  return url.replace("open.spotify.com/", "open.spotify.com/embed/");
}

export function Listen({ data }: { data: ListenSection }) {
  const embed = data.spotifyEmbedUrl
    ? normalizeEmbed(data.spotifyEmbedUrl)
    : null;
  const links = data.links ?? [];

  return (
    <section className="section" id="listen">
      <div className="container">
        <span className="eyebrow">Listen</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        {data.intro && <p className="section-intro">{data.intro}</p>}

        {embed && (
          <div className="listen__embed">
            <iframe
              src={embed}
              title="Amason on Spotify"
              height={400}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        )}

        {links.length > 0 && (
          <div className="listen__links">
            {links.map((l) => (
              <a
                className="chip"
                key={l._key}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platformLabel(l.platform)}
                <Arrow />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
