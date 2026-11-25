import type { MetadataRoute } from "next";
import {
  COSMETIC_CATEGORIES,
  COSMETIC_COLLECTIONS,
  COSMETIC_PRODUCTS,
} from "@/data/cosmetics-catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://brijblash.netlify.app";
  const staticPaths = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/shipping-policy",
    "/return-policy",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${baseUrl}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...COSMETIC_CATEGORIES.map((c) => ({
      url: `${baseUrl}/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...COSMETIC_COLLECTIONS.map((col) => ({
      url: `${baseUrl}/collections/${col.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...COSMETIC_PRODUCTS.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
