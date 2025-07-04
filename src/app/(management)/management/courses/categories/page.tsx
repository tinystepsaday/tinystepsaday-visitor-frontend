"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Palette, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { storage } from "@/lib/storage"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const colorOptions = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#ec4899",
  "#6366f1",
]

export default function CourseCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: colorOptions[0],
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    const allCategories = storage.getCategories()
    setCategories(allCategories)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Category name is required")
      return
    }

    try {
      if (editingCategory) {
        // Update existing category
        const updated = storage.updateCategory(editingCategory.id, {
          name: formData.name,
          slug: generateSlug(formData.name),
          description: formData.description,
          color: formData.color,
        })

        if (updated) {
          setCategories(categories.map((cat) => (cat.id === editingCategory.id ? updated : cat)))
          toast("Category updated successfully");
        }
      } else {
        // Create new category
        const newCategory = storage.createCategory({
          name: formData.name,
          slug: generateSlug(formData.name),
          description: formData.description,
          color: formData.color,
          postCount: 0,
          courseCount: 0,
          createdAt: new Date(),
        })

        setCategories([...categories, newCategory])
        toast("Category created successfully")
      }

      resetForm()
      setIsDialogOpen(false)
    } catch {
      toast("Failed to save category")
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const success = storage.deleteCategory(categoryId)
      if (success) {
        setCategories(categories.filter((cat) => cat.id !== categoryId))
        toast("Category deleted successfully");
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: colorOptions[0],
    })
    setEditingCategory(null);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-start flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <Link href="/management/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
                <DialogDescription>
                  {editingCategory ? "Update the category details" : "Add a new category for your courses"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Category name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Category description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <Button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 relative ${formData.color === color ? "border-foreground" : "border-muted"
                            }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setFormData({ ...formData, color })}
                          title={color}
                        >
                          {formData.color === color && (
                            <Check className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingCategory ? "Update" : "Create"} Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full mt-4">
          <h2 className="text-3xl font-bold tracking-tight">Course Categories</h2>
          <p className="text-muted-foreground">Organize your courses into categories</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">Courses:</span>
                    <Badge variant="secondary">{category.courseCount}</Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">Posts:</span>
                    <Badge variant="secondary">{category.postCount}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Palette className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No categories yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first category to organize your courses
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
