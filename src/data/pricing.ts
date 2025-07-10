import { PricingTier } from "@/components/pricing/PricingCard";

// Enhanced interfaces for comprehensive pricing management
export interface PricingFeature {
  name: string;
  included: boolean;
  details?: string;
  limit?: number; // For features with limits (e.g., "5 blog posts per month")
  unlimited?: boolean; // For unlimited features
}

export interface AccessControl {
  courses: {
    access: 'none' | 'basic' | 'premium' | 'vip';
    maxCourses?: number;
    includeInstructorFeedback?: boolean;
    personalizedTutoring?: boolean;
  };
  blogPosts: {
    maxPerMonth?: number;
    unlimited?: boolean;
    priorityPublishing?: boolean;
  };
  streaks: {
    access: 'none' | 'basic' | 'advanced' | 'complete';
    retrospectiveAnalysis?: boolean;
  };
  community: {
    access: 'none' | 'member' | 'leader' | 'vip';
    canCreateEvents?: boolean;
    canModerate?: boolean;
  };
  support: {
    level: 'none' | 'email' | 'chat' | 'priority' | 'premium';
    responseTime?: string; // e.g., "24 hours", "4 hours", "1 hour"
  };
  mentorship: {
    sessionsPerQuarter?: number;
    unlimited?: boolean;
    emergencySessions?: boolean;
  };
  assessments: {
    type: 'none' | 'basic' | 'comprehensive' | 'in-depth';
    progressTracking?: boolean;
  };
  events: {
    discountPercentage?: number;
    freeTicketsPerYear?: number;
    priorityBooking?: boolean;
  };
  growthPlan: {
    type: 'none' | 'starter' | 'customized' | 'transformational';
    quarterlyReviews?: boolean;
  };
}

export interface BillingOptions {
  monthly: number;
  yearly: number;
  threeYear: number;
  setupFee?: number;
  trialDays?: number;
}

export interface PricingTierEnhanced extends PricingTier {
  id: string;
  slug: string;
  status: 'active' | 'inactive' | 'draft';
  sortOrder: number;
  accessControl: AccessControl;
  billingOptions: BillingOptions;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    popular?: boolean;
    bestValue?: boolean;
    featured?: boolean;
    customFeatures?: string[];
  };
}

