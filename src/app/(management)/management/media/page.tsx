"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, Edit, Trash2, Download, Eye } from "lucide-react"
import { useMediaFiles } from "@/lib/api"
import type { MediaFile } from "@/lib/types"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MediaSelector } from "@/components/media-selector"
import Image from "next/image"

const columns: ColumnDef<MediaFile>[] = [
  {
    accessorKey: "name",
    header: "File",
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.url || "/placeholder.svg"}
          alt={row.original.alt || row.original.name}
          className="h-10 w-10 rounded object-cover"
          width={40}
          height={40}
        />
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">{(row.original.size / 1024).toFixed(1)} KB</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "alt",
    header: "Alt Text",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("alt") || "—"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded",
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
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
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

export default function MediaPage() {
  const [type, setType] = useState<string>("all")

  const { data: files = [], isLoading } = useMediaFiles({ type })

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading media files...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        <MediaSelector
          onSelect={(media) => console.log("Selected:", media)}
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={files} searchKey="name" searchPlaceholder="Search files..." />
    </div>
  )
}
