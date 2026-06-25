import type { Metadata } from "next";
import { siteUrl } from "@/sanity/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amason — Swedish supergroup",
    template: "%s · Amason",
  },
  description:
    "Amason is a Swedish indie-pop supergroup. New album out 2027.",
  applicationName: "Amason",
  authors: [{ name: "Amason" }],
  creator: "Amason",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
