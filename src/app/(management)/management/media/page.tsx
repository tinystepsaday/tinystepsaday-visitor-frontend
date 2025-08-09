"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Grid, List, Upload, BarChart3 } from "lucide-react"
import { useFiles, useFileStatistics, useDeleteFile, useBulkFileOperation } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileGrid } from "@/components/file-management/file-grid"
import { FileFilters } from "@/components/file-management/file-filters"
import { FileUpload } from "@/components/file-management/file-upload"
import { FileStatistics } from "@/components/file-management/file-statistics"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import type { FileQueryParams, MediaFile } from "@/lib/types"
import { formatBytes } from "@/lib/utils"

export default function MediaPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showStatsDialog, setShowStatsDialog] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null)
  // Initialize filters from URL params
  const [filters, setFilters] = useState<FileQueryParams>(() => ({
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    search: searchParams.get('search') || undefined,
    type: (searchParams.get('type') as "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | "OTHER" | "all") || undefined,
    isPublic: searchParams.get('isPublic') === 'true' ? true : searchParams.get('isPublic') === 'false' ? false : undefined,
    sortBy: (searchParams.get('sortBy') as "createdAt" | "updatedAt" | "filename" | "size" | "originalName" | "type" | "mimeType") || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as "asc" | "desc") || 'desc',
  }))

  // API hooks
  const { data: filesResponse, isLoading, refetch } = useFiles(filters)
  const { data: statistics } = useFileStatistics()
  const deleteMutation = useDeleteFile()
  const bulkOperationMutation = useBulkFileOperation()

  const files = filesResponse?.data || []
  const pagination = filesResponse?.pagination
  const analytics = filesResponse?.analytics

  // Sync filters with URL params when they change (e.g., browser back/forward)
  useEffect(() => {
    const newFilters: FileQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      search: searchParams.get('search') || undefined,
      type: (() => {
        const typeParam = searchParams.get('type')
        if (typeParam === 'all' || !typeParam) return undefined
        return typeParam as "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | "OTHER"
      })(),
      isPublic: searchParams.get('isPublic') === 'true' ? true : searchParams.get('isPublic') === 'false' ? false : undefined,
      sortBy: (searchParams.get('sortBy') as "createdAt" | "updatedAt" | "filename" | "size" | "originalName" | "type" | "mimeType") || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as "asc" | "desc") || 'desc',
    }
    
    // Use a ref to track the previous filters to avoid circular dependency
    setFilters(prevFilters => {
      // Deep comparison to avoid unnecessary updates
      const filtersChanged = 
        prevFilters.page !== newFilters.page ||
        prevFilters.limit !== newFilters.limit ||
        prevFilters.search !== newFilters.search ||
        prevFilters.type !== newFilters.type ||
        prevFilters.isPublic !== newFilters.isPublic ||
        prevFilters.sortBy !== newFilters.sortBy ||
        prevFilters.sortOrder !== newFilters.sortOrder
      
      return filtersChanged ? newFilters : prevFilters
    })
  }, [searchParams])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','))
          }
        } else {
          params.set(key, String(value))
        }
      }
    })
    
    const newUrl = `${pathname}?${params.toString()}`
    const currentUrl = `${pathname}?${searchParams.toString()}`
    
    // Only update URL if it's actually different
    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false })
    }
  }, [filters, pathname, router, searchParams])

  // Handlers
  const handleFiltersChange = (newFilters: FileQueryParams) => {
    setFilters({ ...newFilters, page: 1 }) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const handleFileSelect = (fileId: string, selected: boolean) => {
    setSelectedFiles(prev => 
      selected 
        ? [...prev, fileId]
        : prev.filter(id => id !== fileId)
    )
  }

  const handleFileAction = async (action: string, file: MediaFile) => {
    switch (action) {
      case 'view':
        window.open(file.url, '_blank')
        break
      case 'edit':
        // TODO: Implement edit dialog
        toast({
          title: "Edit Feature",
          description: "File editing will be implemented soon.",
        })
        break
      case 'download':
        const link = document.createElement('a')
        link.href = file.url
        link.download = file.filename
        link.click()
        break
      case 'delete':
        setFileToDelete(file)
        break
      case 'updated':
        // Refresh the file list when a file is updated
        refetch()
        toast({
          title: "File Updated",
          description: "File has been updated successfully.",
        })
        break
    }
  }

  const handleBulkAction = async (action: string, fileIds: string[]) => {
    try {
      switch (action) {
        case 'download':
          // Download multiple files
          fileIds.forEach(fileId => {
            const file = files.find(f => f.id === fileId)
            if (file) {
              const link = document.createElement('a')
              link.href = file.url
              link.download = file.filename
              link.click()
            }
          })
          break
        case 'makePublic':
          await bulkOperationMutation.mutateAsync({
            fileIds,
            operation: 'makePublic'
          })
          break
        case 'makePrivate':
          await bulkOperationMutation.mutateAsync({
            fileIds,
            operation: 'makePrivate'
          })
          break
        case 'delete':
          // Show confirmation for bulk delete
          if (confirm(`Are you sure you want to delete ${fileIds.length} files?`)) {
            await bulkOperationMutation.mutateAsync({
              fileIds,
              operation: 'delete'
            })
          }
          break
      }
      
      setSelectedFiles([])
      refetch()
      
      toast({
        title: "Bulk Operation Successful",
        description: `Successfully performed ${action} on ${fileIds.length} files.`,
      })
    } catch {
      toast({
        title: "Bulk Operation Failed",
        description: "Failed to perform bulk operation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteFile = async () => {
    if (!fileToDelete) return

    try {
      await deleteMutation.mutateAsync(fileToDelete.id)
      setFileToDelete(null)
      refetch()
      
      toast({
        title: "File Deleted",
        description: "File has been deleted successfully.",
      })
    } catch {
      toast({
        title: "Delete Failed",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUploadComplete = () => {
    setShowUploadDialog(false)
    refetch()
  }

  const clearSelection = () => {
    setSelectedFiles([])
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your images, videos, documents, and other files
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStatsDialog(true)}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Statistics
          </Button>
          
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] min-w-[800px]">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Upload new files to your media library. Drag and drop or click to select files.
                </DialogDescription>
              </DialogHeader>
              <FileUpload
                onUploadComplete={handleUploadComplete}
                onClose={() => setShowUploadDialog(false)}
                multiple={true}
                maxFiles={10}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalFiles}</div>
              <p className="text-xs text-muted-foreground">
                {formatBytes(analytics.totalSize)} total size
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Public Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.publicFiles}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.totalFiles > 0 ? Math.round((analytics.publicFiles / analytics.totalFiles) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Private Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.privateFiles}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.totalFiles > 0 ? Math.round((analytics.privateFiles / analytics.totalFiles) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">File Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(analytics.filesByType).length}</div>
              <p className="text-xs text-muted-foreground">
                Different file types
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <FileFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={() => setFilters({ page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' })}
      />

      {/* View controls and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selectedFiles.length} selected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
            >
              Clear Selection
            </Button>
          </div>
        )}
      </div>

      {/* Files grid/list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading files...</p>
          </div>
        </div>
      ) : files.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No files found</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => setShowUploadDialog(true)}
            >
              Upload your first file
            </Button>
          </div>
        </div>
      ) : (
        <FileGrid
          files={files}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onFileAction={handleFileAction}
          onBulkAction={handleBulkAction}
          viewMode={viewMode}
          showSelection={true}
        />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} files
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrev}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNext}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Statistics Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="min-w-4xl">
          <DialogHeader>
            <DialogTitle>File Statistics</DialogTitle>
            <DialogDescription>
              Detailed statistics about your media library
            </DialogDescription>
          </DialogHeader>
          {statistics && <FileStatistics statistics={statistics} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{fileToDelete?.filename}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
