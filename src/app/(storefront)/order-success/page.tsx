"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderSuccessInner() {
  const sp = useSearchParams();
  const order = sp.get("order");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="brj-surface p-8 sm:p-10 text-center space-y-5">
        <CheckCircle2 className="h-14 w-14 text-[#173F35] mx-auto" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Order Confirmed
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold">
          Thank you for choosing Brijblash
        </h1>
        {order && (
          <p className="inline-block px-4 py-2 bg-[#F8F1E3] border-[1.5px] border-[#211D19] font-mono text-base font-extrabold">
            Order Number: {order}
          </p>
        )}
        <p className="text-sm text-[#211D19]/80">
          Your botanical skincare selection is confirmed. You can track your order anytime using your order number and mobile number.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/track-order">Track This Order</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <React.Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-16 text-center font-bold">Loading confirmation...</div>}>
      <OrderSuccessInner />
    </React.Suspense>
  );
}
