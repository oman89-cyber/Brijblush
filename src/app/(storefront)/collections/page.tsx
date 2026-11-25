import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { COSMETIC_COLLECTIONS } from "@/data/cosmetics-catalog";
import { VrindavanArchBorder } from "@/components/storefront/heritage-motifs";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="border-b-2 border-[#211D19] pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          Seasonal &amp; Curated Rituals
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">
          Brijblash Collections
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COSMETIC_COLLECTIONS.map((col) => (
          <VrindavanArchBorder
            key={col.id}
            className="p-6 shadow-[4px_4px_0px_#211D19] flex flex-col justify-between gap-4"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#263D73]">
                {col.collectionType}
              </span>
              <h2 className="font-editorial text-2xl font-bold mt-1">{col.title}</h2>
              {col.description && (
                <p className="text-sm text-[#211D19]/75 mt-2">{col.description}</p>
              )}
            </div>
            <Link
              href={`/collections/${col.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#173F35] underline underline-offset-4"
            >
              View Formulations <ArrowRight className="h-4 w-4" />
            </Link>
          </VrindavanArchBorder>
        ))}
      </div>
    </div>
  );
}
