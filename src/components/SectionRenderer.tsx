import { About } from "./sections/About";
import { FeaturedRelease } from "./sections/FeaturedRelease";
import { Members } from "./sections/Members";
import { Discography } from "./sections/Discography";
import { Listen } from "./sections/Listen";
import { Newsletter } from "./sections/Newsletter";
import { Press } from "./sections/Press";
import type { Member, Release, Section } from "@/sanity/types";

export function SectionRenderer({
  section,
  members,
  releases,
}: {
  section: Section;
  members: Member[];
  releases: Release[];
}) {
  switch (section._type) {
    case "aboutSection":
      return <About data={section} />;
    case "releaseSection":
      return <FeaturedRelease data={section} />;
    case "membersSection":
      return <Members data={section} members={members} />;
    case "discographySection":
      return <Discography data={section} releases={releases} />;
    case "listenSection":
      return <Listen data={section} />;
    case "newsletterSection":
      return <Newsletter data={section} />;
    case "pressSection":
      return <Press data={section} />;
    default:
      return null;
  }
}
