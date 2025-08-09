"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, User, Plus, X } from "lucide-react";
import { getTeamMemberById } from "@/data/team";
import type { TeamMember } from "@/data/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaSelector } from "@/components/media-selector";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DetailPageLoader } from "@/components/ui/loaders";
import Image from "next/image";

export default function EditTeamMemberPage() {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    email: "",
    phone: "",
    department: "",
    status: "active" as "active" | "inactive" | "on-leave",
    location: "",
    hireDate: "",
    isFeatured: false,
    order: 1,
    skills: [] as string[],
    social: {
      linkedin: "",
      twitter: "",
      github: "",
      website: "",
    },
  });
  const [newSkill, setNewSkill] = useState("");
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  useEffect(() => {
    const loadMember = async () => {
      try {
        const memberData = getTeamMemberById(memberId);
        if (memberData) {
          setMember(memberData);
          setFormData({
            name: memberData.name,
            role: memberData.role,
            bio: memberData.bio,
            image: memberData.image,
            email: memberData.email,
            phone: memberData.phone || "",
            department: memberData.department,
            status: memberData.status,
            location: memberData.location,
            hireDate: memberData.hireDate,
            isFeatured: memberData.isFeatured,
            order: memberData.order,
            skills: [...memberData.skills],
            social: {
              linkedin: memberData.social.linkedin || "",
              twitter: memberData.social.twitter || "",
              github: memberData.social.github || "",
              website: memberData.social.website || "",
            },
          });
        }
      } catch (error) {
        console.error("Error loading team member:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      loadMember();
    }
  }, [memberId]);

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value,
      },
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleImageSelect = (media: { url: string; alt?: string; caption?: string }) => {
    setFormData(prev => ({
      ...prev,
      image: media.url,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    setSaving(true);
    try {
      // In a real app, you would call an API to update the member
      console.log("Updating member:", formData);
      
      // Simulate API call
      setTimeout(() => {
        setSaving(false);
        router.push(`/management/team/${member.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error updating team member:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return <DetailPageLoader 
      title="Edit Team Member" 
      subtitle="Update team member information"
      backHref={`/management/team/${memberId}`}
      backText="Back to Member"
    />;
  }

  if (!member) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.push("/management/team")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Team Member Not Found</h3>
              <p className="text-muted-foreground">The team member you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const departments = [
    "Executive",
    "Product",
    "Coaching",
    "Technology",
    "Content",
    "Community",
    "Research",
    "Operations",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.push(`/management/team/${member.id}`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Member
            </Button>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-3xl font-bold">Edit Team Member</h1>
            <p className="text-muted-foreground">
              Update {member.name}&apos;s information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role/Position *</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about this team member..."
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: "active" | "inactive" | "on-leave") => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, State/Province"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => handleInputChange("hireDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button variant="outline" onClick={addSkill} disabled={!newSkill.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.social.linkedin}
                      onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      type="url"
                      value={formData.social.twitter}
                      onChange={(e) => handleSocialChange("twitter", e.target.value)}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      type="url"
                      value={formData.social.github}
                      onChange={(e) => handleSocialChange("github", e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.social.website}
                      onChange={(e) => handleSocialChange("website", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Image */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.image ? (
                  <div className="space-y-2">
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={formData.image}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                        width={400}
                        height={200}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleInputChange("image", "")}
                      className="w-full"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <div className="text-center">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No image selected</p>
                      </div>
                    </div>
                    <MediaSelector
                      onSelect={handleImageSelect}
                      trigger={
                        <Button type="button" variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Select Image
                        </Button>
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Featured Member</Label>
                    <p className="text-sm text-muted-foreground">
                      Show on public team page
                    </p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 1)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push(`/management/team/${member.id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
} 