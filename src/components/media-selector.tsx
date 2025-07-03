"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import { useMediaFiles, useUploadMedia } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { MediaFile } from "@/lib/types"
import Image from "next/image"

interface MediaSelectorProps {
  onSelect: (media: { url: string; alt?: string; caption?: string }) => void
  trigger?: React.ReactNode
}

export function MediaSelector({ onSelect, trigger }: MediaSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [caption, setCaption] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)

  const { data: mediaFiles = [] } = useMediaFiles()
  const uploadMutation = useUploadMedia()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      const result = await uploadMutation.mutateAsync({
        file: selectedFile,
        alt,
        caption,
      })
      onSelect({ url: result.url, alt: result.alt, caption: result.caption })
      setOpen(false)
      resetForm()
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const handleLinkSubmit = () => {
    if (!linkUrl) return
    onSelect({ url: linkUrl, alt, caption })
    setOpen(false)
    resetForm()
  }

  const handleMediaSelect = () => {
    if (!selectedMedia) return
    onSelect({
      url: selectedMedia.url,
      alt: selectedMedia.alt,
      caption: selectedMedia.caption,
    })
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setSelectedFile(null)
    setLinkUrl("")
    setAlt("")
    setCaption("")
    setSelectedMedia(null)
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>Choose from your existing media, upload a new file, or add a link.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="existing">Existing Media</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="link">Add Link</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-4 gap-4 p-4">
                {mediaFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-2 transition-colors ${
                      selectedMedia?.id === file.id ? "border-primary" : "border-muted hover:border-muted-foreground"
                    }`}
                    onClick={() => setSelectedMedia(file)}
                  >
                    <Image
                      src={file.url || "/placeholder.svg"}
                      alt={file.alt || file.name}
                      width={100}
                      height={100}
                      className="aspect-square w-full rounded object-cover"
                    />
                    <p className="mt-2 truncate text-xs">{file.name}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            {selectedMedia && (
              <div className="space-y-2">
                <Label htmlFor="existing-alt">Alt Text</Label>
                <Input
                  id="existing-alt"
                  value={selectedMedia.alt || ""}
                  onChange={(e) => setSelectedMedia({ ...selectedMedia, alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
                <Label htmlFor="existing-caption">Caption</Label>
                <Textarea
                  id="existing-caption"
                  value={selectedMedia.caption || ""}
                  onChange={(e) => setSelectedMedia({ ...selectedMedia, caption: e.target.value })}
                  placeholder="Optional caption for the image"
                />
                <Button onClick={handleMediaSelect} className="w-full">
                  Use Selected Media
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Choose File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{selectedFile.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upload-alt">Alt Text</Label>
                    <Input
                      id="upload-alt"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      placeholder="Describe the image for accessibility"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upload-caption">Caption</Label>
                    <Textarea
                      id="upload-caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Optional caption for the image"
                    />
                  </div>

                  <Button onClick={handleUpload} disabled={uploadMutation.isPending} className="w-full">
                    {uploadMutation.isPending ? "Uploading..." : "Upload & Use"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="link-url">Image URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-alt">Alt Text</Label>
                <Input
                  id="link-alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-caption">Caption</Label>
                <Textarea
                  id="link-caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Optional caption for the image"
                />
              </div>

              <Button onClick={handleLinkSubmit} disabled={!linkUrl} className="w-full">
                Use Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 