"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, Edit, Trash2, Hash, Eye } from "lucide-react"
import { useBlogTags, useCreateBlogTag, useUpdateBlogTag, useDeleteBlogTag } from "@/lib/api/blog"
import { useToast } from "@/hooks/use-toast"
import type { BlogTag, BlogTagUpdate } from "@/lib/types"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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
import { Switch } from "@/components/ui/switch"

interface TagWithActions extends BlogTag {
  onEdit?: (tag: BlogTag) => void
  onDelete?: (id: string) => void
}

const columns: ColumnDef<TagWithActions>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Hash className="w-4 h-4" style={{ color: row.original.color || "#6B7280" }} />
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">/{row.original.slug}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "postsCount",
    header: "Posts",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("postsCount")} posts</Badge>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActive") ? "default" : "secondary"}>
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tag = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => window.open(`/blog?tag=${tag.slug}`, '_blank')}>
              <Eye className="mr-2 h-4 w-4" />
              View Posts
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => tag.onEdit?.(tag)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => tag.onDelete?.(tag.id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function TagsPage() {
  const { toast } = useToast()
  const { data: tags = [], isLoading, refetch } = useBlogTags()
  const createMutation = useCreateBlogTag()
  const updateMutation = useUpdateBlogTag()
  const deleteMutation = useDeleteBlogTag()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTag, setEditingTag] = useState<BlogTag | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    color: "#3B82F6",
    isActive: true,
  })

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      color: "#3B82F6",
      isActive: true,
    })
    setIsEditMode(false)
    setEditingTag(null)
  }

  const handleCreateTag = async () => {
    try {
      const tagData = {
        name: formData.name,
        slug: formData.slug,
        color: formData.color,
        isActive: formData.isActive,
      }
      await createMutation.mutateAsync(tagData as BlogTag)
      toast({
        title: "Success",
        description: "Tag created successfully.",
      })
      setIsDialogOpen(false)
      resetForm()
      refetch()
    } catch {
      toast({
        title: "Error",
        description: "Failed to create tag. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateTag = async () => {
    if (!editingTag) return

    try {
      const updateData: BlogTagUpdate = {
        name: formData.name,
        slug: formData.slug,
        color: formData.color,
        isActive: formData.isActive,
      }
      
      await updateMutation.mutateAsync({
        id: editingTag.id,
        data: updateData,
      })
      toast({
        title: "Success",
        description: "Tag updated successfully.",
      })
      setIsDialogOpen(false)
      resetForm()
      refetch()
    } catch {
      toast({
        title: "Error",
        description: "Failed to update tag. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTag = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast({
        title: "Success",
        description: "Tag deleted successfully.",
      })
      refetch()
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete tag. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (tag: BlogTag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
      color: tag.color || "#3B82F6",
      isActive: tag.isActive,
    })
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdateTag()
    } else {
      handleCreateTag()
    }
  }

  const tagsWithActions: TagWithActions[] = tags.map(tag => ({
    ...tag,
    onEdit: handleEdit,
    onDelete: handleDeleteTag,
  }))

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Tags</h2>
          <p className="text-muted-foreground">Manage tags for your blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Tag" : "Create Tag"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the tag details." : "Add a new tag to categorize your blog posts."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="col-span-3"
                  placeholder="Tag name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="col-span-3"
                  placeholder="tag-slug"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Input
                    type="color"
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-10 h-10 rounded border"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active
                </Label>
                <div className="col-span-3">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {isEditMode ? "Update Tag" : "Create Tag"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable 
        columns={columns} 
        data={tagsWithActions} 
        searchKey="name" 
        searchPlaceholder="Search tags..." 
        isLoading={isLoading}
      />
    </div>
  )
}
