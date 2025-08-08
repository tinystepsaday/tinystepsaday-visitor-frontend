"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ImageIcon, X, Grid, List } from "lucide-react"
import { useFiles } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-management/file-upload"
import { FileGrid } from "@/components/file-management/file-grid"
import { FileFilters } from "@/components/file-management/file-filters"
import type { MediaFile, FileQueryParams } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface MediaSelectorProps {
  onSelect: (media: { url: string; alt?: string; caption?: string }) => void
  trigger?: React.ReactNode
  multiple?: boolean
  maxFiles?: number
  acceptedTypes?: string[]
}

export function MediaSelector({ 
  onSelect, 
  trigger, 
  multiple = false,
  maxFiles = 1,
  acceptedTypes = ['image/*']
}: MediaSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<FileQueryParams>({
    page: 1,
    limit: 20,
    type: 'IMAGE', // Default to images for media selector
  })
  const { toast } = useToast()

  const { data: filesResponse, isLoading, refetch } = useFiles(filters)

  const files = filesResponse?.data || []
  const pagination = filesResponse?.pagination

  const handleFileSelect = (file: MediaFile) => {
    if (multiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.some(f => f.id === file.id)
        if (isSelected) {
          return prev.filter(f => f.id !== file.id)
        } else {
          if (prev.length >= maxFiles) {
            toast({
              title: "Selection Limit Reached",
              description: `You can only select up to ${maxFiles} file${maxFiles !== 1 ? 's' : ''}.`,
              variant: "destructive",
            })
            return prev
          }
          return [...prev, file]
        }
      })
    } else {
      setSelectedFiles([file])
    }
  }

  const handleFileAction = (action: string, file: MediaFile) => {
    switch (action) {
      case 'view':
        window.open(file.url, '_blank')
        break
      case 'download':
        const link = document.createElement('a')
        link.href = file.url
        link.download = file.filename
        link.click()
        break
      case 'select':
        handleFileSelect(file)
        break
    }
  }

  const handleUploadComplete = (file: unknown) => {
    // Type guard to ensure file is MediaFile
    if (file && typeof file === 'object' && 'id' in file && 'url' in file) {
      const mediaFile = file as MediaFile
      // Auto-select the uploaded file
      if (!multiple) {
        setSelectedFiles([mediaFile])
      } else if (selectedFiles.length < maxFiles) {
        setSelectedFiles(prev => [...prev, mediaFile])
      }
      
      // Refetch files to show the new upload
      refetch()
    }
  }

  const handleConfirmSelection = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file.",
        variant: "destructive",
      })
      return
    }

    // Call onSelect for each selected file
    selectedFiles.forEach(file => {
      onSelect({
        url: file.url,
        alt: file.alt,
        caption: file.caption,
      })
    })

    setOpen(false)
    setSelectedFiles([])
  }

  const handleFiltersChange = (newFilters: FileQueryParams) => {
    setFilters({ ...newFilters, page: 1 }) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <ImageIcon className="mr-2 h-4 w-4" />
            Select Media
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose from your existing media or upload new files.
            {multiple && ` You can select up to ${maxFiles} file${maxFiles !== 1 ? 's' : ''}.`}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing Media</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            {/* Filters */}
            <FileFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={() => setFilters({ page: 1, limit: 20, type: 'IMAGE' })}
            />

            {/* View controls */}
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
                    onClick={() => setSelectedFiles([])}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {/* Files grid/list */}
            <ScrollArea className="h-[400px]">
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
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No files found</p>
                  </div>
                </div>
              ) : (
                <FileGrid
                  files={files}
                  selectedFiles={selectedFiles.map(f => f.id)}
                  onFileSelect={(fileId) => {
                    const file = files.find(f => f.id === fileId)
                    if (file) {
                      handleFileSelect(file)
                    }
                  }}
                  onFileAction={handleFileAction}
                  viewMode={viewMode}
                  showSelection={true}
                />
              )}
            </ScrollArea>

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

            {/* Selection summary */}
            {selectedFiles.length > 0 && (
              <div className="border rounded-lg p-4 space-y-2">
                <h4 className="font-medium">Selected Files:</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={file.url}
                          alt={file.alt || file.filename}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span className="text-sm">{file.filename}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFiles(prev => prev.filter(f => f.id !== file.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmSelection} disabled={selectedFiles.length === 0}>
                {multiple ? `Select ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}` : 'Select File'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <FileUpload
              onUploadComplete={handleUploadComplete}
              onClose={() => setOpen(false)}
              multiple={multiple}
              maxFiles={maxFiles}
              acceptedTypes={acceptedTypes}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 