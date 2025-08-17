"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Trash2, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ListPageLoader } from "@/components/ui/loaders";
import { useToast } from "@/hooks/use-toast";

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for categories
const mockCategories: ProductCategory[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and gadgets",
    slug: "electronics",
    color: "#3b82f6",
    productCount: 5,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Clothing",
    description: "Apparel and fashion items",
    slug: "clothing",
    color: "#10b981",
    productCount: 3,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "3",
    name: "Books",
    description: "Books and educational materials",
    slug: "books",
    color: "#f59e0b",
    productCount: 2,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: "4",
    name: "Home & Garden",
    description: "Home improvement and garden supplies",
    slug: "home-garden",
    color: "#8b5cf6",
    productCount: 4,
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "5",
    name: "Sports",
    description: "Sports equipment and accessories",
    slug: "sports",
    color: "#ef4444",
    productCount: 1,
    createdAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-01-25"),
  },
];

export default function ProductCategoriesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<ProductCategory | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCategories(mockCategories);
      } catch {
        console.error("Error loading categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = async () => {
    try {
      // Validate form
      if (!formData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "Category name is required",
          variant: "destructive",
        });
        return;
      }

      // Check if category name already exists
      if (categories.some(cat => cat.name.toLowerCase() === formData.name.toLowerCase())) {
        toast({
          title: "Validation Error",
          description: "A category with this name already exists",
          variant: "destructive",
        });
        return;
      }

      const newCategory: ProductCategory = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        color: formData.color,
        productCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCategories(prev => [...prev, newCategory]);
      setIsCreateDialogOpen(false);
      resetForm();

      toast({
        title: "Success",
        description: "Category created successfully",
      });
    } catch {
      console.error("Error creating category");
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;

    try {
      // Validate form
      if (!formData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "Category name is required",
          variant: "destructive",
        });
        return;
      }

      // Check if category name already exists (excluding current category)
      if (categories.some(cat =>
        cat.id !== editingCategory.id &&
        cat.name.toLowerCase() === formData.name.toLowerCase()
      )) {
        toast({
          title: "Validation Error",
          description: "A category with this name already exists",
          variant: "destructive",
        });
        return;
      }

      const updatedCategory: ProductCategory = {
        ...editingCategory,
        name: formData.name.trim(),
        description: formData.description.trim(),
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        color: formData.color,
        updatedAt: new Date(),
      };

      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id ? updatedCategory : cat
      ));
      setIsEditDialogOpen(false);
      setEditingCategory(null);
      resetForm();

      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch {
      console.error("Error updating category");
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;

    try {
      // Check if category has products
      if (deletingCategory.productCount > 0) {
        toast({
          title: "Cannot Delete",
          description: "Cannot delete category with existing products",
          variant: "destructive",
        });
        return;
      }

      setCategories(prev => prev.filter(cat => cat.id !== deletingCategory.id));
      setDeletingCategory(null);

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch {
      console.error("Error deleting category");
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (category: ProductCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "#3b82f6",
    });
  };

  if (loading) {
    return <ListPageLoader
      title="Product Categories"
      subtitle="Manage your product categories"
      createButtonText="Add Category"
    />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-full flex-col">
          <div className="flex items-center w-full justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/management/products")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Add a new category to organize your products.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-20 h-10"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCategory}>
                    <Save className="mr-2 h-4 w-4" />
                    Create Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-start w-full justify-start flex-col">
            <h1 className="text-3xl font-bold">Product Categories</h1>
            <p className="text-muted-foreground">
              Organize your products with categories
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingCategory(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{category.name}&quot;? This action cannot be undone.
                          {category.productCount > 0 && (
                            <span className="block mt-2 text-red-600">
                              Warning: This category has {category.productCount} product(s) and cannot be deleted.
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingCategory(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteCategory}
                          disabled={category.productCount > 0}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {category.description || "No description provided"}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Created {category.createdAt.toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              {searchTerm ? "No categories found matching your search." : "No categories created yet."}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Category Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-color">Color</Label>
              <Input
                id="edit-color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-20 h-10"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>
              <Save className="mr-2 h-4 w-4" />
              Update Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
