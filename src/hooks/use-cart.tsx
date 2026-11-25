"use client";

import * as React from "react";
import { COSMETIC_PRODUCTS } from "@/data/cosmetics-catalog";
import type { CartItemView, CartView, IndianAddress } from "@/types/domain";
import { useToast } from "@/components/ui/toast";

interface StoredCartEntry {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
}

export interface DemoOrderRecord {
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: "cod" | "razorpay";
  totalPaise: number;
  placedAt: string;
  shippingAddress: IndianAddress;
  items: Array<{
    id: string;
    productNameSnapshot: string;
    variantTitleSnapshot: string | null;
    quantity: number;
    lineTotalPaise: number;
  }>;
}

interface CartContextValue {
  cart: CartView;
  loading: boolean;
  wishlistIds: string[];
  demoOrders: DemoOrderRecord[];
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, variantId?: string | null, quantity?: number) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string | null) => Promise<{ ok: boolean; error?: string }>;
  toggleWishlist: (productId: string) => boolean;
  placeDemoOrder: (params: {
    paymentMethod: "cod" | "razorpay";
    shippingAddress: IndianAddress;
    localPickup?: boolean;
  }) => DemoOrderRecord;
}

const CART_STORAGE_KEY = "brijblash_frontend_cart_v1";
const WISHLIST_STORAGE_KEY = "brijblash_frontend_wishlist_v1";
const ORDERS_STORAGE_KEY = "brijblash_frontend_orders_v1";

const SAMPLE_DEMO_ORDER: DemoOrderRecord = {
  orderNumber: "ORD-DEMO-108",
  orderStatus: "shipped",
  paymentStatus: "paid",
  paymentMethod: "razorpay",
  totalPaise: 183000,
  placedAt: "2026-11-24T09:30:00.000Z",
  shippingAddress: {
    fullName: "Radhika Sharma",
    phone: "9876543210",
    email: "radhika@example.com",
    addressLine1: "14 Banke Bihari Colony",
    city: "Vrindavan",
    state: "Uttar Pradesh",
    pinCode: "281121",
  },
  items: [
    {
      id: "sample-item-1",
      productNameSnapshot: "Kumkumadi Saffron Radiance Elixir",
      variantTitleSnapshot: null,
      quantity: 1,
      lineTotalPaise: 129000,
    },
    {
      id: "sample-item-2",
      productNameSnapshot: "Vrindavan Rose & Vetiver Facial Mist",
      variantTitleSnapshot: null,
      quantity: 1,
      lineTotalPaise: 54000,
    },
  ],
};

