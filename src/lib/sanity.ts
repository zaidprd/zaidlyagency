import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  // Pake PUBLIC_ agar terbaca di browser dan server
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "0ukg7bxy",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-28",
  // Static build harus selalu mengambil revisi terbaru dari dataset.
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}