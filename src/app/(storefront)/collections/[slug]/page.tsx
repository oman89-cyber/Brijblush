import { notFound } from "next/navigation";
import { CatalogExplorer } from "@/components/storefront/catalog-explorer";
import {
  COSMETIC_CATEGORIES,
  COSMETIC_COLLECTIONS,
  getProductsForCollection,
} from "@/data/cosmetics-catalog";

export function generateStaticParams() {
  return COSMETIC_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = COSMETIC_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const items = getProductsForCollection(slug);

  return (
    <CatalogExplorer
      title={collection.title}
      subtitle={collection.description || undefined}
      initialProducts={items}
      total={items.length}
      categories={COSMETIC_CATEGORIES}
      lockedCollectionSlug={slug}
    />
  );
}
