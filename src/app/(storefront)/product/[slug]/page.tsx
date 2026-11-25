import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/storefront/product-detail-client";
import { ProductCard } from "@/components/storefront/product-card";
import { COSMETIC_PRODUCTS, COSMETIC_SETTINGS } from "@/data/cosmetics-catalog";

export function generateStaticParams() {
  return COSMETIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = COSMETIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description || product.name,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = COSMETIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = COSMETIC_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24 lg:pb-12 space-y-14">
      <nav className="text-xs font-bold uppercase tracking-wider text-[#211D19]/65 flex items-center gap-2">
        <Link href="/" className="hover:text-[#173F35]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#173F35]">Shop</Link>
        {product.categoryName && (
          <>
            <span>/</span>
            <Link href={`/category/${product.categorySlug}`} className="hover:text-[#173F35]">
              {product.categoryName}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[#211D19] truncate">{product.name}</span>
      </nav>

      <ProductDetailClient
        product={product}
        whatsappNumber={COSMETIC_SETTINGS.contactInfo.whatsapp_number}
      />

      {related.length > 0 && (
        <section className="space-y-6 border-t-2 border-[#211D19] pt-10">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Complete Your Ritual
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
