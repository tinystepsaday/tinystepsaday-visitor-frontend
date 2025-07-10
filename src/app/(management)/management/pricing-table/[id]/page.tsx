"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, DollarSign, Shield, Star } from "lucide-react";
import { getEnhancedTierById, type PricingTierEnhanced } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DetailPageLoader } from "@/components/ui/loaders";
import { toast } from "sonner";

export default function PricingTierDetailPage() {
  const [tier, setTier] = useState<PricingTierEnhanced | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const loadTier = async () => {
      try {
        const tierData = await getEnhancedTierById(id);
        if (tierData) {
          setTier(tierData);
        } else {
          toast.error("Pricing tier not found");
          router.push("/management/pricing-table");
        }
      } catch (error) {
        console.error("Error loading tier:", error);
        toast.error("Failed to load pricing tier");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTier();
    }
  }, [id, router]);

  if (loading) {
    return <DetailPageLoader
      title="Pricing Tier Details"
      subtitle="View and manage pricing tier information"
    />;
  }

  if (!tier) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'vip': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'premium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'none': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => router.push(`/management/pricing-table/${tier.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Tier
            </Button>
          </div>
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold tracking-tight">{tier.name}</h1>
            <p className="text-muted-foreground">{tier.description}</p>
          </div>
        </div>
      </div>

      {/* Tier Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Tier Overview
            </CardTitle>
            <div className="flex items-center gap-2">
              <BadgeComponent className={getStatusColor(tier.status)}>
                {tier.status.charAt(0).toUpperCase() + tier.status.slice(1)}
              </BadgeComponent>
              {tier.metadata?.popular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              {tier.metadata?.bestValue && <BadgeComponent variant="secondary">Best Value</BadgeComponent>}
              {tier.metadata?.featured && <BadgeComponent variant="outline">Featured</BadgeComponent>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Monthly Price</h4>
              <p className="text-2xl font-bold">${tier.billingOptions.monthly.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Yearly Price</h4>
              <p className="text-2xl font-bold">${tier.billingOptions.yearly.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">3-Year Price</h4>
              <p className="text-2xl font-bold">${tier.billingOptions.threeYear.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Sort Order</h4>
              <p className="text-2xl font-bold">{tier.sortOrder}</p>
            </div>
          </div>
          {tier.billingOptions.setupFee && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">Setup Fee</h4>
              <p className="text-lg font-semibold">${tier.billingOptions.setupFee.toFixed(2)}</p>
            </div>
          )}
          {tier.billingOptions.trialDays && tier.billingOptions.trialDays > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">Trial Period</h4>
              <p className="text-lg font-semibold">{tier.billingOptions.trialDays} days</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access-controls">Access Controls</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="billing">Billing Options</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Tier ID</h4>
                  <p className="font-mono text-sm">{tier.id}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Slug</h4>
                  <p className="font-mono text-sm">{tier.slug}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Created</h4>
                  <p className="text-sm">{new Date(tier.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Last Updated</h4>
                  <p className="text-sm">{new Date(tier.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-sm">{tier.description}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Button Text</h4>
                <p className="text-sm">{tier.buttonText}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {tier.features.filter(f => f.included).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Included Features</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {tier.features.filter(f => !f.included).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Excluded Features</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {tier.features.filter(f => f.limit || f.unlimited).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Limited Features</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-controls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Courses Access */}
              <div>
                <h4 className="font-medium mb-3">Courses Access</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Access Level</span>
                      <BadgeComponent className={getAccessLevelColor(tier.accessControl.courses.access)}>
                        {tier.accessControl.courses.access.toUpperCase()}
                      </BadgeComponent>
                    </div>
                    {tier.accessControl.courses.maxCourses && (
                      <p className="text-sm text-muted-foreground">
                        Max courses: {tier.accessControl.courses.maxCourses}
                      </p>
                    )}
                    {tier.accessControl.courses.includeInstructorFeedback && (
                      <p className="text-sm text-green-600">✓ Instructor feedback included</p>
                    )}
                    {tier.accessControl.courses.personalizedTutoring && (
                      <p className="text-sm text-green-600">✓ Personalized tutoring included</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Posts Access */}
              <div>
                <h4 className="font-medium mb-3">Blog Posts Access</h4>
                <div className="p-3 border rounded-lg">
                  {tier.accessControl.blogPosts.unlimited ? (
                    <div className="flex items-center gap-2">
                      <BadgeComponent className="bg-green-100 text-green-800">Unlimited</BadgeComponent>
                      {tier.accessControl.blogPosts.priorityPublishing && (
                        <BadgeComponent variant="secondary">Priority Publishing</BadgeComponent>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Max per month: {tier.accessControl.blogPosts.maxPerMonth}
                      </p>
                      {tier.accessControl.blogPosts.priorityPublishing && (
                        <p className="text-sm text-green-600">✓ Priority publishing included</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Community Access */}
              <div>
                <h4 className="font-medium mb-3">Community Access</h4>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Access Level</span>
                    <BadgeComponent className={getAccessLevelColor(tier.accessControl.community.access)}>
                      {tier.accessControl.community.access.toUpperCase()}
                    </BadgeComponent>
                  </div>
                  {tier.accessControl.community.canCreateEvents && (
                    <p className="text-sm text-green-600">✓ Can create events</p>
                  )}
                  {tier.accessControl.community.canModerate && (
                    <p className="text-sm text-green-600">✓ Can moderate community</p>
                  )}
                </div>
              </div>

              {/* Support Level */}
              <div>
                <h4 className="font-medium mb-3">Support Level</h4>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Support Type</span>
                    <BadgeComponent className={getAccessLevelColor(tier.accessControl.support.level)}>
                      {tier.accessControl.support.level.toUpperCase()}
                    </BadgeComponent>
                  </div>
                  {tier.accessControl.support.responseTime && (
                    <p className="text-sm text-muted-foreground">
                      Response time: {tier.accessControl.support.responseTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Mentorship */}
              <div>
                <h4 className="font-medium mb-3">Mentorship</h4>
                <div className="p-3 border rounded-lg">
                  {tier.accessControl.mentorship.unlimited ? (
                    <div className="flex items-center gap-2">
                      <BadgeComponent className="bg-green-100 text-green-800">Unlimited Sessions</BadgeComponent>
                      {tier.accessControl.mentorship.emergencySessions && (
                        <BadgeComponent variant="secondary">Emergency Sessions</BadgeComponent>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Sessions per quarter: {tier.accessControl.mentorship.sessionsPerQuarter}
                      </p>
                      {tier.accessControl.mentorship.emergencySessions && (
                        <p className="text-sm text-green-600">✓ Emergency sessions available</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Events */}
              <div>
                <h4 className="font-medium mb-3">Events</h4>
                <div className="p-3 border rounded-lg">
                  {tier.accessControl.events.discountPercentage && (
                    <p className="text-sm text-muted-foreground">
                      Discount: {tier.accessControl.events.discountPercentage}%
                    </p>
                  )}
                  {tier.accessControl.events.freeTicketsPerYear && (
                    <p className="text-sm text-muted-foreground">
                      Free tickets per year: {tier.accessControl.events.freeTicketsPerYear}
                    </p>
                  )}
                  {tier.accessControl.events.priorityBooking && (
                    <p className="text-sm text-green-600">✓ Priority booking</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Features List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className={`w-4 h-4 rounded-full mt-0.5 ${feature.included ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <BadgeComponent variant="outline" className="text-xs">
                            Limit: {feature.limit}
                          </BadgeComponent>
                        )}
                        {feature.unlimited && (
                          <BadgeComponent className="bg-green-100 text-green-800 text-xs">
                            Unlimited
                          </BadgeComponent>
                        )}
                      </div>
                      {feature.details && (
                        <p className="text-sm text-muted-foreground mt-1">{feature.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Billing Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Monthly</h4>
                  <div className="text-2xl font-bold">${tier.billingOptions.monthly.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Yearly</h4>
                  <div className="text-2xl font-bold">${tier.billingOptions.yearly.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">per year</p>
                  <p className="text-xs text-green-600 mt-1">
                    Save ${((tier.billingOptions.monthly * 12) - tier.billingOptions.yearly).toFixed(2)}
                  </p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">3-Year</h4>
                  <div className="text-2xl font-bold">${tier.billingOptions.threeYear.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">for 3 years</p>
                  <p className="text-xs text-green-600 mt-1">
                    Save ${((tier.billingOptions.monthly * 36) - tier.billingOptions.threeYear).toFixed(2)}
                  </p>
                </div>
              </div>

              {(tier.billingOptions.setupFee || tier.billingOptions.trialDays) && (
                <div className="mt-6 pt-6 border-t">
                  <div className="grid gap-4 md:grid-cols-2">
                    {tier.billingOptions.setupFee && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Setup Fee</h4>
                        <p className="text-lg font-semibold">${tier.billingOptions.setupFee.toFixed(2)}</p>
                      </div>
                    )}
                    {tier.billingOptions.trialDays && tier.billingOptions.trialDays > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Trial Period</h4>
                        <p className="text-lg font-semibold">{tier.billingOptions.trialDays} days</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 