import { useMemo } from 'react';
import { checkUserAccess, getUserFeatureLimit, type AccessControl } from '@/data/pricing';

export interface UserAccessInfo {
  canAccessCourses: boolean;
  canAccessBlogPosts: boolean;
  canAccessStreaks: boolean;
  canAccessCommunity: boolean;
  canAccessSupport: boolean;
  canAccessMentorship: boolean;
  canAccessAssessments: boolean;
  canAccessEvents: boolean;
  canAccessGrowthPlan: boolean;
  
  // Feature limits
  courseLimit: number | null;
  blogPostLimit: number | null;
  mentorshipLimit: number | null;
  eventTickets: number;
  
  // Specific permissions
  canCreateEvents: boolean;
  canModerateCommunity: boolean;
  hasPriorityPublishing: boolean;
  hasInstructorFeedback: boolean;
  hasPersonalizedTutoring: boolean;
  hasEmergencySessions: boolean;
  hasProgressTracking: boolean;
  hasQuarterlyReviews: boolean;
  
  // Support details
  supportLevel: string;
  responseTime: string | undefined;
  
  // Event benefits
  eventDiscount: number;
  hasPriorityBooking: boolean;
}

export function usePricingAccess(userTier: string): UserAccessInfo {
  return useMemo(() => {
    // In a real app, you would fetch the user's tier access control from the database
    // For now, we'll use the utility functions from the pricing data
    
    return {
      // Basic access checks
      canAccessCourses: checkUserAccess(userTier, 'courses'),
      canAccessBlogPosts: checkUserAccess(userTier, 'blogPosts'),
      canAccessStreaks: checkUserAccess(userTier, 'streaks'),
      canAccessCommunity: checkUserAccess(userTier, 'community'),
      canAccessSupport: checkUserAccess(userTier, 'support'),
      canAccessMentorship: checkUserAccess(userTier, 'mentorship'),
      canAccessAssessments: checkUserAccess(userTier, 'assessments'),
      canAccessEvents: checkUserAccess(userTier, 'events'),
      canAccessGrowthPlan: checkUserAccess(userTier, 'growthPlan'),
      
      // Feature limits
      courseLimit: getUserFeatureLimit(userTier, 'courses'),
      blogPostLimit: getUserFeatureLimit(userTier, 'blogPosts'),
      mentorshipLimit: getUserFeatureLimit(userTier, 'mentorship'),
      eventTickets: getUserFeatureLimit(userTier, 'events') || 0,
      
      // Specific permissions (these would be determined by the access control)
      canCreateEvents: false, // Would be set based on community access level
      canModerateCommunity: false, // Would be set based on community access level
      hasPriorityPublishing: false, // Would be set based on blog posts access
      hasInstructorFeedback: false, // Would be set based on courses access
      hasPersonalizedTutoring: false, // Would be set based on courses access
      hasEmergencySessions: false, // Would be set based on mentorship access
      hasProgressTracking: false, // Would be set based on assessments access
      hasQuarterlyReviews: false, // Would be set based on growth plan access
      
      // Support details
      supportLevel: 'none',
      responseTime: undefined,
      
      // Event benefits
      eventDiscount: 0,
      hasPriorityBooking: false,
    };
  }, [userTier]);
}

export function useFeatureAccess(userTier: string, feature: keyof AccessControl): boolean {
  return useMemo(() => {
    return checkUserAccess(userTier, feature);
  }, [userTier, feature]);
}

export function useFeatureLimit(userTier: string, feature: keyof AccessControl): number | null {
  return useMemo(() => {
    return getUserFeatureLimit(userTier, feature);
  }, [userTier, feature]);
}

export function useTierComparison(tier1: string, tier2: string) {
  const access1 = usePricingAccess(tier1);
  const access2 = usePricingAccess(tier2);
  
  return useMemo(() => {
    
    const differences = {
      courses: access1.canAccessCourses !== access2.canAccessCourses,
      blogPosts: access1.canAccessBlogPosts !== access2.canAccessBlogPosts,
      streaks: access1.canAccessStreaks !== access2.canAccessStreaks,
      community: access1.canAccessCommunity !== access2.canAccessCommunity,
      support: access1.canAccessSupport !== access2.canAccessSupport,
      mentorship: access1.canAccessMentorship !== access2.canAccessMentorship,
      assessments: access1.canAccessAssessments !== access2.canAccessAssessments,
      events: access1.canAccessEvents !== access2.canAccessEvents,
      growthPlan: access1.canAccessGrowthPlan !== access2.canAccessGrowthPlan,
    };
    
    return {
      differences,
      hasDifferences: Object.values(differences).some(Boolean),
      tier1Access: access1,
      tier2Access: access2,
    };
  }, [access1, access2]);
}

export function useUpgradeRecommendations(currentTier: string, targetTier: string) {
  const comparison = useTierComparison(currentTier, targetTier);
  
  return useMemo(() => {
    
    if (!comparison.hasDifferences) {
      return [];
    }
    
    const recommendations = [];
    
    if (comparison.differences.courses) {
      recommendations.push({
        feature: 'Course Access',
        current: comparison.tier1Access.canAccessCourses ? 'Available' : 'Not Available',
        target: comparison.tier2Access.canAccessCourses ? 'Available' : 'Not Available',
        benefit: 'Access to premium courses with instructor feedback',
      });
    }
    
    if (comparison.differences.blogPosts) {
      recommendations.push({
        feature: 'Blog Posts',
        current: comparison.tier1Access.blogPostLimit ? `${comparison.tier1Access.blogPostLimit} per month` : 'Unlimited',
        target: comparison.tier2Access.blogPostLimit ? `${comparison.tier2Access.blogPostLimit} per month` : 'Unlimited',
        benefit: 'More content creation opportunities',
      });
    }
    
    if (comparison.differences.mentorship) {
      recommendations.push({
        feature: 'Mentorship',
        current: comparison.tier1Access.mentorshipLimit ? `${comparison.tier1Access.mentorshipLimit} sessions/quarter` : 'Unlimited',
        target: comparison.tier2Access.mentorshipLimit ? `${comparison.tier2Access.mentorshipLimit} sessions/quarter` : 'Unlimited',
        benefit: 'More personalized guidance and support',
      });
    }
    
    if (comparison.differences.support) {
      recommendations.push({
        feature: 'Support',
        current: comparison.tier1Access.supportLevel,
        target: comparison.tier2Access.supportLevel,
        benefit: 'Better and faster support response',
      });
    }
    
    if (comparison.differences.events) {
      recommendations.push({
        feature: 'Event Benefits',
        current: `${comparison.tier1Access.eventDiscount}% discount`,
        target: `${comparison.tier2Access.eventDiscount}% discount`,
        benefit: 'Better event access and discounts',
      });
    }
    
    return recommendations;
  }, [comparison]);
}

export function useAccessRestriction(userTier: string, requiredFeature: keyof AccessControl) {
  return useMemo(() => {
    const hasAccess = checkUserAccess(userTier, requiredFeature);
    const limit = getUserFeatureLimit(userTier, requiredFeature);
    
    return {
      hasAccess,
      limit,
      isUnlimited: limit === null,
      isRestricted: !hasAccess,
      needsUpgrade: !hasAccess,
    };
  }, [userTier, requiredFeature]);
} 