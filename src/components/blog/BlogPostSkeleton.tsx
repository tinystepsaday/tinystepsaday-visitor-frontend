import React from 'react';

const BlogPostSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Article Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        {/* Back to Blog Link Skeleton */}
        <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-12 animate-pulse"></div>
        
        {/* Category and Read Time Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-12 md:h-16 w-full bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
        <div className="h-8 md:h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="h-8 md:h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-8 animate-pulse"></div>

        {/* Author and Date Skeleton */}
        <div className="flex items-center justify-between md:flex-row flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div>
              <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="rounded-2xl overflow-hidden">
          <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Posts Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="group hover:shadow-lg transition-shadow rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="h-40 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-t-2xl animate-pulse"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
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
