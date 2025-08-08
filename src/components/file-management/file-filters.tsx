"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, FileText, Image, Video, Music, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { FileQueryParams } from "@/lib/types"

interface FileFiltersProps {
  filters: FileQueryParams
  onFiltersChange: (filters: FileQueryParams) => void
  onClearFilters: () => void
}

const FILE_TYPES = [
  { value: "all", label: "All Types", icon: FileText },
  { value: "IMAGE", label: "Images", icon: Image },
  { value: "VIDEO", label: "Videos", icon: Video },
  { value: "AUDIO", label: "Audio", icon: Music },
  { value: "DOCUMENT", label: "Documents", icon: FileText },
  { value: "OTHER", label: "Other", icon: File },
]

const SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "updatedAt", label: "Date Modified" },
  { value: "filename", label: "Filename" },
  { value: "size", label: "File Size" },
  { value: "originalName", label: "Original Name" },
  { value: "type", label: "File Type" },
  { value: "mimeType", label: "MIME Type" },
]

const SIZE_RANGES = [
  { value: "0-1024", label: "0 - 1 KB" },
  { value: "1024-10240", label: "1 - 10 KB" },
  { value: "10240-102400", label: "10 - 100 KB" },
  { value: "102400-1048576", label: "100 KB - 1 MB" },
  { value: "1048576-10485760", label: "1 - 10 MB" },
  { value: "10485760-104857600", label: "10 - 100 MB" },
  { value: "104857600-", label: "100+ MB" },
]

export function FileFilters({ filters, onFiltersChange, onClearFilters }: FileFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "")
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchTerm || undefined })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, onFiltersChange, filters])

  const handleFilterChange = (key: keyof FileQueryParams, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const handleSizeRangeChange = (range: string) => {
    const [min, max] = range.split("-").map(Number)
    onFiltersChange({
      ...filters,
      minSize: min,
      maxSize: max || undefined,
    })
  }

  const clearFilter = (key: keyof FileQueryParams) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).some(
    (key) => key !== "page" && key !== "limit" && filters[key as keyof FileQueryParams]
  )

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => key !== "page" && key !== "limit" && filters[key as keyof FileQueryParams]
  ).length

  return (
    <div className="space-y-4">
      {/* Search and basic filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files by name, caption, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.type || "all"}
            onValueChange={(value) => handleFilterChange("type", value === "all" ? undefined : value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {FILE_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

          <Select
            value={filters.isPublic?.toString() || "all"}
            onValueChange={(value) => handleFilterChange("isPublic", value === "all" ? undefined : value === "true")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Public</SelectItem>
              <SelectItem value="false">Private</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Advanced
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Advanced filters */}
      {isAdvancedOpen && (
        <div className="rounded-lg border p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sort options */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={filters.sortBy || "createdAt"}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Select
                value={filters.sortOrder || "desc"}
                onValueChange={(value) => handleFilterChange("sortOrder", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Size range */}
            <div className="space-y-2">
              <Label>File Size</Label>
              <Select
                value={
                  filters.minSize && filters.maxSize
                    ? `${filters.minSize}-${filters.maxSize}`
                    : filters.minSize
                    ? `${filters.minSize}-`
                    : "all"
                }
                onValueChange={(value) => {
                  if (value === "all") {
                    clearFilter("minSize")
                    clearFilter("maxSize")
                  } else {
                    handleSizeRangeChange(value)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  {SIZE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={filters.startDate?.split('T')[0] || ''}
                  onChange={(e) => handleFilterChange("startDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                  placeholder="Start date"
                />
                <Input
                  type="date"
                  value={filters.endDate?.split('T')[0] || ''}
                  onChange={(e) => handleFilterChange("endDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                  placeholder="End date"
                />
              </div>
            </div>
          </div>

          {/* MIME type filter */}
          <div className="space-y-2">
            <Label>MIME Type</Label>
            <Input
              placeholder="e.g., image/jpeg, application/pdf"
              value={filters.mimeType || ""}
              onChange={(e) => handleFilterChange("mimeType", e.target.value || undefined)}
            />
          </div>

          {/* Tags filter */}
          <div className="space-y-2">
            <Label>Tags (comma-separated)</Label>
            <Input
              placeholder="e.g., nature, landscape, sunset"
              value={filters.tags?.join(", ") || ""}
              onChange={(e) => {
                const tags = e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0)
                handleFilterChange("tags", tags.length > 0 ? tags : undefined)
              }}
            />
          </div>
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="gap-1">
              Type: {FILE_TYPES.find((t) => t.value === filters.type)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter("type")}
              />
            </Badge>
          )}
          {filters.isPublic !== undefined && (
            <Badge variant="secondary" className="gap-1">
              Visibility: {filters.isPublic ? "Public" : "Private"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter("isPublic")}
              />
            </Badge>
          )}
          {filters.minSize && (
            <Badge variant="secondary" className="gap-1">
              Size: {filters.minSize} - {filters.maxSize || "∞"} bytes
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  clearFilter("minSize")
                  clearFilter("maxSize")
                }}
              />
            </Badge>
          )}
          {filters.startDate && (
            <Badge variant="secondary" className="gap-1">
              Date: {filters.startDate?.split('T')[0]}
              {filters.endDate && ` - ${filters.endDate?.split('T')[0]}`}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  clearFilter("startDate")
                  clearFilter("endDate")
                }}
              />
            </Badge>
          )}
          {filters.mimeType && (
            <Badge variant="secondary" className="gap-1">
              MIME: {filters.mimeType}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter("mimeType")}
              />
            </Badge>
          )}
          {filters.tags && filters.tags.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Tags: {filters.tags.join(", ")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter("tags")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
