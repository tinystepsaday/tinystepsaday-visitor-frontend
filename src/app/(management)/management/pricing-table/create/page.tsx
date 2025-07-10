"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { createPricingTier, type AccessControl, type PricingFeature } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const defaultAccessControl: AccessControl = {
  courses: { access: 'none' },
  blogPosts: { maxPerMonth: 0 },
  streaks: { access: 'none' },
  community: { access: 'none' },
  support: { level: 'none' },
  mentorship: { sessionsPerQuarter: 0 },
  assessments: { type: 'none' },
  events: { discountPercentage: 0 },
  growthPlan: { type: 'none' },
};

const defaultFeatures: PricingFeature[] = [
  { name: "Blog posts", included: false },
  { name: "Course access", included: false },
  { name: "Streak tracking", included: false },
  { name: "Community access", included: false },
  { name: "Support", included: false },
  { name: "Mentorship sessions", included: false },
  { name: "Assessments", included: false },
  { name: "Event discounts", included: false },
  { name: "Growth plan", included: false },
];

export default function CreatePricingTierPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    buttonText: "Get Started",
    status: "draft" as const,
    sortOrder: 1,
    price: 0,
    highlight: false,
    recommended: false,
    billingOptions: {
      monthly: 0,
      yearly: 0,
      threeYear: 0,
      setupFee: 0,
      trialDays: 0,
    },
    accessControl: { ...defaultAccessControl },
    features: [...defaultFeatures],
    metadata: {
      popular: false,
      bestValue: false,
      featured: false,
      customFeatures: [] as string[],
    },
  });

  const [customFeature, setCustomFeature] = useState("");

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBillingChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      billingOptions: {
        ...prev.billingOptions,
        [field]: value
      }
    }));
  };

  const handleAccessControlChange = (section: keyof AccessControl, field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        [section]: {
          ...prev.accessControl[section],
          [field]: value
        }
      }
    }));
  };

  const handleFeatureToggle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, included: !feature.included } : feature
      )
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const addCustomFeature = () => {
    if (customFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, { name: customFeature.trim(), included: true }]
      }));
      setCustomFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addCustomMetadataFeature = () => {
    if (customFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          customFeatures: [...prev.metadata.customFeatures, customFeature.trim()]
        }
      }));
      setCustomFeature("");
    }
  };

  const removeCustomMetadataFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        customFeatures: prev.metadata.customFeatures.filter((_, i) => i !== index)
      }
    }));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    handleInputChange('name', name);
    if (!formData.slug || formData.slug === generateSlug(formData.name)) {
      handleInputChange('slug', generateSlug(name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTier = await createPricingTier(formData);
      toast.success("Pricing tier created successfully");
      router.push(`/management/pricing-table/${newTier.id}`);
    } catch (error) {
      console.error("Error creating tier:", error);
      toast.error("Failed to create pricing tier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Pricing Tier</h1>
            <p className="text-muted-foreground">
              Create a new pricing tier with comprehensive access controls
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Tier Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Starter, Premium, Enterprise"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="e.g., starter, premium, enterprise"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this tier offers..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => handleInputChange('buttonText', e.target.value)}
                  placeholder="e.g., Get Started, Upgrade Now"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: string) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highlight"
                    checked={formData.highlight}
                    onCheckedChange={(checked) => handleInputChange('highlight', checked)}
                  />
                  <Label htmlFor="highlight">Highlight this tier</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommended"
                    checked={formData.recommended}
                    onCheckedChange={(checked) => handleInputChange('recommended', checked)}
                  />
                  <Label htmlFor="recommended">Mark as recommended</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="monthly">Monthly Price ($)</Label>
                  <Input
                    id="monthly"
                    type="number"
                    step="0.01"
                    value={formData.billingOptions.monthly}
                    onChange={(e) => handleBillingChange('monthly', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="yearly">Yearly Price ($)</Label>
                  <Input
                    id="yearly"
                    type="number"
                    step="0.01"
                    value={formData.billingOptions.yearly}
                    onChange={(e) => handleBillingChange('yearly', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="threeYear">3-Year Price ($)</Label>
                  <Input
                    id="threeYear"
                    type="number"
                    step="0.01"
                    value={formData.billingOptions.threeYear}
                    onChange={(e) => handleBillingChange('threeYear', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="setupFee">Setup Fee ($)</Label>
                  <Input
                    id="setupFee"
                    type="number"
                    step="0.01"
                    value={formData.billingOptions.setupFee}
                    onChange={(e) => handleBillingChange('setupFee', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="trialDays">Trial Days</Label>
                <Input
                  id="trialDays"
                  type="number"
                  value={formData.billingOptions.trialDays}
                  onChange={(e) => handleBillingChange('trialDays', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Access Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Courses Access */}
            <div>
              <h4 className="font-medium mb-3">Courses Access</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Access Level</Label>
                  <Select 
                    value={formData.accessControl.courses.access} 
                    onValueChange={(value: string) => handleAccessControlChange('courses', 'access', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Courses</Label>
                  <Input
                    type="number"
                    value={formData.accessControl.courses.maxCourses || ''}
                    onChange={(e) => handleAccessControlChange('courses', 'maxCourses', parseInt(e.target.value) || undefined)}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="instructorFeedback"
                  checked={formData.accessControl.courses.includeInstructorFeedback}
                  onCheckedChange={(checked) => handleAccessControlChange('courses', 'includeInstructorFeedback', checked)}
                />
                <Label htmlFor="instructorFeedback">Include instructor feedback</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="personalizedTutoring"
                  checked={formData.accessControl.courses.personalizedTutoring}
                  onCheckedChange={(checked) => handleAccessControlChange('courses', 'personalizedTutoring', checked)}
                />
                <Label htmlFor="personalizedTutoring">Personalized tutoring</Label>
              </div>
            </div>

            <Separator />

            {/* Blog Posts Access */}
            <div>
              <h4 className="font-medium mb-3">Blog Posts Access</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Max Posts Per Month</Label>
                  <Input
                    type="number"
                    value={formData.accessControl.blogPosts.maxPerMonth || ''}
                    onChange={(e) => handleAccessControlChange('blogPosts', 'maxPerMonth', parseInt(e.target.value) || undefined)}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unlimitedBlogPosts"
                    checked={formData.accessControl.blogPosts.unlimited}
                    onCheckedChange={(checked) => handleAccessControlChange('blogPosts', 'unlimited', checked)}
                  />
                  <Label htmlFor="unlimitedBlogPosts">Unlimited posts</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="priorityPublishing"
                  checked={formData.accessControl.blogPosts.priorityPublishing}
                  onCheckedChange={(checked) => handleAccessControlChange('blogPosts', 'priorityPublishing', checked)}
                />
                <Label htmlFor="priorityPublishing">Priority publishing</Label>
              </div>
            </div>

            <Separator />

            {/* Community Access */}
            <div>
              <h4 className="font-medium mb-3">Community Access</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Access Level</Label>
                  <Select 
                    value={formData.accessControl.community.access} 
                    onValueChange={(value: string) => handleAccessControlChange('community', 'access', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="leader">Leader</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="canCreateEvents"
                  checked={formData.accessControl.community.canCreateEvents}
                  onCheckedChange={(checked) => handleAccessControlChange('community', 'canCreateEvents', checked)}
                />
                <Label htmlFor="canCreateEvents">Can create events</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="canModerate"
                  checked={formData.accessControl.community.canModerate}
                  onCheckedChange={(checked) => handleAccessControlChange('community', 'canModerate', checked)}
                />
                <Label htmlFor="canModerate">Can moderate community</Label>
              </div>
            </div>

            <Separator />

            {/* Support Level */}
            <div>
              <h4 className="font-medium mb-3">Support Level</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Support Type</Label>
                  <Select 
                    value={formData.accessControl.support.level} 
                    onValueChange={(value: string) => handleAccessControlChange('support', 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Response Time</Label>
                  <Input
                    value={formData.accessControl.support.responseTime || ''}
                    onChange={(e) => handleAccessControlChange('support', 'responseTime', e.target.value)}
                    placeholder="e.g., 24 hours, 4 hours"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Mentorship */}
            <div>
              <h4 className="font-medium mb-3">Mentorship</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Sessions Per Quarter</Label>
                  <Input
                    type="number"
                    value={formData.accessControl.mentorship.sessionsPerQuarter || ''}
                    onChange={(e) => handleAccessControlChange('mentorship', 'sessionsPerQuarter', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unlimitedMentorship"
                    checked={formData.accessControl.mentorship.unlimited}
                    onCheckedChange={(checked) => handleAccessControlChange('mentorship', 'unlimited', checked)}
                  />
                  <Label htmlFor="unlimitedMentorship">Unlimited sessions</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="emergencySessions"
                  checked={formData.accessControl.mentorship.emergencySessions}
                  onCheckedChange={(checked) => handleAccessControlChange('mentorship', 'emergencySessions', checked)}
                />
                <Label htmlFor="emergencySessions">Emergency sessions</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={feature.included}
                    onCheckedChange={() => handleFeatureToggle(index)}
                  />
                  <div className="flex-1">
                    <Input
                      value={feature.name}
                      onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                      placeholder="Feature name"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={feature.limit || ''}
                      onChange={(e) => handleFeatureChange(index, 'limit', parseInt(e.target.value) || undefined)}
                      placeholder="Limit"
                      className="w-20"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={feature.unlimited}
                        onCheckedChange={(checked) => handleFeatureChange(index, 'unlimited', checked)}
                      />
                      <Label className="text-xs">Unlimited</Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                placeholder="Add custom feature..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
              />
              <Button type="button" onClick={addCustomFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Metadata & Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={formData.metadata.popular}
                  onCheckedChange={(checked) => handleInputChange('metadata', { ...formData.metadata, popular: checked })}
                />
                <Label htmlFor="popular">Popular tier</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bestValue"
                  checked={formData.metadata.bestValue}
                  onCheckedChange={(checked) => handleInputChange('metadata', { ...formData.metadata, bestValue: checked })}
                />
                <Label htmlFor="bestValue">Best value</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.metadata.featured}
                  onCheckedChange={(checked) => handleInputChange('metadata', { ...formData.metadata, featured: checked })}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>

            <div>
              <Label>Custom Features (for display)</Label>
              <div className="space-y-2 mt-2">
                {formData.metadata.customFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline">{feature}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomMetadataFeature(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 mt-2">
                <Input
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  placeholder="Add custom feature flag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomMetadataFeature())}
                />
                <Button type="button" onClick={addCustomMetadataFeature}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Pricing Tier"}
          </Button>
        </div>
      </form>
    </div>
  );
} 