"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ZoomIn,
} from "lucide-react";
import type { PublicProduct } from "@/types/domain";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function ProductDetailClient({
  product,
  whatsappNumber,
}: {
  product: PublicProduct;
  whatsappNumber: string;
}) {
  const { addToCart, toggleWishlist, wishlistIds } = useCart();
  const router = useRouter();
  const isWishlisted = wishlistIds.includes(product.id);

  const [selectedImageIdx, setSelectedImageIdx] = React.useState(0);
  const [zoomed, setZoomed] = React.useState(false);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string | null>(
    product.hasVariants
      ? (product.variants.find((v) => v.availableQty > 0)?.id ?? product.variants[0]?.id ?? null)
      : null
  );
  const [quantity, setQuantity] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);

  const selectedVariant = product.hasVariants
    ? product.variants.find((v) => v.id === selectedVariantId) ?? null
    : null;

  const activePrice = selectedVariant?.sellingPricePaise ?? product.sellingPricePaise;
  const activeMrp = selectedVariant?.mrpPaise ?? product.mrpPaise;
  const maxStock = selectedVariant ? selectedVariant.availableQty : product.availableQty;
  const inStock = maxStock > 0;
  const effectiveQty = maxStock > 0 ? Math.min(quantity, maxStock) : 1;

  const activeImage = product.images[selectedImageIdx]?.url || null;
  const whatsappDigits = whatsappNumber.replace(/\D/g, "");
  const enquiryText = encodeURIComponent(
    `Namaste Brijblash! I would like to enquire about "${product.name}" (${product.productCode}).`
  );
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${enquiryText}`
    : "/contact";

  const handleAddToCart = async (goCheckout = false) => {
    if (!inStock) return;
    setSubmitting(true);
    const ok = await addToCart(product.id, selectedVariant?.id ?? null, effectiveQty);
    setSubmitting(false);
    if (ok && goCheckout) {
      router.push("/checkout");
    }
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Gallery Column */}
      <div className="lg:col-span-7 space-y-4">
        <div
          onClick={() => activeImage && setZoomed((z) => !z)}
          className="relative aspect-[4/5] bg-[#FFFFFF] border-2 border-[#211D19] shadow-[5px_5px_0px_#211D19] overflow-hidden cursor-zoom-in"
        >
          {activeImage ? (
            <img
              src={activeImage}
              alt={product.images[selectedImageIdx]?.altText || product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                zoomed ? "scale-150" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F1E3] p-8 text-center">
              <span className="font-editorial text-2xl font-bold text-[#173F35]">
                {product.name}
              </span>
              <span className="text-xs uppercase tracking-widest mt-2 text-[#211D19]/60">
                {product.productCode}
              </span>
            </div>
          )}
          {activeImage && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#FFFFFF]/90 border border-[#211D19] text-xs font-bold inline-flex items-center gap-1">
              <ZoomIn className="h-3.5 w-3.5" />
              {zoomed ? "Reset Zoom" : "Click to Zoom"}
            </span>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => {
                  setSelectedImageIdx(idx);
                  setZoomed(false);
                }}
                className={`w-20 h-20 shrink-0 border-2 overflow-hidden cursor-pointer ${
                  idx === selectedImageIdx
                    ? "border-[#173F35] shadow-[2px_2px_0px_#211D19]"
                    : "border-[#211D19]/40"
                }`}
              >
                <img src={img.url} alt={img.altText || product.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2 border-b-[1.5px] border-[#211D19]/20 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {product.categoryName && (
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-bold uppercase tracking-widest text-[#173F35] underline underline-offset-4"
              >
                {product.categoryName}
              </Link>
            )}
            <Badge variant="default">{product.productCode}</Badge>
            {product.isUniqueItem && <Badge variant="peacock">Unique Handcrafted</Badge>}
            {!inStock && <Badge variant="danger">Out of Stock</Badge>}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#211D19] leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-3xl font-extrabold text-[#211D19]">
              {formatINR(activePrice)}
            </span>
            {activeMrp && activeMrp > activePrice && (
              <>
                <span className="text-base line-through text-[#211D19]/50">
                  {formatINR(activeMrp)}
                </span>
                <Badge variant="pitambar">{product.discountPercent}% OFF</Badge>
              </>
            )}
          </div>
          <p className="text-xs font-semibold text-[#173F35]">
            {inStock
              ? `${maxStock} unit${maxStock === 1 ? "" : "s"} available to ship`
              : "Currently unavailable — sold out"}
          </p>
        </div>

        {/* Variants */}
        {product.hasVariants && product.variants.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider">Select Option</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const selected = v.id === selectedVariantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={v.availableQty <= 0}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3.5 py-2 text-xs font-bold border-[1.5px] border-[#211D19] cursor-pointer transition-colors ${
                      selected
                        ? "bg-[#173F35] text-[#F8F1E3]"
                        : "bg-[#FFFFFF] text-[#211D19] hover:bg-[#F8F1E3]"
                    } disabled:opacity-45 disabled:line-through`}
                  >
                    {v.title} ({v.availableQty})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider">Quantity</span>
            <div className="inline-flex items-center border-[1.5px] border-[#211D19] bg-[#FFFFFF]">
              <button
                type="button"
                disabled={!inStock || effectiveQty <= 1}
                onClick={() => setQuantity((q) => Math.max(1, Math.min(maxStock, q) - 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-[#F8F1E3] disabled:opacity-40 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold text-sm" data-testid="pdp-quantity">
                {effectiveQty}
              </span>
              <button
                type="button"
                disabled={!inStock || effectiveQty >= maxStock}
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-[#F8F1E3] disabled:opacity-40 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              type="button"
              size="lg"
              disabled={!inStock || submitting}
              onClick={() => void handleAddToCart(false)}
            >
              <ShoppingBag className="h-4 w-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              type="button"
              variant="accent"
              size="lg"
              disabled={!inStock || submitting}
              onClick={() => void handleAddToCart(true)}
            >
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="secondary" onClick={handleWishlist}>
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-[#991B1B] text-[#991B1B]" : ""}`} />
              {isWishlisted ? "Wishlisted" : "Save to Wishlist"}
            </Button>
            <Button asChild variant="secondary">
              <Link
                href={whatsappHref}
                target={whatsappDigits ? "_blank" : undefined}
                rel={whatsappDigits ? "noopener noreferrer" : undefined}
              >
                <MessageCircle className="h-4 w-4 text-[#173F35]" />
                WhatsApp Enquiry
              </Link>
            </Button>
          </div>
        </div>

        {/* Description & Specifications */}
        {product.description && (
          <div className="brj-surface-soft p-5 space-y-2">
            <h2 className="font-editorial text-lg font-bold">Craft Story & Description</h2>
            <p className="text-sm text-[#211D19]/85 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        <div className="brj-surface-soft p-5 space-y-3">
          <h2 className="font-editorial text-lg font-bold">Specifications & Care</h2>
          <dl className="grid grid-cols-2 gap-y-2 text-xs">
            <dt className="font-bold text-[#211D19]/65 uppercase">Product Code</dt>
            <dd className="font-semibold">{product.productCode}</dd>
            <dt className="font-bold text-[#211D19]/65 uppercase">SKU</dt>
            <dd className="font-semibold">{selectedVariant?.sku || product.sku}</dd>
            {product.material && (
              <>
                <dt className="font-bold text-[#211D19]/65 uppercase">Key Botanicals</dt>
                <dd className="font-semibold">{product.material}</dd>
              </>
            )}
            {product.colour && (
              <>
                <dt className="font-bold text-[#211D19]/65 uppercase">Shade / Tone</dt>
                <dd className="font-semibold">{product.colour}</dd>
              </>
            )}
            {product.size && (
              <>
                <dt className="font-bold text-[#211D19]/65 uppercase">Net Volume / Size</dt>
                <dd className="font-semibold">{product.size}</dd>
              </>
            )}
            {product.dimensions && (
              <>
                <dt className="font-bold text-[#211D19]/65 uppercase">Dimensions</dt>
                <dd className="font-semibold">{product.dimensions}</dd>
              </>
            )}
          </dl>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#FFFFFF] border border-[#211D19] p-3.5 flex items-start gap-2.5">
            <Truck className="h-4 w-4 text-[#173F35] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase">Shipping Information</p>
              <p className="text-[#211D19]/75 mt-0.5">
                Calculated at checkout by PIN code.{" "}
                <Link href="/shipping-policy" className="underline">
                  Read policy
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#211D19] p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#173F35] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase">Return & Inspection</p>
              <p className="text-[#211D19]/75 mt-0.5">
                Protected by our quality return terms.{" "}
                <Link href="/return-policy" className="underline">
                  Read policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add-to-Cart */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#F8F1E3] border-t-2 border-[#211D19] px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold truncate max-w-[160px]">{product.name}</p>
          <p className="text-base font-extrabold">{formatINR(activePrice)}</p>
        </div>
        <Button
          type="button"
          disabled={!inStock || submitting}
          onClick={() => void handleAddToCart(false)}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
