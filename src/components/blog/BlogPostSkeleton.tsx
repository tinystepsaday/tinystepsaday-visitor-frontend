import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Article Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        {/* Back to Blog Link Skeleton */}
        <Skeleton className="w-32 h-6 mb-12" />
        
        {/* Category and Read Time Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-20 h-4" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-12 md:h-16 w-full mb-6" />
        <Skeleton className="h-8 md:h-10 w-3/4 mb-2" />
        <Skeleton className="h-8 md:h-10 w-2/3 mb-8" />

        {/* Author and Date Skeleton */}
        <div className="flex items-center justify-between md:flex-row flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="w-32 h-5 mb-1" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-64 md:h-96" />
        </div>
      </div>

      {/* Article Content Skeleton */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          ))}
        </div>
      </section>

      {/* Related Posts Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-border pt-8">
          <Skeleton className="w-48 h-8 mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="group hover:shadow-lg transition-shadow rounded-2xl border border-border bg-card">
                <div className="h-40 overflow-hidden">
                  <Skeleton className="w-full h-full rounded-t-2xl" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="w-16 h-4 rounded-full" />
                    <Skeleton className="w-20 h-3" />
                  </div>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
