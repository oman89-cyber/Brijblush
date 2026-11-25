"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { PublicProduct } from "@/types/domain";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";

export function ProductCard({
  product,
}: {
  product: PublicProduct;
}) {
  const { addToCart, wishlistIds, toggleWishlist } = useCart();
  const [quickOpen, setQuickOpen] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const isWishlisted = wishlistIds.includes(product.id);
  const primaryImage = product.images[0]?.url || null;

  const firstAvailableVariant = product.hasVariants
    ? product.variants.find((v) => v.availableQty > 0) ?? product.variants[0]
    : null;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    setAdding(true);
    await addToCart(product.id, firstAvailableVariant?.id ?? null, 1);
    setAdding(false);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <>
      <article className="group bg-[#FFFFFF] border-[1.5px] border-[#211D19] shadow-[3px_3px_0px_#211D19] flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5">
        <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-[#F8F1E3] border-b-[1.5px] border-[#211D19] overflow-hidden block">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F8F1E3]">
              <span className="font-editorial text-lg font-bold text-[#173F35]">
                {product.name}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#211D19]/60 mt-1">
                {product.productCode}
              </span>
            </div>
          )}

          {/* Status & Sale Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {!product.inStock && <Badge variant="danger">Out of Stock</Badge>}
            {product.inStock && product.discountPercent > 0 && (
              <Badge variant="pitambar">{product.discountPercent}% Off</Badge>
            )}
            {product.inStock && product.isUniqueItem && (
              <Badge variant="peacock">One of a Kind</Badge>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleToggleWishlist}
              className="p-2 bg-[#FFFFFF] border border-[#211D19] hover:bg-[#E9B949] transition-colors cursor-pointer"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? "fill-[#991B1B] text-[#991B1B]" : "text-[#211D19]"}`}
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setQuickOpen(true);
              }}
              className="p-2 bg-[#FFFFFF] border border-[#211D19] hover:bg-[#E9B949] transition-colors cursor-pointer"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-[#211D19]" />
            </button>
          </div>
        </Link>

        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
          <div>
            {product.categoryName && (
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#173F35]">
                {product.categoryName}
              </p>
            )}
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-editorial text-lg font-bold text-[#211D19] line-clamp-2 mt-0.5 hover:text-[#173F35]">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-[#211D19]">
                {formatINR(product.sellingPricePaise)}
              </span>
              {product.mrpPaise && product.mrpPaise > product.sellingPricePaise && (
                <span className="text-xs line-through text-[#211D19]/50">
                  {formatINR(product.mrpPaise)}
                </span>
              )}
            </div>

            <Button
              type="button"
              variant={product.inStock ? "primary" : "secondary"}
              size="sm"
              className="w-full"
              disabled={!product.inStock || adding}
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="h-4 w-4" />
              {!product.inStock
                ? "Sold Out"
                : adding
                  ? "Adding..."
                  : product.hasVariants
                    ? "Add Default Option"
                    : "Add to Cart"}
            </Button>
          </div>
        </div>
      </article>

      <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="aspect-square bg-[#F8F1E3] border border-[#211D19] overflow-hidden">
              {primaryImage ? (
                <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[#211D19]/60">
                  {product.productCode}
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                  Code: {product.productCode}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold">
                    {formatINR(product.sellingPricePaise)}
                  </span>
                  {product.mrpPaise && product.mrpPaise > product.sellingPricePaise && (
                    <span className="text-sm line-through text-[#211D19]/50">
                      {formatINR(product.mrpPaise)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#211D19]/80 line-clamp-4">
                  {product.description || "Authentic Braj heritage creation."}
                </p>
                <p className="text-xs font-semibold">
                  Availability:{" "}
                  {product.inStock ? `${product.availableQty} in stock` : "Currently unavailable"}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  disabled={!product.inStock}
                  onClick={async () => {
                    const ok = await addToCart(
                      product.id,
                      firstAvailableVariant?.id ?? null,
                      1
                    );
                    if (ok) setQuickOpen(false);
                  }}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button asChild variant="secondary">
                  <Link href={`/product/${product.slug}`}>View Full Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
