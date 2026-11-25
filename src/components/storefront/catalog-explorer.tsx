"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { ProductCard } from "@/components/storefront/product-card";
import { COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";
import { rupeesToPaise } from "@/lib/utils";
import type { Category, PublicProduct } from "@/types/domain";

interface CatalogExplorerProps {
  title: string;
  subtitle?: string;
  initialProducts: PublicProduct[];
  total: number;
  categories: Category[];
  lockedCategorySlug?: string;
  lockedCollectionSlug?: string;
}

function CatalogExplorerInner({
  title,
  subtitle,
  initialProducts,
  categories,
  lockedCategorySlug,
}: CatalogExplorerProps) {
  const sp = useSearchParams();

  const [q, setQ] = React.useState(sp.get("q") || "");
  const [categorySlug, setCategorySlug] = React.useState(
    lockedCategorySlug || sp.get("category") || ""
  );
  const [minPrice, setMinPrice] = React.useState(sp.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = React.useState(sp.get("maxPrice") || "");
  const [inStockOnly, setInStockOnly] = React.useState(sp.get("inStock") === "true");
  const [sort, setSort] = React.useState(sp.get("sort") || "newest");

  const products = React.useMemo(() => {
    const base = lockedCategorySlug ? initialProducts : initialProducts.length ? initialProducts : COSMETIC_PRODUCTS;
    const minP = minPrice ? rupeesToPaise(Number(minPrice)) : null;
    const maxP = maxPrice ? rupeesToPaise(Number(maxPrice)) : null;
    const term = q.trim().toLowerCase();

    const filtered = base.filter((p) => {
      if (term) {
        const hay = `${p.name} ${p.productCode} ${p.material || ""} ${p.description || ""} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (categorySlug && p.categorySlug !== categorySlug) return false;
      if (minP != null && p.sellingPricePaise < minP) return false;
      if (maxP != null && p.sellingPricePaise > maxP) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price_asc") {
      sorted.sort((a, b) => a.sellingPricePaise - b.sellingPricePaise);
    } else if (sort === "price_desc") {
      sorted.sort((a, b) => b.sellingPricePaise - a.sellingPricePaise);
    }
    return sorted;
  }, [initialProducts, lockedCategorySlug, q, categorySlug, minPrice, maxPrice, inStockOnly, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
            Brijblash Botanicals
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">{title}</h1>
          {subtitle && <p className="text-sm text-[#211D19]/75 mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        <p className="text-sm font-bold text-[#211D19]/70">
          {products.length} {products.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Filter Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-[#FFFFFF] border-[1.5px] border-[#211D19] shadow-[3px_3px_0px_#211D19] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end"
      >
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
            Search
          </label>
          <div className="relative">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search saffron, kajal, mist, lip tint..."
              className="pr-9"
            />
            <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#211D19]/50" />
          </div>
        </div>

        {!lockedCategorySlug && (
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
              Category
            </label>
            <Select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
              Min ₹
            </label>
            <Input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
              Max ₹
            </label>
            <Input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
            Sort By
          </label>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Featured / Newest</option>
            <option value="popular">Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-[#173F35]"
            />
            In Stock Only
          </label>
          <Button
            type="button"
            size="md"
            variant="secondary"
            onClick={() => {
              setQ("");
              setMinPrice("");
              setMaxPrice("");
              setInStockOnly(false);
              if (!lockedCategorySlug) setCategorySlug("");
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </form>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="brj-surface p-10 text-center space-y-3">
          <h2 className="font-editorial text-2xl font-bold">No matching products found</h2>
          <p className="text-sm text-[#211D19]/75">
            Try clearing your search filters or exploring all categories.
          </p>
        </div>
      )}
    </div>
  );
}

export function CatalogExplorer(props: CatalogExplorerProps) {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 font-bold">Loading catalogue...</div>}>
      <CatalogExplorerInner {...props} />
    </React.Suspense>
  );
}
