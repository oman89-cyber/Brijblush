import { COSMETIC_CONTENT_PAGES, COSMETIC_SETTINGS } from "@/data/cosmetics-catalog";

export function CmsPolicyView({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const page = COSMETIC_CONTENT_PAGES[slug];
  const title = page?.title ?? fallbackTitle;
  const body = page?.body ?? "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="border-b-2 border-[#211D19] pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
          {COSMETIC_SETTINGS.brandIdentity.brand_name}
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold mt-1">{title}</h1>
      </div>

      <article className="brj-surface p-6 sm:p-10 space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {body}
        {slug === "contact" && (
          <div className="mt-6 pt-6 border-t border-[#211D19]/20 space-y-1 text-sm">
            <p><strong>Email:</strong> {COSMETIC_SETTINGS.contactInfo.support_email}</p>
            <p><strong>Phone:</strong> {COSMETIC_SETTINGS.contactInfo.support_phone}</p>
            <p><strong>WhatsApp:</strong> +{COSMETIC_SETTINGS.contactInfo.whatsapp_number}</p>
            <p><strong>Studio Address:</strong> {COSMETIC_SETTINGS.contactInfo.store_address}</p>
            <p><strong>Hours:</strong> {COSMETIC_SETTINGS.contactInfo.business_hours}</p>
          </div>
        )}
      </article>
    </div>
  );
}
