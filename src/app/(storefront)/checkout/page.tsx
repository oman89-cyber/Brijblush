"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function CheckoutPage() {
  const { cart, placeDemoOrder } = useCart();
  const { pushToast } = useToast();
  const router = useRouter();

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [localPickup, setLocalPickup] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "razorpay">("cod");

  const pinValid = /^[1-9][0-9]{5}$/.test(pinCode.trim());
  const subtotalAfterDiscount = Math.max(0, cart.subtotalPaise - cart.discountPaise);
  const shippingPaise = localPickup || subtotalAfterDiscount >= 149900 ? 0 : 7900;
  const totalPaise = subtotalAfterDiscount + shippingPaise;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeDemoOrder({
      paymentMethod,
      localPickup,
      shippingAddress: {
        fullName,
        phone,
        email,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pinCode,
      },
    });
    pushToast(`Order ${order.orderNumber} placed`, { tone: "success" });
    router.push(`/order-success?order=${encodeURIComponent(order.orderNumber)}`);
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-editorial text-3xl font-bold">Your cart is empty</h1>
        <Button asChild>
          <Link href="/shop">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Checkout
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">
          Shipping &amp; Payment
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="brj-surface p-6 space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Delivery Address (India)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Radhika Sharma"
                />
              </div>
              <div>
                <Label htmlFor="phone">10-Digit Mobile *</Label>
                <Input
                  id="phone"
                  required
                  pattern="^[6-9]\d{9}$"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="for order confirmation"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="addressLine1">House / Street Address *</Label>
                <Input
                  id="addressLine1"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="House no., Street, Locality"
                />
              </div>
              <div>
                <Label htmlFor="addressLine2">Apartment / Colony</Label>
                <Input
                  id="addressLine2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Vrindavan"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Uttar Pradesh"
                />
              </div>
              <div>
                <Label htmlFor="pinCode">6-Digit PIN Code *</Label>
                <Input
                  id="pinCode"
                  required
                  pattern="^[1-9][0-9]{5}$"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="281121"
                />
              </div>
            </div>

            {pinValid && (
              <div className="p-3.5 border text-xs font-semibold flex items-start gap-2 bg-[#DCFCE7] border-[#166534] text-[#166534]">
                <Truck className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p>
                    Serviceable across India — Shipping:{" "}
                    {shippingPaise === 0 ? "FREE" : formatINR(shippingPaise)} (4–7 days)
                  </p>
                  <label className="inline-flex items-center gap-2 mt-2 cursor-pointer text-[#211D19]">
                    <input
                      type="checkbox"
                      checked={localPickup}
                      onChange={(e) => setLocalPickup(e.target.checked)}
                    />
                    Prefer Studio Pickup (₹0 shipping)
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="brj-surface p-6 space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 border-2 cursor-pointer flex items-start gap-3 ${
                  paymentMethod === "cod"
                    ? "border-[#173F35] bg-[#F8F1E3]"
                    : "border-[#211D19]/30 bg-[#FFFFFF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-[#173F35]"
                />
                <div>
                  <p className="font-bold text-sm">Cash on Delivery (COD)</p>
                  <p className="text-xs text-[#211D19]/70 mt-0.5">
                    Pay in cash or UPI upon delivery.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 border-2 cursor-pointer flex items-start gap-3 ${
                  paymentMethod === "razorpay"
                    ? "border-[#173F35] bg-[#F8F1E3]"
                    : "border-[#211D19]/30 bg-[#FFFFFF]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="mt-1 accent-[#173F35]"
                />
                <div>
                  <p className="font-bold text-sm">UPI / Card / NetBanking</p>
                  <p className="text-xs text-[#211D19]/70 mt-0.5">
                    Online payment gateway ready for integration.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="brj-surface p-6 space-y-4 sticky top-24">
            <h2 className="font-editorial text-2xl font-bold">Order Summary</h2>
            <div className="divide-y divide-[#211D19]/15 max-h-72 overflow-y-auto">
              {cart.items.map((it) => (
                <div key={it.id} className="py-2.5 flex justify-between gap-3 text-sm">
                  <div>
                    <p className="font-bold">{it.productName}</p>
                    <p className="text-xs text-[#211D19]/65">
                      Qty {it.quantity} {it.variantTitle ? `• ${it.variantTitle}` : ""}
                    </p>
                  </div>
                  <span className="font-bold">{formatINR(it.lineTotalPaise)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#211D19]/20 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatINR(cart.subtotalPaise)}</span>
              </div>
              {cart.discountPaise > 0 && (
                <div className="flex justify-between text-[#166534] font-bold">
                  <span>Discount ({cart.couponCode})</span>
                  <span>− {formatINR(cart.discountPaise)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingPaise === 0 ? "FREE" : formatINR(shippingPaise)}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold border-t-2 border-[#211D19] pt-3">
                <span>Total</span>
                <span>{formatINR(totalPaise)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <ShieldCheck className="h-4 w-4" />
              Place Order
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}
