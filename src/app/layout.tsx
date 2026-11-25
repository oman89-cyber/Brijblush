import type { Metadata } from "next";
import { Playfair_Display, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "@/styles/globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { CartProvider } from "@/hooks/use-cart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://brijblash.netlify.app"),
  title: {
    default: "Brijblash | Botanical Cosmetics & Heritage Skincare",
    template: "%s | Brijblash",
  },
  description:
    "Small-batch Ayurvedic & botanical cosmetics inspired by Braj heritage — Kumkumadi elixirs, rose mists, kohl kajal, and hibiscus lip tints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${devanagari.variable}`}
    >
      <body className="min-h-screen bg-[#F8F1E3] text-[#211D19] antialiased">
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
