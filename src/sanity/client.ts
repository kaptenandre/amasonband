import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only client for the public Amason dataset.
 * The dataset is public, so no token is required to read published content.
 * `useCdn` is enabled for fast, cached reads; ISR (see `revalidate`) keeps
 * the site fresh after content changes.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_READ_TOKEN, // only used if the dataset is made private
});
