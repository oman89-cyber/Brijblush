"use client";

import * as React from "react";
import { Search, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateIST, formatINR } from "@/lib/utils";
import { useCart, type DemoOrderRecord } from "@/hooks/use-cart";

export default function TrackOrderPage() {
  const { demoOrders } = useCart();
  const [orderNumber, setOrderNumber] = React.useState("ORD-DEMO-108");
  const [contact, setContact] = React.useState("9876543210");
  const [order, setOrder] = React.useState<DemoOrderRecord | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = orderNumber.trim().toUpperCase();
    const c = contact.trim().toLowerCase();
    const match = demoOrders.find(
      (o) =>
        o.orderNumber.toUpperCase() === num &&
        (o.shippingAddress.phone.toLowerCase() === c ||
          (o.shippingAddress.email ?? "").toLowerCase() === c)
    );
    if (!match) {
      setOrder(null);
      setError("No matching order found. Try sample ORD-DEMO-108 with 9876543210.");
    } else {
      setOrder(match);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Order Status
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">
          Track Your Order
        </h1>
      </div>

      <form onSubmit={handleTrack} className="brj-surface p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input
            id="orderNumber"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="ORD-DEMO-108"
          />
        </div>
        <div>
          <Label htmlFor="contact">Mobile or Email</Label>
          <Input
            id="contact"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="9876543210"
          />
        </div>
        <Button type="submit">
          <Search className="h-4 w-4" />
          Track Order
        </Button>
      </form>

      {error && (
        <div className="bg-[#FEE2E2] border border-[#991B1B] text-[#991B1B] p-4 text-sm font-semibold">
          {error}
        </div>
      )}

      {order && (
        <div className="brj-surface p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#211D19]/15 pb-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-[#173F35]" />
              <span className="font-mono text-lg font-extrabold">{order.orderNumber}</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="peacock">{order.orderStatus.replace(/_/g, " ")}</Badge>
              <Badge variant="pitambar">{order.paymentStatus.replace(/_/g, " ")}</Badge>
            </div>
          </div>

          <p className="text-xs text-[#211D19]/70">
            Placed on {formatDateIST(order.placedAt)} • Total: {formatINR(order.totalPaise)}
          </p>

          <div className="divide-y divide-[#211D19]/15">
            {order.items.map((it) => (
              <div key={it.id} className="py-2.5 flex justify-between text-sm">
                <span>
                  {it.productNameSnapshot}{" "}
                  {it.variantTitleSnapshot ? `(${it.variantTitleSnapshot})` : ""} × {it.quantity}
                </span>
                <span className="font-bold">{formatINR(it.lineTotalPaise)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
