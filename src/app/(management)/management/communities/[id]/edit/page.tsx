"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { getCommunityById } from "@/data/communities";
import type { Community } from "@/data/communities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { getUniqueCategories } from "@/data/communities";
import { DetailPageLoader } from "@/components/ui/loaders";

export default function EditCommunityPage() {
  const router = useRouter();
  const params = useParams();
  const communityId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [community, setCommunity] = useState<Community | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    detailedDescription: "",
    totem: "",
    category: "",
    status: "draft",
    isPublic: true,
    requiresApproval: false,
    maxMembers: "",
    leaderName: "",
    leaderRole: "Community Leader",
    leaderEmail: "",
    leaderAvatar: "",
    discord: "",
    instagram: "",
    facebook: "",
    website: "",
    email: "",
    guidelines: [""],
    rules: [""],
    tags: [""]
  });

  const categories = getUniqueCategories();

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const foundCommunity = getCommunityById(communityId);
        if (foundCommunity) {
          setCommunity(foundCommunity);
          setFormData({
            name: foundCommunity.name,
            description: foundCommunity.description,
            detailedDescription: foundCommunity.detailedDescription,
            totem: foundCommunity.totem,
            category: foundCommunity.category,
            status: foundCommunity.status,
            isPublic: foundCommunity.isPublic,
            requiresApproval: foundCommunity.requiresApproval,
            maxMembers: foundCommunity.maxMembers?.toString() || "",
            leaderName: foundCommunity.leader.name,
            leaderRole: foundCommunity.leader.role,
            leaderEmail: foundCommunity.leader.email,
            leaderAvatar: foundCommunity.leader.avatar || "",
            discord: foundCommunity.location.discord || "",
            instagram: foundCommunity.location.instagram || "",
            facebook: foundCommunity.location.facebook || "",
            website: foundCommunity.location.website || "",
            email: foundCommunity.location.email || "",
            guidelines: foundCommunity.guidelines.length > 0 ? foundCommunity.guidelines : [""],
            rules: foundCommunity.rules.length > 0 ? foundCommunity.rules : [""],
            tags: foundCommunity.tags.length > 0 ? foundCommunity.tags : [""]
          });
        } else {
          router.push("/management/communities");
        }
      } catch (error) {
        console.error("Error loading community:", error);
      } finally {
        setLoading(false);
      }
    };

    if (communityId) {
      loadCommunity();
    }
  }, [communityId, router]);

    const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'guidelines' | 'rules' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: 'guidelines' | 'rules' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field: 'guidelines' | 'rules' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Here you would typically send the data to your API
      console.log("Updating community:", formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to community details
      router.push(`/management/communities/${communityId}`);
    } catch (error) {
      console.error("Error updating community:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <DetailPageLoader
      title="Loading Community..."
      subtitle="Please wait while we load the community for editing"
      backHref={`/management/communities/${communityId}`}
      backText="Back to Community"
      actionButtons={
        <Button variant="outline" disabled>
          <Save className="mr-2 h-4 w-4" />
          Saving...
        </Button>
      }
    />;
  }

  if (!community) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/management/communities")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Communities
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Community not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 w-full flex-col">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" onClick={() => router.push(`/management/communities/${communityId}`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Button>
          </div>
          <div className="items-start w-full">
            <h1 className="text-3xl font-bold">Edit Community</h1>
            <p className="text-muted-foreground">
              Update community settings and information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Community Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter community name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totem">Totem/Emoji</Label>
                    <Input
                      id="totem"
                      value={formData.totem}
                      onChange={(e) => handleInputChange("totem", e.target.value)}
                      placeholder="🧘"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the community"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) => handleInputChange("detailedDescription", e.target.value)}
                    placeholder="Comprehensive description of the community"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxMembers">Max Members</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      value={formData.maxMembers}
                      onChange={(e) => handleInputChange("maxMembers", e.target.value)}
                      placeholder="Leave empty for no limit"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Leader */}
            <Card>
              <CardHeader>
                <CardTitle>Community Leader</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaderName">Leader Name *</Label>
                    <Input
                      id="leaderName"
                      value={formData.leaderName}
                      onChange={(e) => handleInputChange("leaderName", e.target.value)}
                      placeholder="Enter leader name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaderRole">Leader Role</Label>
                    <Input
                      id="leaderRole"
                      value={formData.leaderRole}
                      onChange={(e) => handleInputChange("leaderRole", e.target.value)}
                      placeholder="Community Leader"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaderEmail">Leader Email *</Label>
                    <Input
                      id="leaderEmail"
                      type="email"
                      value={formData.leaderEmail}
                      onChange={(e) => handleInputChange("leaderEmail", e.target.value)}
                      placeholder="leader@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaderAvatar">Leader Avatar URL</Label>
                    <Input
                      id="leaderAvatar"
                      value={formData.leaderAvatar}
                      onChange={(e) => handleInputChange("leaderAvatar", e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Links */}
            <Card>
              <CardHeader>
                <CardTitle>Community Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord Server</Label>
                    <Input
                      id="discord"
                      value={formData.discord}
                      onChange={(e) => handleInputChange("discord", e.target.value)}
                      placeholder="discord.gg/community-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      placeholder="@communityname"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                      placeholder="fb.com/communityname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="community.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Community Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="hello@community.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.guidelines.map((guideline, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={guideline}
                      onChange={(e) => handleArrayChange("guidelines", index, e.target.value)}
                      placeholder="Enter a guideline"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("guidelines", index)}
                      disabled={formData.guidelines.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("guidelines")}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Guideline
                </Button>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Community Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={rule}
                      onChange={(e) => handleArrayChange("rules", index, e.target.value)}
                      placeholder="Enter a rule"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("rules", index)}
                      disabled={formData.rules.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("rules")}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Rule
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                      placeholder="Enter a tag"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("tags", index)}
                      disabled={formData.tags.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("tags")}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Community</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anyone to join without approval
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      New members need approval to join
                    </p>
                  </div>
                  <Switch
                    checked={formData.requiresApproval}
                    onCheckedChange={(checked) => handleInputChange("requiresApproval", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                    {formData.totem || "🏠"}
                  </div>
                  <div>
                    <p className="font-medium">{formData.name || "Community Name"}</p>
                    <p className="text-sm text-muted-foreground">{formData.category || "Category"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {formData.description || "Community description will appear here"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.filter(tag => tag.trim()).map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant={formData.isPublic ? "default" : "secondary"}>
                    {formData.isPublic ? "Public" : "Private"}
                  </Badge>
                  <Badge variant={formData.status === 'active' ? "default" : "secondary"}>
                    {formData.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="submit" className="w-full" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => router.push(`/management/communities/${communityId}`)}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 