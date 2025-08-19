import { Suspense } from "react";
import { Metadata } from "next";
import { DetailPageLoader } from "@/components/ui/loaders";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop - Transformative Products for Your Journey",
  description: "Discover carefully curated products to support your mindfulness, wellness, and personal growth journey. From meditation tools to wellness essentials.",
  alternates: {
    canonical: "https://www.tinystepsaday.com/shop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://www.tinystepsaday.com"),
};

export default function ShopPage() {
  return (
    <div className="container mx-auto py-8 px-4 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<DetailPageLoader title="Loading Shop..." subtitle="Please wait while we load our products" />}>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}
