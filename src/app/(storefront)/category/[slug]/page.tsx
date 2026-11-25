import { notFound } from "next/navigation";
import { CatalogExplorer } from "@/components/storefront/catalog-explorer";
import { COSMETIC_CATEGORIES, COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";

export function generateStaticParams() {
  return COSMETIC_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = COSMETIC_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = COSMETIC_PRODUCTS.filter((p) => p.categorySlug === slug);

  return (
    <CatalogExplorer
      title={category.name}
      subtitle={category.description || undefined}
      initialProducts={items}
      total={items.length}
      categories={COSMETIC_CATEGORIES}
      lockedCategorySlug={slug}
    />
  );
}
