"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Truck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/product-card";
import {
  LotusDivider,
  PeacockFeatherWatermark,
  VrindavanArchBorder,
} from "@/components/storefront/heritage-motifs";
import type { Category, Collection, PublicProduct } from "@/types/domain";
import type { StorePublicSettings } from "@/data/cosmetics-catalog";

interface StorefrontHomeProps {
  settings: StorePublicSettings;
  categories: Category[];
  featuredProducts: PublicProduct[];
  newArrivals: PublicProduct[];
  bestsellers: PublicProduct[];
  collections: Collection[];
  heroSection: { title: string; subtitle: string | null; content: Record<string, unknown> } | null;
  storySection: { title: string; subtitle: string | null; content: Record<string, unknown> } | null;
}

export function StorefrontHome({
  settings,
  categories,
  featuredProducts,
  newArrivals,
  bestsellers,
  collections,
  heroSection,
  storySection,
}: StorefrontHomeProps) {
  const heroContent = heroSection?.content ?? {};
  const storyPillars = Array.isArray(storySection?.content?.pillars)
    ? (storySection.content.pillars as Array<{ title: string; description: string }>)
    : [];

  const whatsappDigits = settings.contactInfo.whatsapp_number.replace(/\D/g, "");
  const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : "/contact";

  return (
    <div className="space-y-16 pb-8">
      {/* Heritage Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="relative bg-[#173F35] text-[#F8F1E3] border-2 border-[#211D19] shadow-[6px_6px_0px_#211D19] overflow-hidden">
          <PeacockFeatherWatermark className="hidden md:block absolute -right-6 -bottom-10 w-64 h-72 text-[#E9B949]/15 pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-7 sm:p-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 space-y-5"
            >
              <span className="inline-block px-3 py-1 bg-[#E9B949] text-[#211D19] text-xs font-extrabold uppercase tracking-[0.2em] border border-[#211D19]">
                {String(heroContent.badge || "Braj Heritage Edition")}
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
                {heroSection?.title || "Sacred Craftsmanship, Timeless Devotion"}
              </h1>
              <p className="text-base sm:text-lg text-[#F8F1E3]/85 max-w-xl leading-relaxed">
                {heroSection?.subtitle ||
                  "Rooted in the living artistry of Braj & Vrindavan — curated attire, shringar, and devotional objects."}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild variant="accent" size="lg">
                  <Link href={String(heroContent.cta_primary_href || "/shop")}>
                    {String(heroContent.cta_primary_label || "Explore the Catalogue")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={String(heroContent.cta_secondary_href || "/collections")}>
                    {String(heroContent.cta_secondary_label || "View Collections")}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="lg:col-span-5">
              <div className="bg-[#F8F1E3] text-[#211D19] border-2 border-[#211D19] shadow-[4px_4px_0px_#E9B949] p-5 sm:p-6">
                {heroContent.banner_image_url ? (
                  <img
                    src={String(heroContent.banner_image_url)}
                    alt="Brijblash Botanical Cosmetics Collection"
                    className="w-full aspect-[4/3] object-cover border border-[#211D19]"
                  />
                ) : (
                  <div className="aspect-[4/3] border border-[#211D19] bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#173F35]">
                      वृन्दावन • ब्रज सौंदर्य
                    </span>
                    <p className="font-editorial text-2xl font-bold text-[#211D19]">
                      Botanical Cosmetics &amp; Sacred Skincare
                    </p>
                    <p className="text-xs text-[#211D19]/70 max-w-xs">
                      Small-batch saffron, rose, sandalwood, and kohl formulations crafted for daily radiance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
                Curated Departments
              </p>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold mt-1">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold underline underline-offset-4 hover:text-[#173F35]"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group bg-[#FFFFFF] border-[1.5px] border-[#211D19] shadow-[3px_3px_0px_#211D19] p-4 flex flex-col justify-between gap-3 hover:bg-[#E9B949]/20 transition-colors"
              >
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full aspect-[4/3] object-cover border border-[#211D19]"
                  />
                ) : (
                  <div className="w-full h-2 bg-[#173F35] border border-[#211D19]" />
                )}
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#211D19] group-hover:text-[#173F35]">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-[#211D19]/70 line-clamp-2 mt-1">
                      {cat.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
                Selected Pieces
              </p>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold mt-1">
                Featured Offerings
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-bold underline underline-offset-4">
              Browse All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
              Fresh From Our Catalogue
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold mt-1">
              New Arrivals
            </h2>
          </div>
          <Link href="/shop?sort=newest" className="text-sm font-bold underline underline-offset-4">
            See All New →
          </Link>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="brj-surface p-8 text-center space-y-3">
            <p className="font-editorial text-2xl font-bold">Catalogue Ready for Your Craft</p>
            <p className="text-sm text-[#211D19]/75 max-w-md mx-auto">
              Products added and published from the Admin Dashboard appear here immediately with real-time stock tracking.
            </p>
            <Button asChild variant="primary">
              <Link href="/shop">Browse Botanicals</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Bestsellers (driven by actual sales) */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
              Most Loved by Patrons
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold mt-1">
              Bestsellers
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Festival / Seasonal Collections */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
              Seasonal & Utsav Curations
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold mt-1">
              Festival Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {collections.map((col) => (
              <VrindavanArchBorder key={col.id} className="p-6 shadow-[3px_3px_0px_#211D19]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#263D73]">
                  {col.collectionType}
                </span>
                <h3 className="font-editorial text-2xl font-bold mt-1">{col.title}</h3>
                {col.description && (
                  <p className="text-sm text-[#211D19]/75 mt-2 line-clamp-3">{col.description}</p>
                )}
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#173F35] mt-4 underline underline-offset-4"
                >
                  Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </VrindavanArchBorder>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LotusDivider />
      </div>

      {/* Brand Storytelling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] border-2 border-[#211D19] shadow-[5px_5px_0px_#211D19] p-7 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
              Our Ethos
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold">
              {storySection?.title || "From the Lanes of Vrindavan to Your Sacred Space"}
            </h2>
            {storySection?.subtitle && (
              <p className="text-base text-[#211D19]/80">{storySection.subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storyPillars.map((pillar, idx) => (
              <div key={idx} className="bg-[#F8F1E3] border-[1.5px] border-[#211D19] p-5 space-y-2">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-[#E9B949] border border-[#211D19] text-xs font-extrabold">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial text-xl font-bold">{pillar.title}</h3>
                <p className="text-sm text-[#211D19]/80 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Service Bar + WhatsApp Option */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="brj-surface-soft p-5 flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-[#173F35] shrink-0" />
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Pure Botanical Actives</h3>
            <p className="text-xs text-[#211D19]/75 mt-1">
              Crafted in small batches with saffron, rose, sandalwood, and cold-pressed oils.
            </p>
          </div>
        </div>
        <div className="brj-surface-soft p-5 flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 text-[#173F35] shrink-0" />
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Clean &amp; Transparent</h3>
            <p className="text-xs text-[#211D19]/75 mt-1">
              Paraben-free, sulphate-free formulations with full ingredient transparency.
            </p>
          </div>
        </div>
        <div className="brj-surface-soft p-5 flex items-start gap-3">
          <Truck className="h-6 w-6 text-[#173F35] shrink-0" />
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Pan-India Dispatch</h3>
            <p className="text-xs text-[#211D19]/75 mt-1">
              Protective eco-packaging and real-time order tracking across India.
            </p>
          </div>
        </div>
        <Link
          href={whatsappUrl}
          target={whatsappDigits ? "_blank" : undefined}
          rel={whatsappDigits ? "noopener noreferrer" : undefined}
          className="bg-[#173F35] text-[#F8F1E3] border-[1.5px] border-[#211D19] shadow-[2px_2px_0px_#211D19] p-5 flex items-start gap-3 hover:bg-[#1f5346]"
        >
          <MessageCircle className="h-6 w-6 text-[#E9B949] shrink-0" />
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#E9B949]">
              WhatsApp Beauty Desk
            </h3>
            <p className="text-xs text-[#F8F1E3]/85 mt-1">
              Consult with us for skin rituals, bridal trousseau boxes, and festive gifting.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