function computeCartView(entries: StoredCartEntry[], couponCode: string | null): CartView {
  const items: CartItemView[] = [];
  for (const entry of entries) {
    const prod = COSMETIC_PRODUCTS.find((p) => p.id === entry.productId);
    if (!prod) continue;
    const variant = entry.variantId
      ? prod.variants.find((v) => v.id === entry.variantId) ?? null
      : null;
    const unitPricePaise = variant?.sellingPricePaise ?? prod.sellingPricePaise;
    const availableQty = variant ? variant.availableQty : prod.availableQty;
    const qty = Math.min(Math.max(1, entry.quantity), Math.max(1, availableQty));
    items.push({
      id: entry.id,
      productId: prod.id,
      variantId: variant?.id ?? null,
      productName: prod.name,
      variantTitle: variant?.title ?? null,
      slug: prod.slug,
      sku: variant?.sku ?? prod.sku,
      imageUrl: prod.images[0]?.url ?? null,
      unitPricePaise,
      mrpPaise: variant?.mrpPaise ?? prod.mrpPaise,
      quantity: qty,
      availableQty,
      lineTotalPaise: unitPricePaise * qty,
    });
  }

  const subtotalPaise = items.reduce((s, i) => s + i.lineTotalPaise, 0);
  let discountPaise = 0;
  const activeCoupon = couponCode?.trim().toUpperCase() || null;
  if (activeCoupon === "BRAJ10" && subtotalPaise >= 50000) {
    discountPaise = Math.round(subtotalPaise * 0.1);
  }

  const totalPaise = Math.max(0, subtotalPaise - discountPaise);

  return {
    id: "local-demo-cart",
    items,
    couponCode: discountPaise > 0 ? activeCoupon : null,
    subtotalPaise,
    discountPaise,
    shippingPaise: 0,
    taxPaise: 0,
    totalPaise,
    itemCount: items.reduce((s, i) => s + i.quantity, 0),
  };
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { pushToast } = useToast();
  const [entries, setEntries] = React.useState<StoredCartEntry[]>([]);
  const [couponCode, setCouponCode] = React.useState<string | null>(null);
  const [wishlistIds, setWishlistIds] = React.useState<string[]>([]);
  const [demoOrders, setDemoOrders] = React.useState<DemoOrderRecord[]>([SAMPLE_DEMO_ORDER]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const id = setTimeout(() => {
      try {
        const rawCart = localStorage.getItem(CART_STORAGE_KEY);
        if (rawCart) {
          const parsed = JSON.parse(rawCart) as {
            entries?: StoredCartEntry[];
            couponCode?: string | null;
          };
          if (Array.isArray(parsed.entries)) setEntries(parsed.entries);
          if (parsed.couponCode) setCouponCode(parsed.couponCode);
        }
        const rawWish = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (rawWish) {
          const parsed = JSON.parse(rawWish) as string[];
          if (Array.isArray(parsed)) setWishlistIds(parsed);
        }
        const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (rawOrders) {
          const parsed = JSON.parse(rawOrders) as DemoOrderRecord[];
          if (Array.isArray(parsed) && parsed.length > 0) setDemoOrders(parsed);
        }
      } catch {
        // Ignore storage parse errors
      } finally {
        setLoading(false);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const persistCart = React.useCallback(
    (nextEntries: StoredCartEntry[], nextCoupon: string | null) => {
      setEntries(nextEntries);
      setCouponCode(nextCoupon);
      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify({ entries: nextEntries, couponCode: nextCoupon })
        );
      } catch {
        // Ignore storage quota errors
      }
    },
    []
  );

  const cart = React.useMemo(
    () => computeCartView(entries, couponCode),
    [entries, couponCode]
  );

  const refreshCart = React.useCallback(async () => {}, []);

  const addToCart = React.useCallback(
    async (productId: string, variantId: string | null = null, quantity = 1) => {
      const prod = COSMETIC_PRODUCTS.find((p) => p.id === productId);
      if (!prod) return false;
      const variant = variantId
        ? prod.variants.find((v) => v.id === variantId) ?? null
        : prod.hasVariants
          ? prod.variants[0] ?? null
          : null;
      const maxQty = variant ? variant.availableQty : prod.availableQty;
      const key = `${productId}:${variant?.id ?? "none"}`;

      const existing = entries.find((e) => e.id === key);
      const nextQty = (existing?.quantity ?? 0) + quantity;
      if (nextQty > maxQty) {
        pushToast("Stock limit reached", {
          description: `Only ${maxQty} unit(s) available.`,
          tone: "error",
        });
        return false;
      }

      const nextEntries = existing
        ? entries.map((e) => (e.id === key ? { ...e, quantity: nextQty } : e))
        : [...entries, { id: key, productId, variantId: variant?.id ?? null, quantity: nextQty }];

      persistCart(nextEntries, couponCode);
      pushToast("Added to your cart", { tone: "success" });
      return true;
    },
    [entries, couponCode, persistCart, pushToast]
  );

  const updateQuantity = React.useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        persistCart(
          entries.filter((e) => e.id !== itemId),
          couponCode
        );
        return;
      }
      persistCart(
        entries.map((e) => (e.id === itemId ? { ...e, quantity } : e)),
        couponCode
      );
    },
    [entries, couponCode, persistCart]
  );

  const removeItem = React.useCallback(
    async (itemId: string) => {
      persistCart(
        entries.filter((e) => e.id !== itemId),
        couponCode
      );
    },
    [entries, couponCode, persistCart]
  );

  const applyCoupon = React.useCallback(
    async (code: string | null) => {
      if (!code) {
        persistCart(entries, null);
        return { ok: true };
      }
      const normalized = code.trim().toUpperCase();
      if (normalized !== "BRAJ10") {
        return { ok: false, error: "Try demo code BRAJ10 for 10% off above ₹500." };
      }
      if (cart.subtotalPaise < 50000) {
        return { ok: false, error: "Minimum order value of ₹500 required for BRAJ10." };
      }
      persistCart(entries, normalized);
      return { ok: true };
    },
    [entries, cart.subtotalPaise, persistCart]
  );

  const toggleWishlist = React.useCallback(
    (productId: string) => {
      const exists = wishlistIds.includes(productId);
      const next = exists
        ? wishlistIds.filter((id) => id !== productId)
        : [...wishlistIds, productId];
      setWishlistIds(next);
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      pushToast(exists ? "Removed from wishlist" : "Saved to wishlist", {
        tone: "success",
      });
      return !exists;
    },
    [wishlistIds, pushToast]
  );

  const placeDemoOrder = React.useCallback(
    (params: {
      paymentMethod: "cod" | "razorpay";
      shippingAddress: IndianAddress;
      localPickup?: boolean;
    }): DemoOrderRecord => {
      const subtotalAfterDiscount = Math.max(0, cart.subtotalPaise - cart.discountPaise);
      const shippingPaise =
        params.localPickup || subtotalAfterDiscount >= 149900 ? 0 : 7900;
      const totalPaise = subtotalAfterDiscount + shippingPaise;
      const orderNumber = `ORD-DEMO-${Math.floor(100 + Math.random() * 900)}`;

      const record: DemoOrderRecord = {
        orderNumber,
        orderStatus: "confirmed",
        paymentStatus: params.paymentMethod === "cod" ? "cod_pending" : "paid",
        paymentMethod: params.paymentMethod,
        totalPaise,
        placedAt: new Date().toISOString(),
        shippingAddress: params.shippingAddress,
        items: cart.items.map((it) => ({
          id: it.id,
          productNameSnapshot: it.productName,
          variantTitleSnapshot: it.variantTitle,
          quantity: it.quantity,
          lineTotalPaise: it.lineTotalPaise,
        })),
      };

      const nextOrders = [record, ...demoOrders];
      setDemoOrders(nextOrders);
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
      } catch {
        // Ignore storage error
      }
      persistCart([], null);
      return record;
    },
    [cart, demoOrders, persistCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        wishlistIds,
        demoOrders,
        refreshCart,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        toggleWishlist,
        placeDemoOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
