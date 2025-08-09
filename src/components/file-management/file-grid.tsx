"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, MoreHorizontal, Download, Eye, Edit, Trash2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatBytes, formatDate } from "@/lib/utils"
import { FileUpdateDialog } from "@/components/file-management/file-update-dialog"
import type { MediaFile } from "@/lib/types"

interface FileGridProps {
  files: MediaFile[]
  selectedFiles: string[]
  onFileSelect: (fileId: string, selected: boolean) => void
  onFileAction: (action: string, file: MediaFile) => void
  onBulkAction?: (action: string, fileIds: string[]) => void
  viewMode?: 'grid' | 'list'
  showSelection?: boolean
}

const FILE_TYPE_COLORS = {
  IMAGE: "bg-blue-100 text-blue-800",
  VIDEO: "bg-red-100 text-red-800",
  AUDIO: "bg-green-100 text-green-800",
  DOCUMENT: "bg-orange-100 text-orange-800",
  OTHER: "bg-gray-100 text-gray-800",
}

export function FileGrid({ 
  files, 
  selectedFiles, 
  onFileSelect, 
  onFileAction,
  onBulkAction,
  viewMode = 'grid',
  showSelection = true 
}: FileGridProps) {
  const [hoveredFile, setHoveredFile] = useState<string | null>(null)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [fileToUpdate, setFileToUpdate] = useState<MediaFile | null>(null)

  const handleFileClick = (file: MediaFile) => {
    if (showSelection) {
      onFileSelect(file.id, !selectedFiles.includes(file.id))
    } else {
      onFileAction('view', file)
    }
  }

  const handleBulkAction = (action: string) => {
    if (onBulkAction && selectedFiles.length > 0) {
      onBulkAction(action, selectedFiles)
    }
  }

  const handleFileAction = (action: string, file: MediaFile) => {
    switch (action) {
      case 'edit':
        setFileToUpdate(file)
        setUpdateDialogOpen(true)
        break
      default:
        onFileAction(action, file)
        break
    }
  }

  const handleUpdateComplete = (updatedFile: MediaFile) => {
    // Refresh the file list or update the specific file in the list
    // This will be handled by the parent component through the onFileAction callback
    onFileAction('updated', updatedFile)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You might want to show a toast here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const getFilePreview = (file: MediaFile) => {
    switch (file.type) {
      case 'IMAGE':
        return (
          <Image
            src={file.url}
            alt={file.alt || file.filename}
            width={100}
            height={100}
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
        )
      case 'VIDEO':
        return (
          <video
            src={file.url}
            className="w-full h-full object-cover rounded"
            muted
            preload="metadata"
          />
        )
      case 'AUDIO':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 rounded">
            <span className="text-4xl">🎵</span>
          </div>
        )
      case 'DOCUMENT':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 rounded">
            <span className="text-4xl">📄</span>
          </div>
        )
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded">
            <span className="text-4xl">📁</span>
          </div>
        )
    }
  }

  if (viewMode === 'list') {
    return (
      <>
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className={`
                flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors
                ${selectedFiles.includes(file.id) 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted hover:border-muted-foreground'
                }
              `}
              onClick={() => handleFileClick(file)}
              onMouseEnter={() => setHoveredFile(file.id)}
              onMouseLeave={() => setHoveredFile(null)}
            >
              {/* Selection checkbox */}
              {showSelection && (
                <div className="flex-shrink-0">
                  <div className={`
                    w-5 h-5 border-2 rounded flex items-center justify-center
                    ${selectedFiles.includes(file.id) 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                    }
                  `}>
                    {selectedFiles.includes(file.id) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                </div>
              )}

              {/* File preview */}
              <div className="w-16 h-16 flex-shrink-0">
                {getFilePreview(file)}
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm truncate">{file.filename}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${FILE_TYPE_COLORS[file.type]}`}
                  >
                    {file.type}
                  </Badge>
                  {!file.isPublic && (
                    <Badge variant="secondary" className="text-xs">
                      Private
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {formatBytes(file.size)} • {formatDate(file.createdAt)}
                </p>
                {file.caption && (
                  <p className="text-xs text-muted-foreground truncate">
                    {file.caption}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleFileAction('view', file)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('edit', file)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('download', file)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(file.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleFileAction('delete', file)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* File Update Dialog */}
        <FileUpdateDialog
          file={fileToUpdate}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
          onUpdateComplete={handleUpdateComplete}
        />
      </>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Bulk actions */}
        {showSelection && selectedFiles.length > 0 && onBulkAction && (
          <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleBulkAction('download')}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('makePublic')}>
                Make Public
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('makePrivate')}>
                Make Private
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={`
                group relative aspect-square border rounded-lg cursor-pointer transition-all
                ${selectedFiles.includes(file.id) 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-muted hover:border-muted-foreground hover:shadow-md'
                }
              `}
              onClick={() => handleFileClick(file)}
              onMouseEnter={() => setHoveredFile(file.id)}
              onMouseLeave={() => setHoveredFile(null)}
            >
              {/* Selection overlay */}
              {showSelection && (
                <div className="absolute top-2 left-2 z-10">
                  <div className={`
                    w-5 h-5 border-2 rounded flex items-center justify-center bg-background/80 backdrop-blur-sm
                    ${selectedFiles.includes(file.id) 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                    }
                  `}>
                    {selectedFiles.includes(file.id) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                </div>
              )}

              {/* File preview */}
              <div className="w-full h-full relative overflow-hidden rounded">
                {getFilePreview(file)}
                
                {/* Hover overlay */}
                {hoveredFile === file.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation()
                        handleFileAction('view', file)
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation()
                        handleFileAction('download', file)
                      }}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* File info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
                <p className="text-xs font-medium truncate">{file.filename}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {file.type}
                  </Badge>
                  {!file.isPublic && (
                    <Badge variant="secondary" className="text-xs">
                      Private
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions menu */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleFileAction('view', file)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('edit', file)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('download', file)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(file.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleFileAction('delete', file)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Update Dialog */}
      <FileUpdateDialog
        file={fileToUpdate}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onUpdateComplete={handleUpdateComplete}
      />
    </>
  )
}
