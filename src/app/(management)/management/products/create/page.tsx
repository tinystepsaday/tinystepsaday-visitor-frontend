"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MediaSelector } from "@/components/media-selector";
import Image from "next/image";

export default function CreateProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    detailedDescription: "",
    price: 0,
    category: "",
    inStock: true,
    features: [""],
    specifications: [""],
    images: [""],
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayFieldChange = (field: 'features' | 'specifications' | 'images', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'features' | 'specifications' | 'images') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayField = (field: 'features' | 'specifications' | 'images', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "Product name is required",
          variant: "destructive",
        });
        return;
      }

      if (!formData.description.trim()) {
        toast({
          title: "Validation Error",
          description: "Product description is required",
          variant: "destructive",
        });
        return;
      }

      if (formData.price <= 0) {
        toast({
          title: "Validation Error",
          description: "Price must be greater than 0",
          variant: "destructive",
        });
        return;
      }

      if (!formData.category) {
        toast({
          title: "Validation Error",
          description: "Category is required",
          variant: "destructive",
        });
        return;
      }

      // Filter out empty array items
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ""),
        specifications: formData.specifications.filter(s => s.trim() !== ""),
        images: formData.images.filter(i => i.trim() !== ""),
      };

      // Simulate API call with cleaned data
      console.log("Creating product with data:", cleanedData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      router.push("/management/products");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/management/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Product</h1>
            <p className="text-muted-foreground">Add a new product to your catalog</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Creating..." : "Create Product"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief product description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description</Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) => handleInputChange("detailedDescription", e.target.value)}
                placeholder="Detailed product description"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Features
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField("features")}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Feature
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleArrayFieldChange("features", index, e.target.value)}
                  placeholder="Enter feature"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayField("features", index)}
                  disabled={formData.features.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Specifications
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField("specifications")}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Specification
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={spec}
                  onChange={(e) => handleArrayFieldChange("specifications", index, e.target.value)}
                  placeholder="Enter specification"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayField("specifications", index)}
                  disabled={formData.specifications.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Product Images
              <div className="flex gap-2">
                <MediaSelector
                  onSelect={(media) => {
                    const newImages = [...formData.images];
                    newImages.push(media.url);
                    setFormData(prev => ({
                      ...prev,
                      images: newImages
                    }));
                  }}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1 h-4 w-4" />
                      Add from Media
                    </Button>
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField("images")}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add URL
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative">
                    <Input
                      value={image}
                      onChange={(e) => handleArrayFieldChange("images", index, e.target.value)}
                      placeholder="Image URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => removeArrayField("images", index)}
                      disabled={formData.images.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {image && (
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=200";
                        }}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/management/products")}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </div>
  );
}
