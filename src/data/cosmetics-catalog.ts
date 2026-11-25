import { computeDiscountPercent } from "@/lib/utils";
import type { Category, Collection, PublicProduct } from "@/types/domain";

export interface StorePublicSettings {
  announcementBar: {
    enabled: boolean;
    text: string;
    link_url: string;
    link_label: string;
  };
  brandIdentity: {
    brand_name: string;
    tagline: string;
    hindi_subtitle: string;
    logo_url: string;
    favicon_url: string;
  };
  contactInfo: {
    whatsapp_number: string;
    support_email: string;
    support_phone: string;
    store_address: string;
    business_hours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  seoDefaults: {
    site_title: string;
    meta_description: string;
  };
}

export const COSMETIC_SETTINGS: StorePublicSettings = {
  announcementBar: {
    enabled: true,
    text: "Festive Braj Glow Edit — Complimentary Pan-India Shipping Above ₹1,499",
    link_url: "/shop",
    link_label: "Shop Botanicals",
  },
  brandIdentity: {
    brand_name: "Brijblash",
    tagline: "Pure Botanical Cosmetics & Sacred Skincare from Braj",
    hindi_subtitle: "ब्रजबिलास — सौंदर्य, शुद्धता और परंपरा",
    logo_url: "",
    favicon_url: "",
  },
  contactInfo: {
    whatsapp_number: "919876543210",
    support_email: "care@brijblash.com",
    support_phone: "+91 98765 43210",
    store_address: "Vrindavan & Mathura Heritage Studio, Uttar Pradesh",
    business_hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
  },
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "",
    youtube: "",
  },
  seoDefaults: {
    site_title: "Brijblash | Botanical Cosmetics & Heritage Skincare",
    meta_description:
      "Small-batch Ayurvedic & botanical cosmetics inspired by Braj heritage — Kumkumadi elixirs, rose mists, kohl kajal, and hibiscus lip tints.",
  },
};

const NOW = "2026-11-25T10:00:00.000Z";

