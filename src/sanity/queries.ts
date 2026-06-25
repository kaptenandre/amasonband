import { client } from "./client";
import type {
  LandingPage,
  Member,
  PageData,
  Release,
  SiteSettings,
} from "./types";

/**
 * Identity template tag — purely for GROQ syntax highlighting in editors.
 * It concatenates the query exactly as written.
 */
const groq = (strings: TemplateStringsArray, ...values: unknown[]): string =>
  strings.reduce(
    (acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ""),
    "",
  );

const imageFields = `
  ...,
  "alt": alt
`;

const ctaFields = `_key, label, href, style`;
const streamingFields = `_key, platform, url`;

const landingPageQuery = groq`
*[_type == "landingPage"][0]{
  title,
  hero{
    eyebrow,
    heading,
    subheading,
    backgroundImage{ ${imageFields} },
    ctas[]{ ${ctaFields} }
  },
  sections[]{
    _key,
    _type,
    _type == "aboutSection" => {
      heading,
      body,
      image{ ${imageFields} }
    },
    _type == "releaseSection" => {
      heading,
      badge,
      body,
      ctas[]{ ${ctaFields} },
      release->{
        _id, title, releaseType, releaseDate, upcoming, description,
        coverArt{ ${imageFields} },
        streamingLinks[]{ ${streamingFields} }
      }
    },
    _type == "membersSection" => { heading, intro },
    _type == "discographySection" => { heading, intro },
    _type == "listenSection" => {
      heading, intro, spotifyEmbedUrl,
      links[]{ ${streamingFields} }
    },
    _type == "newsletterSection" => {
      heading, body, placeholder, buttonLabel, actionUrl, successMessage
    },
    _type == "pressSection" => {
      heading,
      quotes[]{ _key, text, source }
    }
  },
  seo{
    metaTitle, metaDescription, keywords, noIndex,
    ogImage{ ${imageFields} }
  }
}`;

const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  title,
  tagline,
  description,
  logo{ ${imageFields} },
  socialLinks[]{ _key, platform, url },
  contacts[]{ _key, role, name, email, region },
  footerText,
  seo{
    metaTitle, metaDescription, keywords, noIndex,
    ogImage{ ${imageFields} }
  }
}`;

const membersQuery = groq`
*[_type == "member"] | order(order asc, name asc){
  _id, name, role, alsoKnownFor,
  photo{ ${imageFields} }
}`;

const releasesQuery = groq`
*[_type == "release"] | order(upcoming desc, releaseDate desc){
  _id, title, releaseType, releaseDate, upcoming, description, featured,
  "slug": slug.current,
  coverArt{ ${imageFields} },
  streamingLinks[]{ ${streamingFields} }
}`;

/** Cache reads for one hour; content edits go live within that window. */
const REVALIDATE = 3600;

/**
 * Fetch a query, but never let a transient CMS/network error crash the
 * render or the build. On failure we log and fall back, so the site stays
 * up and self-heals on the next revalidation.
 */
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(
      query,
      {},
      { next: { revalidate: REVALIDATE } },
    );
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallback:", error);
    return fallback;
  }
}

export async function getPageData(): Promise<PageData> {
  const [page, settings, members, releases] = await Promise.all([
    safeFetch<LandingPage | null>(landingPageQuery, null),
    safeFetch<SiteSettings | null>(siteSettingsQuery, null),
    safeFetch<Member[]>(membersQuery, []),
    safeFetch<Release[]>(releasesQuery, []),
  ]);

  return {
    page,
    settings,
    members: members ?? [],
    releases: releases ?? [],
  };
}
