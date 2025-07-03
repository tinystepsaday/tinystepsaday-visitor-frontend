import { Metadata } from "next";
import { PricingTier } from "@/components/pricing/PricingCard";
import PricingCard from "@/components/pricing/PricingCard";
import BillingCycleTabsWrapper from "./BillingCycleTabsWrapper";
import { PRICING_CYCLES, type BillingCycle } from "./constants";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Transformation Plan",
  description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
  openGraph: {
    title: "Pricing - Choose Your Transformation Plan",
    description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
    url: "/pricing",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
  // Placeholder for API/CMS fetch
  return [
    {
      name: "Free",
      price: 0,
      description: "Get started with essential features and resources.",
      billingOptions: {
        monthly: 0,
        yearly: 0,
        threeYear: 0,
      },
      buttonText: "Sign Up Free",
      features: [
        { name: "5 blog posts per month", included: true },
        { name: "Basic course access", included: true },
        { name: "Limited streak tracking", included: true },
        { name: "Community forum access", included: true },
        { name: "Email support", included: true },
        { name: "Mentorship sessions", included: false },
        { name: "Personalized assessment", included: false },
        { name: "Growth plan", included: false },
        { name: "Priority support", included: false },
        { name: "VIP resources & workshops", included: false },
      ],
    },
    {
      name: "Starter",
      price: 19.99,
      description: "Perfect for individuals starting their journey.",
      billingOptions: {
        monthly: 19.99,
        yearly: 199.90,
        threeYear: 539.73,
      },
      buttonText: "Get Started",
      features: [
        { name: "15 blog posts per month", included: true },
        { name: "Full course access", included: true },
        { name: "Complete streak tracking", included: true },
        { name: "Community membership", included: true },
        { name: "Email & chat support", included: true },
        { name: "2 Mentorship sessions", included: true, details: "Per quarter" },
        { name: "Basic assessment", included: true },
        { name: "Starter growth plan", included: true },
        { name: "Priority support", included: false },
        { name: "VIP resources & workshops", included: false },
      ],
    },
    {
      name: "Transformation",
      price: 49.99,
      description: "Enhanced support for your transformational journey.",
      billingOptions: {
        monthly: 49.99,
        yearly: 479.90,
        threeYear: 1259.73,
      },
      buttonText: "Transform Now",
      highlight: true,
      recommended: true,
      features: [
        { name: "Unlimited blog posts", included: true },
        { name: "Premium course access", included: true, details: "Including instructor feedback" },
        { name: "Advanced streak features", included: true },
        { name: "Community leadership access", included: true },
        { name: "Priority support", included: true },
        { name: "4 Mentorship sessions", included: true, details: "Per quarter" },
        { name: "Comprehensive assessment", included: true },
        { name: "Customized growth plan", included: true },
        { name: "Event ticket discounts", included: true, details: "25% off" },
        { name: "101 sessions with facilitators", included: true, details: "Quarterly" },
      ],
    },
    {
      name: "Complete",
      price: 99.99,
      description: "The ultimate experience for complete transformation.",
      billingOptions: {
        monthly: 99.99,
        yearly: 959.90,
        threeYear: 2519.73,
      },
      buttonText: "Get Complete Access",
      features: [
        { name: "Unlimited blog posts", included: true },
        { name: "VIP course access", included: true, details: "With personalized 1-on-1 tutoring" },
        { name: "All streak features", included: true, details: "With retrospective analysis" },
        { name: "VIP community status", included: true },
        { name: "24/7 premium support", included: true },
        { name: "Unlimited mentorship sessions", included: true },
        { name: "In-depth assessments", included: true, details: "With progress tracking" },
        { name: "Transformational roadmap", included: true, details: "With quarterly reviews" },
        { name: "Free event tickets", included: true, details: "4 per year" },
        { name: "Emergency sessions", included: true, details: "Available on-demand" },
      ],
    },
  ];
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