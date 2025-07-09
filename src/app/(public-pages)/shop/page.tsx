import { Suspense } from "react";
import { Metadata } from "next";
import { DetailPageLoader } from "@/components/ui/loaders";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop - TinyStepsADay",
  description: "Discover our curated collection of mindfulness tools, books, and resources to support your personal growth journey. From meditation cushions to essential oils, find everything you need for your practice.",
  keywords: ["mindfulness tools", "meditation supplies", "self-improvement books", "essential oils", "yoga guides", "meditation timer"],
  openGraph: {
    title: "Shop - TinyStepsADay",
    description: "Discover our curated collection of mindfulness tools, books, and resources to support your personal growth journey.",
    type: "website",
    url: "https://tinystepsaday.com/shop",
    images: [
      {
        url: "https://tinystepsaday.com/og-shop.jpg",
        width: 1200,
        height: 630,
        alt: "TinyStepsADay Shop"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop - TinyStepsADay",
    description: "Discover our curated collection of mindfulness tools, books, and resources to support your personal growth journey.",
    images: ["https://tinystepsaday.com/og-shop.jpg"]
  }
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
