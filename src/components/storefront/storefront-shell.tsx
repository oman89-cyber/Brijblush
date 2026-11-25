"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { BrijblashLogo } from "@/components/storefront/heritage-motifs";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import type { StorePublicSettings } from "@/data/cosmetics-catalog";
import type { Category, SessionUser } from "@/types/domain";

interface StorefrontShellProps {
  children: React.ReactNode;
  settings: StorePublicSettings;
  categories?: Category[];
  user?: SessionUser | null;
}

export function StorefrontShell({
  children,
  settings,
  categories = [],
  user = null,
}: StorefrontShellProps) {
  const { cart } = useCart();
  const router = useRouter();
  const { pushToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [subscribing, setSubscribing] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/shop");
    setMobileMenuOpen(false);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribing(true);
    try {
      pushToast("Subscribed to Brijblash dispatches", {
        description: `${newsletterEmail} added to our botanical updates.`,
        tone: "success",
      });
      setNewsletterEmail("");
    } finally {
      setSubscribing(false);
    }
  };

  const whatsappDigits = settings.contactInfo.whatsapp_number.replace(/\D/g, "");
  const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : "/contact";

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F1E3] text-[#211D19]">
      {/* Configurable Announcement Bar */}
      {settings.announcementBar.enabled && settings.announcementBar.text && (
        <div className="bg-[#173F35] text-[#F8F1E3] border-b-[1.5px] border-[#211D19] px-4 py-2 text-center text-xs sm:text-sm font-medium">
          <span>{settings.announcementBar.text}</span>
          {settings.announcementBar.link_url && (
            <Link
              href={settings.announcementBar.link_url}
              className="ml-2 underline decoration-[#E9B949] underline-offset-4 text-[#E9B949] font-bold"
            >
              {settings.announcementBar.link_label || "Explore"}
            </Link>
          )}
        </div>
      )}

      {/* Primary Header */}
      <header className="sticky top-0 z-40 bg-[#F8F1E3]/95 backdrop-blur-xs border-b-2 border-[#211D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 border-[1.5px] border-[#211D19] bg-[#FFFFFF]"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="shrink-0">
              <BrijblashLogo />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
            <Link href="/shop" className="hover:text-[#173F35] transition-colors">
              Shop All
            </Link>
            <Link href="/collections" className="hover:text-[#173F35] transition-colors">
              Collections
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="hover:text-[#173F35] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/track-order" className="hover:text-[#173F35] transition-colors">
              Track Order
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Brijblash..."
                  className="h-10 w-44 xl:w-56 pr-9 bg-[#FFFFFF]"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#211D19]/70 hover:text-[#173F35] cursor-pointer"
                  aria-label="Submit search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            <Link
              href="/search"
              className="md:hidden p-2.5 border-[1.5px] border-[#211D19] bg-[#FFFFFF]"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            <Link
              href="/wishlist"
              className="p-2.5 border-[1.5px] border-[#211D19] bg-[#FFFFFF] hover:bg-[#E9B949] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Link>

            <Link
              href={user ? (user.role === "customer" ? "/account" : "/admin") : "/login"}
              className="p-2.5 border-[1.5px] border-[#211D19] bg-[#FFFFFF] hover:bg-[#E9B949] transition-colors flex items-center gap-1.5 text-xs font-bold"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">
                {user ? (user.role === "customer" ? "Account" : "Admin") : "Login"}
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative px-3 py-2 border-[1.5px] border-[#211D19] bg-[#173F35] text-[#F8F1E3] hover:bg-[#1f5346] transition-colors flex items-center gap-2 text-xs font-bold"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-4 w-4 text-[#E9B949]" />
              <span className="hidden sm:inline">Cart</span>
              <span
                data-testid="cart-badge-count"
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#E9B949] text-[#211D19] text-[11px] font-extrabold border border-[#211D19]"
              >
                {cart.itemCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#211D19]/60">
          <div className="w-80 max-w-[85vw] h-full bg-[#F8F1E3] border-r-2 border-[#211D19] p-5 flex flex-col gap-5 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#211D19]/20 pb-3">
              <BrijblashLogo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-[#211D19] bg-[#FFFFFF]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
              />
              <Button type="submit" size="md">
                Go
              </Button>
            </form>

            <nav className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider">
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#211D19]/15">
                Shop All
              </Link>
              <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#211D19]/15">
                Collections
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-[#211D19]/15"
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#211D19]/15">
                Track Order
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#211D19]/15">
                About Brijblash
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#211D19]/15">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      {/* Comprehensive Footer */}
      <footer className="bg-[#211D19] text-[#F8F1E3] border-t-2 border-[#211D19] mt-16">
        <div className="brj-textile-border" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <BrijblashLogo inverted />
            <p className="text-sm text-[#F8F1E3]/80 leading-relaxed">
              {settings.brandIdentity.tagline}
            </p>
            {settings.brandIdentity.hindi_subtitle && (
              <p className="text-sm text-[#E9B949] font-medium">
                {settings.brandIdentity.hindi_subtitle}
              </p>
            )}
            <Link
              href={whatsappUrl}
              target={whatsappDigits ? "_blank" : undefined}
              rel={whatsappDigits ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#173F35] text-[#F8F1E3] border border-[#E9B949] text-xs font-bold uppercase tracking-wider hover:bg-[#1f5346]"
            >
              <MessageCircle className="h-4 w-4 text-[#E9B949]" />
              WhatsApp Store Desk
            </Link>
          </div>

          <div>
            <h4 className="font-editorial text-lg font-bold text-[#E9B949] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F1E3]/85">
              <li><Link href="/shop" className="hover:text-[#E9B949]">All Products</Link></li>
              <li><Link href="/collections" className="hover:text-[#E9B949]">Curated Collections</Link></li>
              <li><Link href="/track-order" className="hover:text-[#E9B949]">Track Your Order</Link></li>
              <li><Link href="/about" className="hover:text-[#E9B949]">About Brijblash</Link></li>
              <li><Link href="/faq" className="hover:text-[#E9B949]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-lg font-bold text-[#E9B949] mb-4">
              Policies & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F1E3]/85">
              <li><Link href="/shipping-policy" className="hover:text-[#E9B949]">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#E9B949]">Return Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#E9B949]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#E9B949]">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-[#E9B949]">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-editorial text-lg font-bold text-[#E9B949] mb-4">
              Braj Dispatches
            </h4>
            <p className="text-sm text-[#F8F1E3]/80 mb-3">
              Receive dispatches on botanical launches, festive edits, and skincare rituals.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <Input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#FFFFFF] text-[#211D19]"
              />
              <Button type="submit" variant="accent" disabled={subscribing}>
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {settings.contactInfo.store_address && (
              <p className="text-xs text-[#F8F1E3]/65 mt-4">
                {settings.contactInfo.store_address}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-[#F8F1E3]/15 py-4 px-4 sm:px-6 text-xs text-[#F8F1E3]/65 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-2">
          <span>© {new Date().getFullYear()} {settings.brandIdentity.brand_name}. All rights reserved.</span>
          <span>Botanical Cosmetics &amp; Heritage Skincare</span>
        </div>
      </footer>
    </div>
  );
}