export const COSMETIC_CATEGORIES: Category[] = [
  {
    id: "cat-face-serums",
    name: "Face & Serums",
    slug: "face-serums",
    description: "Kumkumadi elixirs, saffron glow creams, and floral hydrating mists.",
    imageUrl: "/images/cosmetics/kumkumadi-serum.jpg",
    parentId: null,
    displayOrder: 1,
    isVisible: true,
    seoTitle: "Face & Serums | Brijblash",
    seoDescription: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "cat-lips-cheeks",
    name: "Lips & Cheeks",
    slug: "lips-cheeks",
    description: "Botanical hibiscus & ghee tints for effortless, buildable colour.",
    imageUrl: "/images/cosmetics/lip-kajal.jpg",
    parentId: null,
    displayOrder: 2,
    isVisible: true,
    seoTitle: "Lips & Cheeks | Brijblash",
    seoDescription: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "cat-eyes-kajal",
    name: "Eyes & Kajal",
    slug: "eyes-kajal",
    description: "Smudge-resistant almond oil and herbal charcoal kohl formulations.",
    imageUrl: "/images/cosmetics/lip-kajal.jpg",
    parentId: null,
    displayOrder: 3,
    isVisible: true,
    seoTitle: "Eyes & Kajal | Brijblash",
    seoDescription: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "cat-bath-body",
    name: "Bath & Body Rituals",
    slug: "bath-body-rituals",
    description: "Clarifying ubtan clay masks, neem cleansers, and kokum body butters.",
    imageUrl: "/images/cosmetics/ubtan-mask.jpg",
    parentId: null,
    displayOrder: 4,
    isVisible: true,
    seoTitle: "Bath & Body Rituals | Brijblash",
    seoDescription: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export const COSMETIC_COLLECTIONS: Collection[] = [
  {
    id: "col-festive-glow",
    title: "Braj Festive Glow Edit",
    slug: "braj-festive-glow-edit",
    description:
      "Radiance-boosting saffron, rose, and botanical tint essentials for luminous festive mornings.",
    bannerImageUrl: "/images/cosmetics/hero-cosmetics.jpg",
    collectionType: "festival",
    isPublished: true,
    displayOrder: 1,
    startsAt: null,
    endsAt: null,
    seoTitle: "Braj Festive Glow Edit | Brijblash",
    seoDescription: null,
  },
  {
    id: "col-daily-rituals",
    title: "Daily Botanical Rituals",
    slug: "daily-botanical-rituals",
    description:
      "Gentle cleansing, toning, and moisturizing essentials for everyday skin balance.",
    bannerImageUrl: "/images/cosmetics/kesar-cream.jpg",
    collectionType: "featured",
    isPublished: true,
    displayOrder: 2,
    startsAt: null,
    endsAt: null,
    seoTitle: "Daily Botanical Rituals | Brijblash",
    seoDescription: null,
  },
];

function makeProduct(input: {
  id: string;
  code: string;
  slug: string;
  name: string;
  categorySlug: string;
  sellingPricePaise: number;
  mrpPaise: number;
  availableQty: number;
  isFeatured?: boolean;
  size: string;
  colour: string;
  material: string;
  description: string;
  imageUrl: string;
  tags: string[];
  variants?: Array<{ id: string; title: string; colour: string; availableQty: number }>;
}): PublicProduct {
  const cat = COSMETIC_CATEGORIES.find((c) => c.slug === input.categorySlug)!;
  const variants = (input.variants ?? []).map((v, idx) => ({
    id: v.id,
    productId: input.id,
    sku: `${input.code}-V${idx + 1}`,
    variantCode: `${input.code}-V${idx + 1}`,
    title: v.title,
    size: input.size,
    colour: v.colour,
    material: input.material,
    attributes: { shade: v.title },
    sellingPricePaise: null,
    mrpPaise: null,
    isActive: true,
    availableQty: v.availableQty,
  }));

  const totalQty = variants.length
    ? variants.reduce((s, v) => s + v.availableQty, 0)
    : input.availableQty;

  return {
    id: input.id,
    productCode: input.code,
    sku: input.code,
    slug: input.slug,
    name: input.name,
    description: input.description,
    categoryId: cat.id,
    categoryName: cat.name,
    categorySlug: cat.slug,
    subcategoryId: null,
    status: "active",
    isFeatured: Boolean(input.isFeatured),
    isUniqueItem: false,
    hasVariants: variants.length > 0,
    sellingPricePaise: input.sellingPricePaise,
    mrpPaise: input.mrpPaise,
    discountPercent: computeDiscountPercent(input.sellingPricePaise, input.mrpPaise),
    taxRateBps: 0,
    hsnCode: null,
    tags: input.tags,
    size: input.size,
    colour: input.colour,
    material: input.material,
    weightGrams: null,
    dimensions: null,
    seoTitle: `${input.name} | Brijblash Cosmetics`,
    seoDescription: input.description,
    images: [
      {
        id: `img-${input.id}`,
        productId: input.id,
        storagePath: input.imageUrl,
        url: input.imageUrl,
        thumbnailUrl: input.imageUrl,
        altText: input.name,
        sortOrder: 0,
        isPrimary: true,
      },
    ],
    variants,
    availableQty: totalQty,
    inStock: totalQty > 0,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export const COSMETIC_PRODUCTS: PublicProduct[] = [
  makeProduct({
    id: "prod-kumkumadi",
    code: "BRJ-000001",
    slug: "kumkumadi-saffron-radiance-elixir-brj-000001",
    name: "Kumkumadi Saffron Radiance Elixir",
    categorySlug: "face-serums",
    sellingPricePaise: 129000,
    mrpPaise: 155000,
    availableQty: 24,
    isFeatured: true,
    size: "30 ml",
    colour: "Golden Amber",
    material: "Kashmir Saffron, Red Sandalwood, Sesame & Lotus Oil",
    description:
      "A lightweight night facial oil infused with pure Kashmir saffron stigmas, vetiver, and manjistha to visibly brighten dull skin and soften fine texture.",
    imageUrl: "/images/cosmetics/kumkumadi-serum.jpg",
    tags: ["serum", "saffron", "radiance", "night-ritual"],
  }),
  makeProduct({
    id: "prod-rose-mist",
    code: "BRJ-000002",
    slug: "vrindavan-rose-vetiver-facial-mist-brj-000002",
    name: "Vrindavan Rose & Vetiver Facial Mist",
    categorySlug: "face-serums",
    sellingPricePaise: 54000,
    mrpPaise: 65000,
    availableQty: 35,
    isFeatured: true,
    size: "100 ml",
    colour: "Clear Botanical Distillate",
    material: "Steam-Distilled Damask Rose & Khus Vetiver",
    description:
      "Alcohol-free hydrosol mist that cools, tones, and refreshes skin before serums or over makeup throughout the day.",
    imageUrl: "/images/cosmetics/rose-mist.jpg",
    tags: ["mist", "toner", "rosewater", "hydrating"],
  }),
  makeProduct({
    id: "prod-hibiscus-tint",
    code: "BRJ-000003",
    slug: "hibiscus-ghee-velvet-lip-cheek-tint-brj-000003",
    name: "Hibiscus & Ghee Velvet Lip & Cheek Tint",
    categorySlug: "lips-cheeks",
    sellingPricePaise: 68000,
    mrpPaise: 79000,
    availableQty: 36,
    isFeatured: true,
    size: "10 g",
    colour: "Multi-Shade",
    material: "Hibiscus Extract, Clarified Butter, Kokum & Beeswax",
    description:
      "Whipped botanical tint delivering a soft satin flush for lips and cheeks while deeply nourishing dry skin.",
    imageUrl: "/images/cosmetics/lip-kajal.jpg",
    tags: ["lip-tint", "cheek-tint", "hibiscus"],
    variants: [
      { id: "var-rose-petal", title: "Rose Petal", colour: "Soft Rose", availableQty: 14 },
      { id: "var-sindoor", title: "Sindoor Crimson", colour: "Warm Red", availableQty: 10 },
      { id: "var-terracotta", title: "Terracotta Nude", colour: "Spiced Nude", availableQty: 12 },
    ],
  }),
  makeProduct({
    id: "prod-kohl-kajal",
    code: "BRJ-000004",
    slug: "almond-herbal-charcoal-kohl-kajal-brj-000004",
    name: "Almond & Herbal Charcoal Kohl Kajal",
    categorySlug: "eyes-kajal",
    sellingPricePaise: 45000,
    mrpPaise: 52500,
    availableQty: 28,
    isFeatured: true,
    size: "3 g",
    colour: "Deep Obsidian Black",
    material: "Sweet Almond Oil, Camphor, Triphala & Castor Butter",
    description:
      "Creamy single-stroke kajal crafted with soothing almond oil and cooling camphor for comfortable all-day waterline wear.",
    imageUrl: "/images/cosmetics/lip-kajal.jpg",
    tags: ["kajal", "kohl", "eyes"],
  }),
  makeProduct({
    id: "prod-kesar-cream",
    code: "BRJ-000005",
    slug: "kesar-chandan-day-glow-cream-brj-000005",
    name: "Kesar & Chandan Day Glow Cream",
    categorySlug: "face-serums",
    sellingPricePaise: 89000,
    mrpPaise: 105000,
    availableQty: 18,
    isFeatured: false,
    size: "50 g",
    colour: "Ivory Saffron",
    material: "Mysore Sandalwood, Saffron, Shea & Licorice Root",
    description:
      "Silky non-greasy daytime moisturizer that leaves a balanced matte-satin glow and even-toned finish.",
    imageUrl: "/images/cosmetics/kesar-cream.jpg",
    tags: ["moisturizer", "cream", "sandalwood", "kesar"],
  }),
  makeProduct({
    id: "prod-ubtan-mask",
    code: "BRJ-000006",
    slug: "multani-rosewater-clarifying-ubtan-brj-000006",
    name: "Multani & Rosewater Clarifying Ubtan",
    categorySlug: "bath-body-rituals",
    sellingPricePaise: 49000,
    mrpPaise: 59000,
    availableQty: 22,
    isFeatured: false,
    size: "100 g",
    colour: "Terracotta Clay",
    material: "Fuller's Earth, Wild Turmeric, Rose Petals & Chickpea Flour",
    description:
      "Traditional weekly clarifying clay ritual that gently draws out impurities without stripping skin softness.",
    imageUrl: "/images/cosmetics/ubtan-mask.jpg",
    tags: ["ubtan", "clay-mask", "detox"],
  }),
  makeProduct({
    id: "prod-body-butter",
    code: "BRJ-000007",
    slug: "braj-jasmine-kokum-body-butter-brj-000007",
    name: "Braj Jasmine & Kokum Body Butter",
    categorySlug: "bath-body-rituals",
    sellingPricePaise: 79000,
    mrpPaise: 95000,
    availableQty: 16,
    isFeatured: false,
    size: "150 g",
    colour: "Creamy Ivory",
    material: "Unrefined Kokum Butter, Mogra Jasmine & Sweet Almond Oil",
    description:
      "Rich, fast-absorbing body butter scented delicately with night-blooming Braj jasmine for velvety post-bath hydration.",
    imageUrl: "/images/cosmetics/kesar-cream.jpg",
    tags: ["body-butter", "jasmine", "moisturizing"],
  }),
  makeProduct({
    id: "prod-neem-cleanser",
    code: "BRJ-000008",
    slug: "neem-tulsi-gentle-gel-cleanser-brj-000008",
    name: "Neem & Tulsi Gentle Gel Cleanser",
    categorySlug: "bath-body-rituals",
    sellingPricePaise: 42000,
    mrpPaise: 49500,
    availableQty: 30,
    isFeatured: false,
    size: "120 ml",
    colour: "Translucent Emerald",
    material: "Holy Basil (Tulsi), Neem Leaf Extract & Aloe Vera",
    description:
      "Sulphate-free pH-balanced daily gel cleanser that purifies pores while keeping skin calm and hydrated.",
    imageUrl: "/images/cosmetics/rose-mist.jpg",
    tags: ["cleanser", "face-wash", "tulsi", "neem"],
  }),
];

export const COSMETIC_HERO_SECTION = {
  title: "Sacred Botanicals, Modern Radiance",
  subtitle:
    "Small-batch saffron elixirs, damask rose mists, artisanal kohl, and plant-butter lip tints inspired by the timeless rituals of Braj.",
  content: {
    badge: "Brijblash Botanicals • Clean Indian Beauty",
    cta_primary_label: "Shop Cosmetics",
    cta_primary_href: "/shop",
    cta_secondary_label: "Explore Rituals",
    cta_secondary_href: "/collections",
    banner_image_url: "/images/cosmetics/hero-cosmetics.jpg",
  },
};

export const COSMETIC_STORY_SECTION = {
  title: "Rooted in Braj Botanicals, Formulated for Today",
  subtitle:
    "Every Brijblash formulation blends time-honoured Indian skincare wisdom with clean, transparent modern beauty standards.",
  content: {
    pillars: [
      {
        title: "Saffron, Rose & Botanical Oils",
        description:
          "Cold-pressed oils, Kashmir saffron, Kannauj rose distillate, and sandalwood — crafted without parabens or mineral oils.",
      },
      {
        title: "Small-Batch Freshness",
        description:
          "Prepared in curated micro-batches so every serum, cream, and ubtan reaches you at peak botanical potency.",
      },
      {
        title: "Mindful Glass & Brass Packaging",
        description:
          "Recyclable amber glass, frosted jars, and protective travel-safe boxes designed for your dressing table.",
      },
    ],
  },
};

export const COSMETIC_CONTENT_PAGES: Record<string, { title: string; body: string }> = {
  about: {
    title: "About Brijblash Cosmetics",
    body: `# About Brijblash

Brijblash is an Indian heritage botanical cosmetics house inspired by the natural rituals of Braj and Vrindavan.

We craft small-batch facial elixirs, floral hydrosol mists, herbal kohl kajals, and nourishing kokum body butters using time-honoured botanicals — Kashmir saffron, Kannauj damask rose, wild turmeric, and cold-pressed sweet almond oil.

Every formula is free from parabens, sulphates, and mineral oils, designed for luminous everyday skin and mindful self-care.`,
  },
  contact: {
    title: "Contact Brijblash",
    body: `# Contact Our Beauty Desk

We are happy to assist you with skin ritual recommendations, shade matching, bridal trousseau boxes, or order enquiries.`,
  },
  faq: {
    title: "Frequently Asked Questions",
    body: `# Frequently Asked Questions

### Are Brijblash cosmetics free from parabens and sulphates?
Yes. Every Brijblash formulation is crafted without parabens, SLS/SLES, mineral oil, or harsh synthetic bleaching agents.

### How should I store the Kumkumadi Elixir and Rose Mist?
Store away from direct sunlight in a cool, dry place. Amber glass bottles protect delicate botanical actives from light exposure.

### Can I try promo codes during checkout?
Yes! Use code **BRAJ10** in your cart for 10% off orders above ₹500.`,
  },
  "shipping-policy": {
    title: "Shipping Policy",
    body: `# Shipping Policy

Orders are dispatched within 24–48 business hours in protective recyclable packaging.

- **Complimentary Shipping**: Automatically applied on all orders of ₹1,499 and above.
- **Standard Pan-India Delivery**: Flat ₹79 shipping on orders below ₹1,499 (4–7 business days).`,
  },
  "return-policy": {
    title: "Return & Exchange Policy",
    body: `# Return & Exchange Policy

For hygiene and safety of personal care formulations, opened or used cosmetics cannot be returned unless received damaged or defective.

If your glass bottle or jar arrives damaged in transit, reach out within 48 hours of delivery with photos for an immediate replacement.`,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: `# Privacy Policy

Brijblash respects your privacy and uses your contact details solely to coordinate deliveries and skincare support.`,
  },
  terms: {
    title: "Terms & Conditions",
    body: `# Terms & Conditions

All Brijblash botanical products are intended for external cosmetic use only. We recommend performing a patch test before trying new active botanical oils.`,
  },
};

export function getProductsForCollection(slug: string): PublicProduct[] {
  if (slug === "braj-festive-glow-edit") return COSMETIC_PRODUCTS.slice(0, 4);
  if (slug === "daily-botanical-rituals") return COSMETIC_PRODUCTS.slice(4, 8);
  return COSMETIC_PRODUCTS;
}
