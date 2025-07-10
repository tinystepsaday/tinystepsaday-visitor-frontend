"use client";

import { useState } from "react";
import { Lock, ArrowUpRight, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePricingAccess } from "@/hooks/usePricingAccess";
import { getPricingTiers } from "@/data/pricing";
import Link from "next/link";

interface AccessRestrictionBannerProps {
  userTier: string;
  featureName: string;
  featureDescription?: string;
  currentUsage?: number;
  limit?: number;
  showUpgradeOptions?: boolean;
  onClose?: () => void;
}

export default function AccessRestrictionBanner({
  userTier,
  featureName,
  featureDescription,
  currentUsage,
  limit,
  showUpgradeOptions = true,
  onClose,
}: AccessRestrictionBannerProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [upgradeTiers, setUpgradeTiers] = useState<Array<{
    name: string;
    billingOptions: { monthly: number };
    recommended?: boolean;
  }>>([]);
  const userAccess = usePricingAccess(userTier);
  
  const hasAccess = userAccess.canAccessCourses || 
                   userAccess.canAccessBlogPosts || 
                   userAccess.canAccessStreaks || 
                   userAccess.canAccessCommunity || 
                   userAccess.canAccessSupport || 
                   userAccess.canAccessMentorship || 
                   userAccess.canAccessAssessments || 
                   userAccess.canAccessEvents || 
                   userAccess.canAccessGrowthPlan;

  const isLimitReached = limit && currentUsage && currentUsage >= limit;

  const loadUpgradeOptions = async () => {
    try {
      const tiers = await getPricingTiers();
      const upgradeOptions = tiers.filter(tier => 
        tier.name.toLowerCase() !== userTier.toLowerCase() && 
        tier.name.toLowerCase() !== 'free'
      );
      setUpgradeTiers(upgradeOptions);
    } catch (error) {
      console.error("Error loading upgrade options:", error);
    }
  };

  const handleShowUpgradeOptions = () => {
    if (upgradeTiers.length === 0) {
      loadUpgradeOptions();
    }
    setShowDetails(!showDetails);
  };

  const getRestrictionType = () => {
    if (!hasAccess) return "no-access";
    if (isLimitReached) return "limit-reached";
    return "none";
  };

  const restrictionType = getRestrictionType();

  if (restrictionType === "none") {
    return null;
  }

  return (
    <Card className={`border-l-4 ${
      restrictionType === "no-access" 
        ? "border-l-red-500 bg-red-50 dark:bg-red-950/20" 
        : "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {restrictionType === "no-access" ? (
              <Lock className="h-5 w-5 text-red-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <CardTitle className="text-lg">
              {restrictionType === "no-access" ? "Access Restricted" : "Usage Limit Reached"}
            </CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {restrictionType === "no-access" 
              ? `Your current plan (${userTier}) doesn't include access to ${featureName}.`
              : `You've reached your ${featureName} limit for this billing period.`
            }
          </p>
          {featureDescription && (
            <p className="text-sm text-muted-foreground">{featureDescription}</p>
          )}
        </div>

        {isLimitReached && (
          <div className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium">Current Usage</p>
              <p className="text-sm text-muted-foreground">
                {currentUsage} of {limit} {featureName.toLowerCase()}
              </p>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${Math.min((currentUsage! / limit!) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {showUpgradeOptions && (
          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={handleShowUpgradeOptions}
              className="w-full"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {restrictionType === "no-access" ? "View Upgrade Options" : "Upgrade for More"}
            </Button>

            {showDetails && (
              <div className="space-y-3 pt-3 border-t">
                <h4 className="font-medium text-sm">Available Plans</h4>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                     {upgradeTiers.map((tier) => {
                     // Note: This would need to be moved outside the map function in a real implementation
                     // For now, we'll use a simple approach
                     const recommendations: Array<{ feature: string; current: string; target: string; benefit: string }> = [];
                    
                    return (
                      <Card key={tier.name} className="relative">
                        {tier.recommended && (
                          <Badge className="absolute -top-2 -right-2 text-xs">
                            Recommended
                          </Badge>
                        )}
                        <CardContent className="p-4">
                          <div className="text-center mb-3">
                            <h5 className="font-semibold">{tier.name}</h5>
                            <p className="text-2xl font-bold">${tier.billingOptions.monthly}</p>
                            <p className="text-xs text-muted-foreground">per month</p>
                          </div>
                          
                          {recommendations.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">
                                What you&apos;ll get:
                              </p>
                              <ul className="text-xs space-y-1">
                                {recommendations.slice(0, 3).map((rec, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    {rec.benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <Button 
                            asChild 
                            className="w-full mt-3" 
                            size="sm"
                          >
                            <Link href={`/checkout?tier=${encodeURIComponent(tier.name)}&cycle=monthly`}>
                              Upgrade to {tier.name}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Current Plan: {userTier}</span>
          <Link href="/pricing" className="text-primary hover:underline">
            View All Plans
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Simplified version for inline usage
export function AccessRestrictionInline({
  userTier,
  featureName,
  children,
}: {
  userTier: string;
  featureName: string;
  children: React.ReactNode;
}) {
  const userAccess = usePricingAccess(userTier);
  
  const hasAccess = userAccess.canAccessCourses || 
                   userAccess.canAccessBlogPosts || 
                   userAccess.canAccessStreaks || 
                   userAccess.canAccessCommunity || 
                   userAccess.canAccessSupport || 
                   userAccess.canAccessMentorship || 
                   userAccess.canAccessAssessments || 
                   userAccess.canAccessEvents || 
                   userAccess.canAccessGrowthPlan;

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="text-center p-4">
          <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium mb-2">{featureName} Access Required</p>
          <p className="text-xs text-muted-foreground mb-3">
            Upgrade your plan to access this feature
          </p>
          <Button asChild size="sm">
            <Link href="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for showing feature limits
export function FeatureLimitIndicator({
  currentUsage,
  limit,
  featureName,
}: {
  currentUsage: number;
  limit: number;
  featureName: string;
}) {
  const percentage = (currentUsage / limit) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  if (isAtLimit) {
    return (
      <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            {featureName} Limit Reached
          </span>
          <Badge variant="destructive" className="text-xs">
            {currentUsage}/{limit}
          </Badge>
        </div>
        <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          Upgrade your plan to get more {featureName.toLowerCase()}
        </p>
      </div>
    );
  }

  if (isNearLimit) {
    return (
      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
            {featureName} Usage
          </span>
          <Badge variant="secondary" className="text-xs">
            {currentUsage}/{limit}
          </Badge>
        </div>
        <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                       You&apos;re approaching your {featureName.toLowerCase()} limit
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-muted rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{featureName}</span>
        <span className="text-xs font-medium">
          {currentUsage}/{limit}
        </span>
      </div>
      <div className="w-full bg-muted-foreground/20 rounded-full h-1 mt-1">
        <div 
          className="bg-primary h-1 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
} 