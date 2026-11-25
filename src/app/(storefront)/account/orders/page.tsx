"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import { formatDateIST, formatINR } from "@/lib/utils";

export default function AccountOrdersPage() {
  const { demoOrders } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="border-b-2 border-[#211D19] pb-4">
        <Link href="/account" className="text-xs font-bold uppercase text-[#173F35] underline">
          ← Back to Account
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold mt-1">Order History</h1>
      </div>

      <div className="space-y-4">
        {demoOrders.map((o) => (
          <div key={o.orderNumber} className="brj-surface-soft p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#211D19]/15 pb-3">
              <div>
                <span className="font-mono font-extrabold text-base">{o.orderNumber}</span>
                <span className="text-xs text-[#211D19]/65 ml-3">
                  {formatDateIST(o.placedAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="peacock">{o.orderStatus.replace(/_/g, " ")}</Badge>
                <Badge variant="pitambar">{o.paymentStatus.replace(/_/g, " ")}</Badge>
                <span className="font-extrabold text-base ml-2">
                  {formatINR(o.totalPaise)}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              {o.items.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <span>
                    {it.productNameSnapshot}{" "}
                    {it.variantTitleSnapshot ? `(${it.variantTitleSnapshot})` : ""} ×{" "}
                    {it.quantity}
                  </span>
                  <span className="font-semibold">{formatINR(it.lineTotalPaise)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
