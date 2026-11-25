export const BRAND_COLORS = {
  warmIvory: "#F8F1E3",
  peacockGreen: "#173F35",
  pitambarYellow: "#E9B949",
  krishnaBlue: "#263D73",
  deepInk: "#211D19",
  pureWhite: "#FFFFFF",
} as const;

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"] as const;

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const DEFAULT_RESERVATION_TTL_MINUTES = 15;
export const DEFAULT_LOW_STOCK_THRESHOLD = 5;

export const ORDER_STATUSES = [
  "pending_payment",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "return_requested",
  "returned",
  "needs_resolution",
] as const;

export const PAYMENT_STATUSES = [
  "pending",
  "authorized",
  "paid",
  "failed",
  "cod_pending",
  "cod_collected",
  "refund_pending",
  "partially_refunded",
  "refunded",
] as const;

export const STAFF_ROLES = ["owner", "manager", "staff"] as const;
