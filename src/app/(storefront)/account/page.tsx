"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export default function AccountPage() {
  const { demoOrders, wishlistIds } = useCart();
  const [name, setName] = React.useState("Patron");

  React.useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = localStorage.getItem("brijblash_frontend_user");
        if (raw) {
          const parsed = JSON.parse(raw) as { fullName?: string };
          if (parsed.fullName) setName(parsed.fullName);
        }
      } catch {
        // Ignore storage errors
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Customer Account
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">
          Namaste, {name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/account/orders" className="brj-surface p-6 hover:bg-[#FFFFFF]/80">
          <h2 className="font-editorial text-2xl font-bold">My Orders</h2>
          <p className="text-sm text-[#211D19]/70 mt-1">
            {demoOrders.length} order(s)
          </p>
        </Link>
        <Link href="/account/addresses" className="brj-surface p-6 hover:bg-[#FFFFFF]/80">
          <h2 className="font-editorial text-2xl font-bold">Saved Addresses</h2>
          <p className="text-sm text-[#211D19]/70 mt-1">
            Manage delivery addresses across India
          </p>
        </Link>
        <Link href="/wishlist" className="brj-surface p-6 hover:bg-[#FFFFFF]/80">
          <h2 className="font-editorial text-2xl font-bold">Wishlist</h2>
          <p className="text-sm text-[#211D19]/70 mt-1">
            {wishlistIds.length} saved formulation(s)
          </p>
        </Link>
      </div>
    </div>
  );
}
