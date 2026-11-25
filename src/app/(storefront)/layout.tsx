import * as React from "react";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { COSMETIC_CATEGORIES, COSMETIC_SETTINGS } from "@/data/cosmetics-catalog";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StorefrontShell settings={COSMETIC_SETTINGS} categories={COSMETIC_CATEGORIES}>
      {children}
    </StorefrontShell>
  );
}
