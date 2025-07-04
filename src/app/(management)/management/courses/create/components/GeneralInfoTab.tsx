"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MediaSelector } from "@/components/media-selector"
import Image from "next/image"
import type { UseFormReturn } from "react-hook-form"
import type { CourseFormData } from "../types"

interface GeneralInfoTabProps {
  form: UseFormReturn<CourseFormData>
  thumbnail: string
  onThumbnailChange: (thumbnail: string) => void
  onTitleChange: (title: string) => void
}

export function GeneralInfoTab({ form, thumbnail, onThumbnailChange, onTitleChange }: GeneralInfoTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Basic details about your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course title..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        onTitleChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="course-url-slug" {...field} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what students will learn..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="99.99"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="120"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Total course duration in minutes</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Thumbnail</CardTitle>
          </CardHeader>
          <CardContent>
            {thumbnail ? (
              <div className="space-y-2">
                <Image
                  src={thumbnail || "/placeholder.svg"}
                  alt="Course thumbnail"
                  className="w-full h-32 object-cover rounded-md"
                  width={200}
                  height={200}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => onThumbnailChange("")}>
                  Remove Image
                </Button>
              </div>
            ) : (
              <MediaSelector
                onSelect={(media) => onThumbnailChange(media.url)}
                trigger={
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Select Thumbnail
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 