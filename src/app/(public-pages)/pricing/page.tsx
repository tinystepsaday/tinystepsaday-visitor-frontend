import { Metadata } from "next";
import { PricingTier } from "@/components/pricing/PricingCard";
import PricingCard from "@/components/pricing/PricingCard";
import BillingCycleTabsWrapper from "./BillingCycleTabsWrapper";
import { PRICING_CYCLES, type BillingCycle } from "./constants";
import { SectionHeader } from "@/components/ui/section-header";
import { getPricingTiers } from "@/data/pricing";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Transformation Plan",
  description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
  keywords: [
    "pricing",
    "choose your transformation plan",
    "tiny steps a day",
    "tinystepsaday",
    "tinystepsaday.com",
  ],
  openGraph: {
    title: "Pricing - Choose Your Transformation Plan",
    description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
    url: "/pricing",
    type: "website",
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Pricing - Choose Your Transformation Plan",
    description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
    images: [sharedMetadata.twitter.images[0]],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/pricing",
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

export const revalidate = 3600; // Revalidate every hour (ISR)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tiny Steps A Day",
  "url": "https://www.tinystepsaday.com",
  "description": "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
  "image": "https://www.tinystepsaday.com/banner-image.jpg",
  "sameAs": [
    "https://x.com/tiny_steps_aday",
    "https://www.instagram.com/tiny_steps_aday/",
    "https://www.facebook.com/tiny_steps_aday/",
    "https://www.youtube.com/@tiny_steps_aday/",
  ],
  "author": {
    "@type": "Person",
    "name": "Tiny Steps A Day",
    "url": "https://www.tinystepsaday.com",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tiny Steps A Day",
    "url": "https://www.tinystepsaday.com",
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Tiny Steps A Day",
    "url": "https://www.tinystepsaday.com",
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "url": "https://www.tinystepsaday.com/pricing",
  },
}

async function fetchPricingTiers(): Promise<PricingTier[]> {
  return await getPricingTiers();
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ billingCycle?: string }>;
}) {
  const params = await searchParams;
  const billingCycleRaw = params.billingCycle;
  const billingCycle: BillingCycle = PRICING_CYCLES.includes(billingCycleRaw as BillingCycle)
    ? (billingCycleRaw as BillingCycle)
    : "monthly";

  const pricingTiers = await fetchPricingTiers();

  return (
    <div className="container py-16 w-full flex flex-col items-center justify-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center justify-center">
        <SectionHeader
          title="Choose Your Path"
          subtitle="Select the plan that best matches your needs and transformational goals."
          centered={true}
        />
        <BillingCycleTabsWrapper billingCycle={billingCycle} />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full max-w-8xl px-6 md:px-2 lg:px-0 max-w-7xl">
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            billingCycle={billingCycle}
          />
        ))}
      </div>

      <div className="mt-16 max-w-2xl mx-auto text-center px-6 md:px-2 lg:px-0">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="text-left space-y-6 mt-8">
          <div>
            <h3 className="font-medium mb-2">Can I change my plan later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do the mentorship sessions work?</h3>
            <p className="text-muted-foreground">
              Mentorship sessions are conducted via video call with our certified coaches and trainers. You&apos;ll be able to schedule them through your dashboard.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a refund policy?</h3>
            <p className="text-muted-foreground">
              We offer a 14-day money-back guarantee for all paid plans. If you&apos;re not satisfied, contact our support team for a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}