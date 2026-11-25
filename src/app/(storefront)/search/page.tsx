import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/storefront/catalog-explorer";
import { COSMETIC_CATEGORIES, COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";

export const metadata: Metadata = {
  title: "Search Catalogue",
};

export default function SearchPage() {
  return (
    <CatalogExplorer
      title="Search Brijblash Cosmetics"
      subtitle="Search across saffron elixirs, rose mists, kajal, lip tints, and botanical rituals."
      initialProducts={COSMETIC_PRODUCTS}
      total={COSMETIC_PRODUCTS.length}
      categories={COSMETIC_CATEGORIES}
    />
  );
}
