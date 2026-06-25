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
  const bandId = `${siteUrl}/#band`;

  const band = {
    "@type": "MusicGroup",
    "@id": bandId,
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
    album: releases.map((r) => ({
      "@type": "MusicAlbum",
      name: r.title,
      byArtist: { "@id": bandId },
      ...(r.releaseType ? { albumReleaseType: r.releaseType } : {}),
      ...(r.releaseDate ? { datePublished: r.releaseDate } : {}),
    })),
    sameAs: (settings?.socialLinks ?? []).map((s) => s.url),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name,
    description: settings?.description,
    inLanguage: "en",
    publisher: { "@id": bandId },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [band, website],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
