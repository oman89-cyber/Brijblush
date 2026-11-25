export type UserRole = "customer" | "staff" | "manager" | "owner";

export type ProductStatus = "draft" | "active" | "archived";

export type OrderStatus =
  | "pending_payment"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "returned"
  | "needs_resolution";

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "paid"
  | "failed"
  | "cod_pending"
  | "cod_collected"
  | "refund_pending"
  | "partially_refunded"
  | "refunded";

export type PaymentMethod = "razorpay" | "cod";

export type InventoryTransactionType =
  | "initial_stock"
  | "stock_addition"
  | "stock_reduction"
  | "stock_adjustment"
  | "offline_sale"
  | "online_sale"
  | "damaged"
  | "lost"
  | "customer_return"
  | "stock_correction"
  | "reservation"
  | "reservation_release"
  | "restock";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  displayOrder: number;
  isVisible: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  bannerImageUrl: string | null;
  collectionType: "featured" | "festival" | "seasonal" | "curated";
  isPublished: boolean;
  displayOrder: number;
  startsAt: string | null;
  endsAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface ProductImage {
  id: string;
  productId: string;
  storagePath: string;
  url: string;
  thumbnailUrl: string | null;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface PublicProductVariant {
  id: string;
  productId: string;
  sku: string;
  variantCode: string;
  title: string;
  size: string | null;
  colour: string | null;
  material: string | null;
  attributes: Record<string, string>;
  sellingPricePaise: number | null;
  mrpPaise: number | null;
  isActive: boolean;
  availableQty: number;
}

export interface AdminProductVariant extends PublicProductVariant {
  purchaseCostPaise: number | null;
  externalBarcode: string | null;
  onHandQty: number;
  reservedQty: number;
  damagedQty: number;
  incomingQty: number;
}

/**
 * Customer-facing product DTO.
 * Strictly omits purchaseCostPaise, supplier, storageLocation, and internal inventory metrics.
 */
export interface PublicProduct {
  id: string;
  productCode: string;
  sku: string;
  slug: string;
  name: string;
  description: string | null;
  categoryId: string | null;
  categoryName?: string | null;
  categorySlug?: string | null;
  subcategoryId: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  isUniqueItem: boolean;
  hasVariants: boolean;
  sellingPricePaise: number;
  mrpPaise: number | null;
  discountPercent: number;
  taxRateBps: number;
  hsnCode: string | null;
  tags: string[];
  size: string | null;
  colour: string | null;
  material: string | null;
  weightGrams: number | null;
  dimensions: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  images: ProductImage[];
  variants: PublicProductVariant[];
  availableQty: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProduct extends PublicProduct {
  purchaseCostPaise: number | null;
  externalBarcode: string | null;
  supplier: string | null;
  storageLocation: string | null;
  lowStockThreshold: number | null;
  onHandQty: number;
  reservedQty: number;
  damagedQty: number;
  incomingQty: number;
  variants: AdminProductVariant[];
}

export interface InventoryItemView {
  inventoryId: string;
  productId: string;
  variantId: string | null;
  productCode: string;
  sku: string;
  productName: string;
  variantTitle: string | null;
  categoryName: string | null;
  primaryImageUrl: string | null;
  status: ProductStatus;
  sellingPricePaise: number;
  purchaseCostPaise: number | null;
  onHandQty: number;
  reservedQty: number;
  availableQty: number;
  damagedQty: number;
  incomingQty: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
  updatedAt: string;
}

export interface InventoryMovementRecord {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  variantId: string | null;
  variantTitle: string | null;
  transactionType: InventoryTransactionType;
  quantityDelta: number;
  previousOnHand: number;
  updatedOnHand: number;
  previousReserved: number;
  updatedReserved: number;
  reason: string | null;
  referenceType: string | null;
  referenceId: string | null;
  staffName: string | null;
  createdAt: string;
}

export interface IndianAddress {
  fullName: string;
  phone: string;
  email?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pinCode: string;
}

export interface CartItemView {
  id: string;
  productId: string;
  variantId: string | null;
  productName: string;
  variantTitle: string | null;
  slug: string;
  sku: string;
  imageUrl: string | null;
  unitPricePaise: number;
  mrpPaise: number | null;
  quantity: number;
  availableQty: number;
  lineTotalPaise: number;
}

export interface CartView {
  id: string;
  items: CartItemView[];
  couponCode: string | null;
  subtotalPaise: number;
  discountPaise: number;
  shippingPaise: number;
  taxPaise: number;
  totalPaise: number;
  itemCount: number;
}

export interface ShippingQuote {
  serviceable: boolean;
  codAllowed: boolean;
  localPickupEnabled: boolean;
  shippingPaise: number;
  ruleName: string | null;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  reason?: string;
}

export interface OrderItemSnapshot {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  productNameSnapshot: string;
  variantTitleSnapshot: string | null;
  productCodeSnapshot: string;
  skuSnapshot: string;
  imageUrlSnapshot: string | null;
  unitPricePaise: number;
  quantity: number;
  discountPaise: number;
  taxPaise: number;
  lineTotalPaise: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerId: string | null;
  profileId: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotalPaise: number;
  discountPaise: number;
  taxPaise: number;
  shippingPaise: number;
  totalPaise: number;
  couponCode: string | null;
  shippingAddress: IndianAddress;
  courierName: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  internalNotes: string | null;
  stockDeducted: boolean;
  placedAt: string;
  confirmedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  items: OrderItemSnapshot[];
}

export interface OfflineSaleRecord {
  id: string;
  receiptNumber: string;
  channel: "physical_shop" | "whatsapp" | "exhibition" | "other";
  customerName: string | null;
  customerPhone: string | null;
  paymentMethod: "cash" | "upi" | "card" | "bank_transfer" | "other";
  subtotalPaise: number;
  discountPaise: number;
  totalPaise: number;
  notes: string | null;
  staffName: string | null;
  soldAt: string;
  items: Array<{
    id: string;
    productId: string;
    variantId: string | null;
    productNameSnapshot: string;
    skuSnapshot: string;
    quantity: number;
    unitPricePaise: number;
    lineTotalPaise: number;
  }>;
}

export interface CouponRecord {
  id: string;
  code: string;
  description: string | null;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderPaise: number;
  maxDiscountPaise: number | null;
  usageLimit: number | null;
  usedCount: number;
  perCustomerLimit: number | null;
  applicableProductIds: string[];
  applicableCategoryIds: string[];
  startsAt: string | null;
  endsAt: string | null;
  isActive: boolean;
}