// Mock data for enhanced pricing tiers
const enhancedPricingTiers: PricingTierEnhanced[] = [
  {
    id: "free-tier",
    slug: "free",
    name: "Free",
    price: 0,
    description: "Get started with essential features and resources.",
    status: "active",
    sortOrder: 1,
    billingOptions: {
      monthly: 0,
      yearly: 0,
      threeYear: 0,
      trialDays: 0,
    },
    buttonText: "Sign Up Free",
    features: [
      { name: "5 blog posts per month", included: true, limit: 5 },
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
    accessControl: {
      courses: { access: 'basic', maxCourses: 3 },
      blogPosts: { maxPerMonth: 5 },
      streaks: { access: 'basic' },
      community: { access: 'member' },
      support: { level: 'email', responseTime: '48 hours' },
      mentorship: { sessionsPerQuarter: 0 },
      assessments: { type: 'none' },
      events: { discountPercentage: 0 },
      growthPlan: { type: 'none' },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: "starter-tier",
    slug: "starter",
    name: "Starter",
    price: 19.99,
    description: "Perfect for individuals starting their journey.",
    status: "active",
    sortOrder: 2,
    billingOptions: {
      monthly: 19.99,
      yearly: 199.90,
      threeYear: 539.73,
      trialDays: 7,
    },
    buttonText: "Get Started",
    features: [
      { name: "15 blog posts per month", included: true, limit: 15 },
      { name: "Full course access", included: true },
      { name: "Complete streak tracking", included: true },
      { name: "Community membership", included: true },
      { name: "Email & chat support", included: true },
      { name: "2 Mentorship sessions", included: true, details: "Per quarter", limit: 2 },
      { name: "Basic assessment", included: true },
      { name: "Starter growth plan", included: true },
      { name: "Priority support", included: false },
      { name: "VIP resources & workshops", included: false },
    ],
    accessControl: {
      courses: { access: 'premium', maxCourses: 10, includeInstructorFeedback: true },
      blogPosts: { maxPerMonth: 15 },
      streaks: { access: 'advanced' },
      community: { access: 'member', canCreateEvents: true },
      support: { level: 'chat', responseTime: '24 hours' },
      mentorship: { sessionsPerQuarter: 2 },
      assessments: { type: 'basic' },
      events: { discountPercentage: 10 },
      growthPlan: { type: 'starter' },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: "transformation-tier",
    slug: "transformation",
    name: "Transformation",
    price: 49.99,
    description: "Enhanced support for your transformational journey.",
    status: "active",
    sortOrder: 3,
    highlight: true,
    recommended: true,
    billingOptions: {
      monthly: 49.99,
      yearly: 479.90,
      threeYear: 1259.73,
      trialDays: 14,
    },
    buttonText: "Transform Now",
    features: [
      { name: "Unlimited blog posts", included: true, unlimited: true },
      { name: "Premium course access", included: true, details: "Including instructor feedback" },
      { name: "Advanced streak features", included: true },
      { name: "Community leadership access", included: true },
      { name: "Priority support", included: true },
      { name: "4 Mentorship sessions", included: true, details: "Per quarter", limit: 4 },
      { name: "Comprehensive assessment", included: true },
      { name: "Customized growth plan", included: true },
      { name: "Event ticket discounts", included: true, details: "25% off" },
      { name: "101 sessions with facilitators", included: true, details: "Quarterly" },
    ],
    accessControl: {
      courses: { access: 'premium', maxCourses: 50, includeInstructorFeedback: true },
      blogPosts: { unlimited: true, priorityPublishing: true },
      streaks: { access: 'advanced', retrospectiveAnalysis: true },
      community: { access: 'leader', canCreateEvents: true, canModerate: true },
      support: { level: 'priority', responseTime: '4 hours' },
      mentorship: { sessionsPerQuarter: 4 },
      assessments: { type: 'comprehensive', progressTracking: true },
      events: { discountPercentage: 25, freeTicketsPerYear: 2, priorityBooking: true },
      growthPlan: { type: 'customized', quarterlyReviews: true },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    metadata: {
      popular: true,
      bestValue: true,
    },
  },
  {
    id: "complete-tier",
    slug: "complete",
    name: "Complete",
    price: 99.99,
    description: "The ultimate experience for complete transformation.",
    status: "active",
    sortOrder: 4,
    billingOptions: {
      monthly: 99.99,
      yearly: 959.90,
      threeYear: 2519.73,
      trialDays: 30,
    },
    buttonText: "Get Complete Access",
    features: [
      { name: "Unlimited blog posts", included: true, unlimited: true },
      { name: "VIP course access", included: true, details: "With personalized 1-on-1 tutoring" },
      { name: "All streak features", included: true, details: "With retrospective analysis" },
      { name: "VIP community status", included: true },
      { name: "24/7 premium support", included: true },
      { name: "Unlimited mentorship sessions", included: true, unlimited: true },
      { name: "In-depth assessments", included: true, details: "With progress tracking" },
      { name: "Transformational roadmap", included: true, details: "With quarterly reviews" },
      { name: "Free event tickets", included: true, details: "4 per year" },
      { name: "Emergency sessions", included: true, details: "Available on-demand" },
    ],
    accessControl: {
      courses: { access: 'vip', maxCourses: 999, includeInstructorFeedback: true, personalizedTutoring: true },
      blogPosts: { unlimited: true, priorityPublishing: true },
      streaks: { access: 'complete', retrospectiveAnalysis: true },
      community: { access: 'vip', canCreateEvents: true, canModerate: true },
      support: { level: 'premium', responseTime: '1 hour' },
      mentorship: { unlimited: true, emergencySessions: true },
      assessments: { type: 'in-depth', progressTracking: true },
      events: { discountPercentage: 100, freeTicketsPerYear: 4, priorityBooking: true },
      growthPlan: { type: 'transformational', quarterlyReviews: true },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    metadata: {
      featured: true,
    },
  },
];

// Utility functions for pricing management
export const getPricingTiers = async (): Promise<PricingTier[]> => {
  // Return basic pricing tiers for public display
  return enhancedPricingTiers
    .filter(tier => tier.status === 'active')
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(tier => ({
      name: tier.name,
      price: tier.price,
      description: tier.description,
      features: tier.features,
      highlight: tier.highlight,
      recommended: tier.recommended,
      billingOptions: tier.billingOptions,
      buttonText: tier.buttonText,
    }));
};

export const getEnhancedPricingTiers = async (): Promise<PricingTierEnhanced[]> => {
  return enhancedPricingTiers.sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getTierByName = async (tierName: string): Promise<PricingTier | null> => {
  const tiers = await getPricingTiers();
  return tiers.find(tier => 
    tier.name.toLowerCase() === tierName.toLowerCase() || 
    tier.name.toLowerCase() === tierName.toLowerCase().replace(/\s+/g, '')
  ) || null;
};

export const getEnhancedTierById = async (id: string): Promise<PricingTierEnhanced | null> => {
  return enhancedPricingTiers.find(tier => tier.id === id) || null;
};

export const getEnhancedTierBySlug = async (slug: string): Promise<PricingTierEnhanced | null> => {
  return enhancedPricingTiers.find(tier => tier.slug === slug) || null;
};

// Access control utilities
export const checkUserAccess = (userTier: string, feature: keyof AccessControl): boolean => {
  const tier = enhancedPricingTiers.find(t => t.slug === userTier.toLowerCase());
  if (!tier) return false;

  const accessControl = tier.accessControl;
  
  switch (feature) {
    case 'courses':
      return accessControl.courses.access !== 'none';
    case 'blogPosts':
      return accessControl.blogPosts.unlimited || (accessControl.blogPosts.maxPerMonth || 0) > 0;
    case 'streaks':
      return accessControl.streaks.access !== 'none';
    case 'community':
      return accessControl.community.access !== 'none';
    case 'support':
      return accessControl.support.level !== 'none';
    case 'mentorship':
      return accessControl.mentorship.unlimited || (accessControl.mentorship.sessionsPerQuarter || 0) > 0;
    case 'assessments':
      return accessControl.assessments.type !== 'none';
    case 'events':
      return accessControl.events.discountPercentage !== undefined;
    case 'growthPlan':
      return accessControl.growthPlan.type !== 'none';
    default:
      return false;
  }
};

export const getUserFeatureLimit = (userTier: string, feature: keyof AccessControl): number | null => {
  const tier = enhancedPricingTiers.find(t => t.slug === userTier.toLowerCase());
  if (!tier) return null;

  const accessControl = tier.accessControl;
  
  switch (feature) {
    case 'courses':
      return accessControl.courses.maxCourses || null;
    case 'blogPosts':
      return accessControl.blogPosts.unlimited ? null : (accessControl.blogPosts.maxPerMonth || 0);
    case 'mentorship':
      return accessControl.mentorship.unlimited ? null : (accessControl.mentorship.sessionsPerQuarter || 0);
    case 'events':
      return accessControl.events.freeTicketsPerYear || 0;
    default:
      return null;
  }
};

// Statistics and analytics
export const getPricingStats = () => {
  const activeTiers = enhancedPricingTiers.filter(tier => tier.status === 'active');
  const inactiveTiers = enhancedPricingTiers.filter(tier => tier.status === 'inactive');
  const draftTiers = enhancedPricingTiers.filter(tier => tier.status === 'draft');
  
  const totalRevenue = activeTiers.reduce((sum, tier) => {
    return sum + (tier.billingOptions.monthly * 12); // Annual revenue per tier
  }, 0);

  return {
    totalTiers: enhancedPricingTiers.length,
    activeTiers: activeTiers.length,
    inactiveTiers: inactiveTiers.length,
    draftTiers: draftTiers.length,
    totalRevenue: totalRevenue,
    averagePrice: activeTiers.length > 0 ? totalRevenue / activeTiers.length : 0,
  };
};

// CRUD operations (for management)
export const createPricingTier = async (tierData: Omit<PricingTierEnhanced, 'id' | 'createdAt' | 'updatedAt'>): Promise<PricingTierEnhanced> => {
  const newTier: PricingTierEnhanced = {
    ...tierData,
    id: `tier-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  enhancedPricingTiers.push(newTier);
  return newTier;
};

export const updatePricingTier = async (id: string, updates: Partial<PricingTierEnhanced>): Promise<PricingTierEnhanced | null> => {
  const index = enhancedPricingTiers.findIndex(tier => tier.id === id);
  if (index === -1) return null;
  
  enhancedPricingTiers[index] = {
    ...enhancedPricingTiers[index],
    ...updates,
    updatedAt: new Date(),
  };
  
  return enhancedPricingTiers[index];
};

export const deletePricingTier = async (id: string): Promise<boolean> => {
  const index = enhancedPricingTiers.findIndex(tier => tier.id === id);
  if (index === -1) return false;
  
  enhancedPricingTiers.splice(index, 1);
  return true;
};

export const reorderPricingTiers = async (tierIds: string[]): Promise<void> => {
  tierIds.forEach((id, index) => {
    const tier = enhancedPricingTiers.find(t => t.id === id);
    if (tier) {
      tier.sortOrder = index + 1;
      tier.updatedAt = new Date();
    }
  });
}; 