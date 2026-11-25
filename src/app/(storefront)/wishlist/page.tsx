"use client";

import Link from "next/link";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";
import { useCart } from "@/hooks/use-cart";

export default function WishlistPage() {
  const { wishlistIds } = useCart();
  const items = COSMETIC_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Saved Rituals
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">My Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="brj-surface p-8 text-center space-y-4">
          <h2 className="font-editorial text-2xl font-bold">No saved items yet</h2>
          <p className="text-sm text-[#211D19]/70">
            Tap the heart icon on any cosmetic formulation to save it here.
          </p>
          <Button asChild>
            <Link href="/shop">Explore Botanicals</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
