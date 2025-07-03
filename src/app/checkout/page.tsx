import { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout - TinyStepsADay",
  description: "Complete your purchase securely. Choose from our range of mindfulness products, courses, and subscription plans.",
  keywords: ["checkout", "payment", "secure checkout", "mindfulness products", "courses", "subscription"],
  openGraph: {
    title: "Checkout - TinyStepsADay",
    description: "Complete your purchase securely. Choose from our range of mindfulness products, courses, and subscription plans.",
    type: "website",
    url: "https://tinystepsaday.com/checkout",
    images: [
      {
        url: "https://tinystepsaday.com/og-checkout.jpg",
        width: 1200,
        height: 630,
        alt: "TinyStepsADay Checkout"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout - TinyStepsADay",
    description: "Complete your purchase securely. Choose from our range of mindfulness products, courses, and subscription plans.",
    images: ["https://tinystepsaday.com/og-checkout.jpg"]
  }
};

export default function CheckoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    "name": "TinyStepsADay Checkout",
    "description": "Secure checkout page for mindfulness products, courses, and subscription plans",
    "url": "https://tinystepsaday.com/checkout",
    "provider": {
      "@type": "Organization",
      "name": "TinyStepsADay",
      "url": "https://tinystepsaday.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto py-8 px-4 md:mt-16">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold mb-8">
            Complete Your Purchase
          </h1>
          
          <CheckoutForm />
        </div>
      </div>
    </>
  );
}
