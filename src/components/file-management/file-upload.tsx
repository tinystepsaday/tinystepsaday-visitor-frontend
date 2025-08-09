"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, File, Image, Video, Music, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useUploadFile } from "@/lib/api"
import { getFileType } from "@/integration/files"
import { formatBytes } from "@/lib/utils"
import type { FileUploadData, UploadProgress } from "@/lib/types"

interface FileUploadProps {
  onUploadComplete?: (file: unknown) => void
  onClose?: () => void
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedTypes?: string[]
}

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const ACCEPTED_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
  'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
  'application/pdf': ['.pdf'],
  // 'application/msword': ['.doc'],
  // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  // 'text/plain': ['.txt'],
}

interface UploadingFile {
  file: File
  progress: UploadProgress
  status: 'uploading' | 'completed' | 'error'
  error?: string
  uploadedFile?: unknown
}

export function FileUpload({ 
  onUploadComplete, 
  onClose, 
  multiple = true, 
  maxFiles = 10,
  maxSize = MAX_FILE_SIZE,
  acceptedTypes = Object.keys(ACCEPTED_TYPES)
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [alt, setAlt] = useState("")
  const [caption, setCaption] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [tags, setTags] = useState("")
  const { toast } = useToast()
  const uploadMutation = useUploadFile()

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: unknown[]) => {
    // Check if alt text and caption are provided
    if (!alt.trim()) {
      toast({
        title: "Alt Text Required",
        description: "Please provide alt text for accessibility before uploading files.",
        variant: "destructive",
      })
      return
    }

    if (!caption.trim()) {
      toast({
        title: "Caption Required",
        description: "Please provide a caption for the file before uploading.",
        variant: "destructive",
      })
      return
    }

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((rejectedFile: unknown) => {
        const { file, errors } = rejectedFile as { file: File; errors: unknown[] }
        const errorMessage = errors.map((error: unknown) => {
          const err = error as { code: string; message: string }
          if (err.code === 'file-too-large') {
            return `File ${file.name} is too large. Maximum size is ${formatBytes(maxSize)}.`
          }
          if (err.code === 'file-invalid-type') {
            return `File ${file.name} has an invalid type.`
          }
          return `File ${file.name} was rejected: ${err.message}`
        }).join(', ')
        
        toast({
          title: "Upload Error",
          description: errorMessage,
          variant: "destructive",
        })
      })
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const newUploadingFiles: UploadingFile[] = acceptedFiles.map(file => ({
        file,
        progress: {
          progress: 0,
          uploaded: 0,
          total: file.size,
          speed: 0,
          timeRemaining: 0,
        },
        status: 'uploading' as const,
      }))

      setUploadingFiles(prev => [...prev, ...newUploadingFiles])

      // Upload each file
      acceptedFiles.forEach(async (file, index) => {
        const uploadIndex = newUploadingFiles.length - acceptedFiles.length + index
        try {
          const uploadData: FileUploadData = {
            file,
            alt: alt.trim(),
            caption: caption.trim(),
            isPublic,
            tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : undefined,
          }

          const uploadedFile = await uploadMutation.mutateAsync(uploadData)

          // Update file status to completed
          setUploadingFiles(prev => 
            prev.map((item, i) => 
              i === uploadIndex 
                ? { ...item, status: 'completed' as const, uploadedFile }
                : item
            )
          )

          onUploadComplete?.(uploadedFile)

          toast({
            title: "Upload Successful",
            description: `File ${file.name} uploaded successfully.`,
          })

        } catch (error) {
          console.error('Upload failed:', error)
          
          setUploadingFiles(prev => 
            prev.map((item, i) => 
              i === uploadIndex 
                ? { 
                    ...item, 
                    status: 'error' as const, 
                    error: error instanceof Error ? error.message : 'Upload failed'
                  }
                : item
            )
          )

          toast({
            title: "Upload Failed",
            description: `Failed to upload ${file.name}. Please try again.`,
            variant: "destructive",
          })
        }
      })
    }
  }, [alt, caption, isPublic, tags, maxSize, toast, uploadMutation, onUploadComplete])

  const removeFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
    maxSize,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = ACCEPTED_TYPES[type as keyof typeof ACCEPTED_TYPES] || []
      return acc
    }, {} as Record<string, string[]>),
  })

  const getFileIcon = (file: File) => {
    const type = getFileType(file.type)
    switch (type) {
      case 'IMAGE':
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="h-8 w-8 text-blue-500" width={32} height={32}/>
      case 'VIDEO':
        return <Video className="h-8 w-8 text-red-500"/>
      case 'AUDIO':
        return <Music className="h-8 w-8 text-green-500" />
      case 'DOCUMENT':
        return <FileText className="h-8 w-8 text-orange-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusIcon = (status: UploadingFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Upload className="h-4 w-4 animate-pulse" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const uploadingCount = uploadingFiles.filter(f => f.status === 'uploading').length
  const completedCount = uploadingFiles.filter(f => f.status === 'completed').length
  const errorCount = uploadingFiles.filter(f => f.status === 'error').length

  return (
    <div className="space-y-4 max-h-[90vh] min-w-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-muted-foreground/25 scrollbar-track-muted-foreground/10">
      {/* Upload area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-9 w-9 text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to select files
        </p>
        <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
          {acceptedTypes.map(type => (
            <Badge key={type} variant="outline">
              {type}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Max file size: {formatBytes(maxSize)} • Max files: {maxFiles}
        </p>
      </div>

      {/* Upload settings */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="alt">Alt Text *</Label>
            <Textarea
              id="alt"
              placeholder="Describe the file for accessibility (required)"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              required
              className="min-h-[60px]"
            />
            <p className="text-xs text-muted-foreground">
              Alt text is required for accessibility and SEO purposes.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption *</Label>
            <Textarea
              id="caption"
              placeholder="Provide a caption for the file (required)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              className="min-h-[60px]"
            />
            <p className="text-xs text-muted-foreground">
              Caption helps users understand the context of the file.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public">Make file public</Label>
          </div>
        </div>
      </div>

      {/* Upload progress */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Upload Progress</h3>
            <div className="flex gap-2 text-sm text-muted-foreground">
              {uploadingCount > 0 && (
                <span>Uploading: {uploadingCount}</span>
              )}
              {completedCount > 0 && (
                <span className="text-green-600">Completed: {completedCount}</span>
              )}
              {errorCount > 0 && (
                <span className="text-red-600">Failed: {errorCount}</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            {uploadingFiles.map((item, index) => (
              <div key={index} className="border rounded-lg p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getFileIcon(item.file)}
                    <div>
                      <p className="font-medium text-sm">{item.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(item.file.size)} • {getFileType(item.file.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {item.status === 'uploading' && (
                  <div className="space-y-2">
                    <Progress value={item.progress.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(item.progress.progress)}%</span>
                      <span>
                        {formatBytes(item.progress.uploaded)} / {formatBytes(item.progress.total)}
                      </span>
                      <span>
                        {item.progress.speed > 0 
                          ? `${formatBytes(item.progress.speed)}/s`
                          : 'Calculating...'
                        }
                      </span>
                    </div>
                  </div>
                )}

                {item.status === 'error' && (
                  <p className="text-sm text-red-600">{item.error}</p>
                )}

                {item.status === 'completed' && (
                  <p className="text-sm text-green-600">Upload completed successfully!</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}
