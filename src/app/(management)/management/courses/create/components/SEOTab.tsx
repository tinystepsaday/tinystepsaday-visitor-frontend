"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import type { CourseFormData } from "../types"

interface SEOTabProps {
  form: UseFormReturn<CourseFormData>
}

export function SEOTab({ form }: SEOTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize your course for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="seo.metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="SEO title (max 60 characters)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="SEO description (max 160 characters)"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.altText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="Describe the thumbnail image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Caption</FormLabel>
              <FormControl>
                <Input placeholder="Optional caption for the thumbnail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
} 