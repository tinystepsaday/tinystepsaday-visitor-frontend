import { PricingTier } from "@/components/pricing/PricingCard";

export const getPricingTiers = async (): Promise<PricingTier[]> => {
  // In a real app, this would fetch from an API
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
};

export const getTierByName = async (tierName: string): Promise<PricingTier | null> => {
  const tiers = await getPricingTiers();
  return tiers.find(tier => 
    tier.name.toLowerCase() === tierName.toLowerCase() || 
    tier.name.toLowerCase() === tierName.toLowerCase().replace(/\s+/g, '')
  ) || null;
}; 