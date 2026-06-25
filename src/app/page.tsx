import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { SectionRenderer } from "@/components/SectionRenderer";
import { JsonLd } from "@/components/JsonLd";
import { getPageData } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { siteUrl } from "@/sanity/env";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await getPageData();
  const seo = page?.seo ?? settings?.seo;

  const title =
    seo?.metaTitle ||
    settings?.title ||
    "Amason — Swedish supergroup · new album 2027";
  const description =
    seo?.metaDescription ||
    settings?.description ||
    "Amason is a Swedish indie-pop supergroup. New album out 2027.";

  const ogImage = seo?.ogImage
    ? urlForImage(seo.ogImage).width(1200).height(630).fit("crop").url()
    : `${siteUrl}/opengraph-image`;

  return {
    title,
    description,
    keywords:
      seo?.keywords && seo.keywords.length > 0
        ? seo.keywords
        : [
            "Amason",
            "Amason band",
            "Swedish indie pop",
            "indie pop supergroup",
            "Amason new album",
            "Amason 2027",
            "Stockholm indie",
          ],
    alternates: { canonical: "/" },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: siteUrl,
      siteName: settings?.title || "Amason",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Home() {
  const { page, settings, members, releases } = await getPageData();

  return (
    <>
      <JsonLd settings={settings} members={members} releases={releases} />
      <Header settings={settings} />
      <main>
        <Hero hero={page?.hero} />
        {page?.sections?.map((section) => (
          <SectionRenderer
            key={section._key}
            section={section}
            members={members}
            releases={releases}
          />
        ))}
      </main>
      <Footer settings={settings} />
    </>
  );
}
