import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/storefront/catalog-explorer";
import { COSMETIC_CATEGORIES, COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";

export const metadata: Metadata = {
  title: "Shop Cosmetics",
  description: "Explore Brijblash botanical serums, rose mists, kajal, and lip tints.",
};

export default function ShopPage() {
  return (
    <CatalogExplorer
      title="Shop Botanical Cosmetics"
      subtitle="Small-batch skincare, kohl, and natural colour crafted in Braj heritage."
      initialProducts={COSMETIC_PRODUCTS}
      total={COSMETIC_PRODUCTS.length}
      categories={COSMETIC_CATEGORIES}
    />
  );
}
