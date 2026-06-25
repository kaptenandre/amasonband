import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type SanityImage = SanityImageSource & {
  alt?: string;
};

export interface Cta {
  _key: string;
  label: string;
  href?: string;
  style?: "primary" | "secondary" | "ghost";
}

export interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

export interface StreamingLink {
  _key: string;
  platform: string;
  url: string;
}

export interface Contact {
  _key: string;
  role: string;
  name?: string;
  email?: string;
  region?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface SiteSettings {
  title: string;
  tagline?: string;
  description?: string;
  logo?: SanityImage;
  socialLinks?: SocialLink[];
  contacts?: Contact[];
  footerText?: string;
  seo?: Seo;
}

export interface Member {
  _id: string;
  name: string;
  role?: string;
  alsoKnownFor?: string;
  photo?: SanityImage;
  order?: number;
}

export type ReleaseType = "album" | "ep" | "single";

export interface Release {
  _id: string;
  title: string;
  slug?: { current: string };
  releaseType?: ReleaseType;
  releaseDate?: string;
  upcoming?: boolean;
  coverArt?: SanityImage;
  description?: string;
  streamingLinks?: StreamingLink[];
  featured?: boolean;
}

export interface Hero {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  backgroundImage?: SanityImage;
  /** Optional full-bleed background video (mp4/webm URL). Takes priority over the image. */
  backgroundVideoUrl?: string;
  ctas?: Cta[];
}

export interface Quote {
  _key: string;
  text: string;
  source?: string;
}

interface BaseSection {
  _key: string;
  _type: string;
}

export interface AboutSection extends BaseSection {
  _type: "aboutSection";
  heading?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
}

export interface ReleaseSection extends BaseSection {
  _type: "releaseSection";
  heading?: string;
  badge?: string;
  body?: PortableTextBlock[];
  release?: Release;
  ctas?: Cta[];
}

export interface MembersSection extends BaseSection {
  _type: "membersSection";
  heading?: string;
  intro?: string;
}

export interface DiscographySection extends BaseSection {
  _type: "discographySection";
  heading?: string;
  intro?: string;
}

export interface ListenSection extends BaseSection {
  _type: "listenSection";
  heading?: string;
  intro?: string;
  spotifyEmbedUrl?: string;
  links?: StreamingLink[];
}

export interface NewsletterSection extends BaseSection {
  _type: "newsletterSection";
  heading?: string;
  body?: string;
  placeholder?: string;
  buttonLabel?: string;
  actionUrl?: string;
  successMessage?: string;
}

export interface PressSection extends BaseSection {
  _type: "pressSection";
  heading?: string;
  quotes?: Quote[];
}

export interface Product {
  _key: string;
  title: string;
  image?: SanityImage;
  price?: string;
  url?: string;
  soldOut?: boolean;
}

export interface ShopSection extends BaseSection {
  _type: "shopSection";
  heading?: string;
  intro?: string;
  products?: Product[];
  shopUrl?: string;
  ctaLabel?: string;
}

export interface LinkItem {
  _key: string;
  label: string;
  url: string;
  description?: string;
}

export interface LinksSection extends BaseSection {
  _type: "linksSection";
  heading?: string;
  intro?: string;
  links?: LinkItem[];
}

export type Section =
  | AboutSection
  | ReleaseSection
  | MembersSection
  | DiscographySection
  | ListenSection
  | ShopSection
  | LinksSection
  | NewsletterSection
  | PressSection;

export interface LandingPage {
  title: string;
  hero?: Hero;
  sections?: Section[];
  seo?: Seo;
}

export interface PageData {
  page: LandingPage | null;
  settings: SiteSettings | null;
  members: Member[];
  releases: Release[];
}
