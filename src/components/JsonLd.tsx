import { siteUrl } from "@/sanity/env";
import type { Member, Release, SiteSettings } from "@/sanity/types";

/**
 * Structured data (schema.org MusicGroup) so Google can render a rich
 * knowledge panel: band members, albums, and official profiles.
 */
export function JsonLd({
  settings,
  members,
  releases,
}: {
  settings: SiteSettings | null;
  members: Member[];
  releases: Release[];
}) {
  const name = settings?.title ?? "Amason";

  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name,
    description: settings?.description,
    url: siteUrl,
    genre: ["Indie pop", "Indie rock", "Psychedelic pop"],
    foundingLocation: {
      "@type": "Place",
      name: "Stockholm, Sweden",
    },
    member: members.map((m) => ({
      "@type": "Person",
      name: m.name,
      ...(m.role ? { roleName: m.role } : {}),
    })),
    album: releases
      .filter((r) => !r.upcoming)
      .map((r) => ({
        "@type": "MusicAlbum",
        name: r.title,
        ...(r.releaseDate ? { datePublished: r.releaseDate } : {}),
      })),
    sameAs: (settings?.socialLinks ?? []).map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
