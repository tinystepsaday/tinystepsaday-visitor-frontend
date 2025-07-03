import { ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import { getAllProducts } from "@/data/products";

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

export default async function ShopPage() {
  const products = await getAllProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "TinyStepsADay Shop",
    "description": "Curated collection of mindfulness tools, books, and resources for personal growth",
    "url": "https://tinystepsaday.com/shop",
    "telephone": "+1-555-0123",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mindfulness Products",
      "itemListElement": products.map(product => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": product.image,
          "category": product.category,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.averageRating,
            "reviewCount": product.reviewCount
          },
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto py-8 px-4 mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Shop</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
