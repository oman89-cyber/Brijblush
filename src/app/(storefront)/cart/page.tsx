"use client";

import * as React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, applyCoupon } = useCart();
  const { pushToast } = useToast();
  const [couponInput, setCouponInput] = React.useState("");
  const [couponBusy, setCouponBusy] = React.useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponBusy(true);
    const res = await applyCoupon(couponInput.trim() || null);
    setCouponBusy(false);
    if (res.ok) {
      pushToast(couponInput.trim() ? "Coupon applied" : "Coupon removed", {
        tone: "success",
      });
    } else {
      pushToast("Coupon rejected", { description: res.error, tone: "error" });
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-bold">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
            Your Selection
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">
            Shopping Cart
          </h1>
        </div>
        <span className="text-sm font-bold">{cart.itemCount} item(s)</span>
      </div>

      {cart.items.length === 0 ? (
        <div className="brj-surface p-10 text-center space-y-4">
          <h2 className="font-editorial text-2xl font-bold">Your cart is empty</h2>
          <p className="text-sm text-[#211D19]/75">
            Explore our handcrafted Braj & Vrindavan offerings to begin.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Catalogue</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="brj-surface-soft p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    className="w-20 h-24 bg-[#F8F1E3] border border-[#211D19] shrink-0 overflow-hidden"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">
                        {item.sku}
                      </div>
                    )}
                  </Link>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-editorial text-lg font-bold hover:text-[#173F35]"
                    >
                      {item.productName}
                    </Link>
                    {item.variantTitle && (
                      <p className="text-xs font-semibold text-[#173F35]">
                        Option: {item.variantTitle}
                      </p>
                    )}
                    <p className="text-xs text-[#211D19]/65 mt-0.5">
                      {formatINR(item.unitPricePaise)} each • {item.availableQty} available
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="inline-flex items-center border-[1.5px] border-[#211D19] bg-[#FFFFFF]">
                    <button
                      type="button"
                      onClick={() => void updateQuantity(item.id, item.quantity - 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-[#F8F1E3] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      disabled={item.quantity >= item.availableQty}
                      onClick={() => void updateQuantity(item.id, item.quantity + 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-[#F8F1E3] disabled:opacity-40 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="font-extrabold text-base min-w-[80px] text-right">
                    {formatINR(item.lineTotalPaise)}
                  </p>

                  <button
                    type="button"
                    onClick={() => void removeItem(item.id)}
                    className="p-2 text-[#991B1B] hover:bg-[#FEE2E2] border border-transparent hover:border-[#991B1B] cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="brj-surface p-6 space-y-4">
              <h2 className="font-editorial text-2xl font-bold">Order Summary</h2>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder={cart.couponCode || "Coupon code"}
                    className="pr-8"
                  />
                  <Tag className="h-3.5 w-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#211D19]/50" />
                </div>
                <Button type="submit" variant="secondary" disabled={couponBusy}>
                  Apply
                </Button>
              </form>

              {cart.couponCode && (
                <div className="flex items-center justify-between text-xs bg-[#DCFCE7] border border-[#166534] px-3 py-2 text-[#166534] font-bold">
                  <span>Applied: {cart.couponCode}</span>
                  <button
                    type="button"
                    onClick={() => void applyCoupon(null)}
                    className="underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="space-y-2 text-sm border-t border-[#211D19]/15 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatINR(cart.subtotalPaise)}</span>
                </div>
                {cart.discountPaise > 0 && (
                  <div className="flex justify-between text-[#166534] font-bold">
                    <span>Discount</span>
                    <span>− {formatINR(cart.discountPaise)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#211D19]/70">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold border-t border-[#211D19] pt-3">
                  <span>Estimated Total</span>
                  <span>{formatINR(cart.totalPaise)}</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
