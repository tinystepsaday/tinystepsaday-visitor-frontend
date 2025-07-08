"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { type MessageTemplate } from "@/data/messages";

const categories = [
  { value: "general", label: "General" },
  { value: "support", label: "Support" },
  { value: "mentorship", label: "Mentorship" },
  { value: "billing", label: "Billing" },
  { value: "technical", label: "Technical" },
  { value: "feedback", label: "Feedback" }
];

interface TemplateFormClientProps {
  template?: MessageTemplate;
}

export function TemplateFormClient({ template }: TemplateFormClientProps) {
  const router = useRouter();
  const isEditing = !!template;
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    category: "general",
    isDefault: false
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        subject: template.subject,
        content: template.content,
        category: template.category,
        isDefault: template.isDefault
      });
    }
  }, [template]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.subject.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isEditing) {
      console.log("Updating template:", formData);
      toast.success("Template updated successfully!");
    } else {
      console.log("Creating template:", formData);
      toast.success("Template created successfully!");
    }

    router.push("/management/templates");
  };

  const previewContent = formData.content.replace(/\{\{name\}\}/g, "John Doe");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start w-full gap-4">
          <div className="flex items-center w-full">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-start w-full">
            <h1 className="text-2xl font-bold">
              {isEditing ? "Edit Message Template" : "Create Message Template"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update your message template" : "Create a new template for quick message responses"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
            <CardDescription>
              Fill in the template information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., General Inquiry Response"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="e.g., Thank you for contacting us"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Message Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Enter your message template. Use {{name}} to insert the recipient's name."
                  rows={12}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Use <code className="bg-muted px-1 rounded">{`{{name}}`}</code> to insert the recipient&apos;s name dynamically.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => handleInputChange("isDefault", checked)}
                />
                <Label htmlFor="isDefault">Set as default template</Label>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Template" : "Create Template")}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        {showPreview && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your template will appear
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Subject</Label>
                <p className="text-sm text-muted-foreground mt-1">{formData.subject || "No subject"}</p>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium">Content</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {previewContent || "No content"}
                  </pre>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>• Template variables like {`{{name}}`} will be replaced with actual values</p>
                <p>• Line breaks and formatting will be preserved</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}