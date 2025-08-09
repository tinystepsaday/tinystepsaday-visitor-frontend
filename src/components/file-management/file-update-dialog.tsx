"use client"

import { useState, useEffect } from "react"
import { Save, Image as ImageIcon, Video, Music, FileText, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useUpdateFile } from "@/lib/api"
import { formatBytes, formatDate } from "@/lib/utils"
import type { MediaFile, FileUpdateData } from "@/lib/types"

interface FileUpdateDialogProps {
  file: MediaFile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateComplete?: (updatedFile: MediaFile) => void
}

export function FileUpdateDialog({
  file,
  open,
  onOpenChange,
  onUpdateComplete
}: FileUpdateDialogProps) {
  const [alt, setAlt] = useState("")
  const [caption, setCaption] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [tags, setTags] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const updateMutation = useUpdateFile()

  // Initialize form when file changes
  useEffect(() => {
    if (file) {
      setAlt(file.alt || "")
      setCaption(file.caption || "")
      setIsPublic(file.isPublic)
      setTags(file.tags?.join(", ") || "")
    }
  }, [file])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    try {
      const updateData: FileUpdateData = {
        alt: alt.trim() || undefined,
        caption: caption.trim() || undefined,
        isPublic,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
      }

      const updatedFile = await updateMutation.mutateAsync({
        id: file.id,
        data: updateData
      })

      toast({
        title: "File Updated",
        description: "File metadata has been updated successfully.",
      })

      onUpdateComplete?.(updatedFile)
      onOpenChange(false)
    } catch (error) {
      console.error('Update failed:', error)
      toast({
        title: "Update Failed",
        description: "Failed to update file metadata. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case 'VIDEO':
        return <Video className="h-8 w-8 text-red-500" />
      case 'AUDIO':
        return <Music className="h-8 w-8 text-green-500" />
      case 'DOCUMENT':
        return <FileText className="h-8 w-8 text-orange-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  if (!file) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update File Metadata</DialogTitle>
          <DialogDescription>
            Update the metadata for &quot;{file.filename}&quot;
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Preview */}
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              {getFileIcon(file.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{file.filename}</h3>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)} • {file.type} • {formatDate(file.createdAt)}
              </p>
              {file.width && file.height && (
                <p className="text-xs text-muted-foreground">
                  {file.width} × {file.height} pixels
                </p>
              )}
            </div>
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <Label htmlFor="alt">Alt Text *</Label>
            <Textarea
              id="alt"
              placeholder="Describe the file for accessibility (required)"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              required
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              Alt text is required for accessibility and SEO purposes.
            </p>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption *</Label>
            <Textarea
              id="caption"
              placeholder="Provide a caption for the file (required)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              Caption helps users understand the context of the file.
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Tags help organize and search for files.
            </p>
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public">Make file public</Label>
          </div>

          {/* Current Tags Display */}
          {file.tags && file.tags.length > 0 && (
            <div className="space-y-2">
              <Label>Current Tags</Label>
              <div className="flex flex-wrap gap-2">
                {file.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !alt.trim() || !caption.trim()}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update File
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
