"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, Edit, Trash2, Hash } from "lucide-react"
import { mockTags } from "@/data/mock-data"
import type { Tag } from "@/lib/types"
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

const columns: ColumnDef<Tag>[] = [
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
    accessorKey: "postCount",
    header: "Posts",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("postCount")} posts</Badge>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>View Posts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
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
  const [tags] = useState<Tag[]>(mockTags)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTag, setNewTag] = useState({
    name: "",
    slug: "",
    color: "#3B82F6",
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
    setNewTag((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleCreateTag = () => {
    console.log("Creating tag:", newTag)
    setIsDialogOpen(false)
    setNewTag({
      name: "",
      slug: "",
      color: "#3B82F6",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tags</h2>
          <p className="text-muted-foreground">Manage tags for your blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Tag</DialogTitle>
              <DialogDescription>Add a new tag to categorize your blog posts.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTag.name}
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
                  value={newTag.slug}
                  onChange={(e) => setNewTag((prev) => ({ ...prev, slug: e.target.value }))}
                  className="col-span-3"
                  placeholder="tag-slug"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <input
                    type="color"
                    id="color"
                    value={newTag.color}
                    onChange={(e) => setNewTag((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-10 h-10 rounded border"
                  />
                  <Input
                    value={newTag.color}
                    onChange={(e) => setNewTag((prev) => ({ ...prev, color: e.target.value }))}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTag}>
                Create Tag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={tags} searchKey="name" searchPlaceholder="Search tags..." />
    </div>
  )
}
