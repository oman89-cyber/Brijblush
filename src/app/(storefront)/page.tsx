import type { Metadata } from "next";
import { StorefrontHome } from "@/components/storefront/storefront-home";
import {
  COSMETIC_CATEGORIES,
  COSMETIC_COLLECTIONS,
  COSMETIC_HERO_SECTION,
  COSMETIC_PRODUCTS,
  COSMETIC_SETTINGS,
  COSMETIC_STORY_SECTION,
} from "@/data/cosmetics-catalog";

export const metadata: Metadata = {
  title: COSMETIC_SETTINGS.seoDefaults.site_title,
  description: COSMETIC_SETTINGS.seoDefaults.meta_description,
};

export default function HomePage() {
  const featured = COSMETIC_PRODUCTS.filter((p) => p.isFeatured);
  const newest = COSMETIC_PRODUCTS;
  const bestsellers = COSMETIC_PRODUCTS.slice(0, 4);

  return (
    <StorefrontHome
      settings={COSMETIC_SETTINGS}
      categories={COSMETIC_CATEGORIES}
      featuredProducts={featured}
      newArrivals={newest}
      bestsellers={bestsellers}
      collections={COSMETIC_COLLECTIONS}
      heroSection={COSMETIC_HERO_SECTION}
      storySection={COSMETIC_STORY_SECTION}
    />
  );
}
