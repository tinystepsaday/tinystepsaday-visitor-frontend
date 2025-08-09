"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Filter,
  Image as ImageIcon,
  Edit,
  Trash2,
  Eye,
  ImagePlus,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { MediaSelector } from "@/components/media-selector"
import type { GalleryImage } from "@/data/gallery"

// Mock storage for gallery images (in a real app, this would be in a database)
const useGalleryStorage = () => {
  const [images, setImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    // Load initial images from the gallery data
    const loadImages = async () => {
      try {
        const { getGalleryImages } = await import("@/data/gallery")
        setImages(getGalleryImages())
      } catch (error) {
        console.error("Failed to load gallery images:", error)
      }
    }
    loadImages()
  }, [])

  const addImage = (image: Omit<GalleryImage, "id">) => {
    const newImage = {
      ...image,
      id: Date.now(),
    }
    setImages(prev => [...prev, newImage])
    return newImage
  }

  const updateImage = (id: number, updates: Partial<GalleryImage>) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, ...updates } : img))
  }

  const deleteImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  return { images, addImage, updateImage, deleteImage }
}

export default function GalleryManagementPage() {
  const { images, addImage, updateImage, deleteImage } = useGalleryStorage()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Form state for adding/editing images
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    title: "",
    description: "",
    category: "",
  })

  const categories = [
    "technology",
    "wellness",
    "workspace",
    "design",
    "events",
    "community",
    "workshops",
    "other"
  ]

  // Filter images based on search and category
  const filteredImages = images.filter((image) => {
    const matchesSearch = 
      image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedImages = filteredImages.slice(startIndex, endIndex)

  const handleAddImage = () => {
    if (!formData.src || !formData.alt) {
      toast.error("Image URL and alt text are required")
      return
    }

    try {
      addImage({
        src: formData.src,
        alt: formData.alt,
        title: formData.title || undefined,
        description: formData.description || undefined,
        category: formData.category || undefined,
      })
      
      toast.success("Image added successfully")
      setIsAddDialogOpen(false)
      resetForm()
    } catch {
      toast.error("Failed to add image")
    }
  }

  const handleEditImage = () => {
    if (!editingImage || !formData.src || !formData.alt) {
      toast.error("Image URL and alt text are required")
      return
    }

    try {
      updateImage(editingImage.id, {
        src: formData.src,
        alt: formData.alt,
        title: formData.title || undefined,
        description: formData.description || undefined,
        category: formData.category || undefined,
      })
      
      toast.success("Image updated successfully")
      setIsEditDialogOpen(false)
      setEditingImage(null)
      resetForm()
    } catch {
      toast.error("Failed to update image")
    }
  }

  const handleDeleteImage = (image: GalleryImage) => {
    if (confirm(`Are you sure you want to delete "${image.title || image.alt}"?`)) {
      try {
        deleteImage(image.id)
        toast.success("Image deleted successfully")
      } catch {
        toast.error("Failed to delete image")
      }
    }
  }

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData({
      src: image.src,
      alt: image.alt,
      title: image.title || "",
      description: image.description || "",
      category: image.category || "",
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      src: "",
      alt: "",
      title: "",
      description: "",
      category: "",
    })
  }

  const getCategoryCount = (category: string) => {
    return images.filter(img => img.category === category).length
  }

  const handleMediaSelect = (media: { url: string; alt?: string; caption?: string }) => {
    setFormData(prev => ({
      ...prev,
      src: media.url,
      alt: media.alt || prev.alt,
      title: media.caption || prev.title,
    }))
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, categoryFilter])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
          <p className="text-muted-foreground">
            Manage images displayed on the public gallery page
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
              <DialogDescription>
                Add a new image to the public gallery. You can select from existing media, upload a new file, or add a link.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Image Source</Label>
                <div className="flex items-center gap-2">
                  <MediaSelector
                    onSelect={handleMediaSelect}
                    trigger={
                      <Button variant="outline" type="button">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Select from Media
                      </Button>
                    }
                  />
                  <span className="text-sm text-muted-foreground">or</span>
                  <Input
                    placeholder="https://firebasestorage.googleapis.com/v0/b/tiny-steps-a-day-44449.firebasestorage.app/o/cover-image.jpg?alt=media&token=aa7c3056-a542-49dc-91f3-d9ba0271ced9"
                    value={formData.src}
                    onChange={(e) => setFormData(prev => ({ ...prev, src: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text *</Label>
                <Input
                  id="alt"
                  placeholder="Descriptive text for accessibility"
                  value={formData.alt}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Image title (optional)"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Image description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddImage}>
                  Add Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{images.length}</div>
          </CardContent>
        </Card>
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCategoryCount(category)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and View Options */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>Manage and organize your gallery content</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "card" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "No images have been added to the gallery yet."
                }
              </p>
            </div>
          ) : (
            <>
              {/* Card View */}
              {viewMode === "card" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
                  {paginatedImages.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                      <CardHeader className="relative aspect-square">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200" />
                        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => window.open(image.src, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{image.title || "Untitled"}</h3>
                            <p className="text-sm text-muted-foreground truncate">{image.alt}</p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditDialog(image)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteImage(image)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {image.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {image.description}
                          </p>
                        )}
                        {image.category && (
                          <Badge variant="outline" className="text-xs">
                            {image.category}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === "table" && (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Alt Text</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedImages.map((image) => (
                        <TableRow key={image.id}>
                          <TableCell>
                            <div className="relative w-16 h-16">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {image.title || "Untitled"}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {image.alt}
                          </TableCell>
                          <TableCell>
                            {image.category && (
                              <Badge variant="outline" className="text-xs">
                                {image.category}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {image.description || "No description"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => window.open(image.src, '_blank')}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openEditDialog(image)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteImage(image)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update the image details and metadata. You can select from existing media or change the URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image Source</Label>
              <div className="flex items-center gap-2">
                <MediaSelector
                  onSelect={handleMediaSelect}
                  trigger={
                    <Button variant="outline" type="button">
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Select from Media
                    </Button>
                  }
                />
                <span className="text-sm text-muted-foreground">or</span>
                <Input
                  placeholder="https://firebasestorage.googleapis.com/v0/b/tiny-steps-a-day-44449.firebasestorage.app/o/cover-image.jpg?alt=media&token=aa7c3056-a542-49dc-91f3-d9ba0271ced9"
                  value={formData.src}
                  onChange={(e) => setFormData(prev => ({ ...prev, src: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-alt">Alt Text *</Label>
              <Input
                id="edit-alt"
                placeholder="Descriptive text for accessibility"
                value={formData.alt}
                onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                placeholder="Image title (optional)"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Image description (optional)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditImage}>
                Update Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 