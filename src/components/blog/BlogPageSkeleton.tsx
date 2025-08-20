import React from 'react';

const BlogPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 md:h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 w-3/4 md:w-2/3 mx-auto animate-pulse"></div>
        <div className="h-6 md:h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-full md:w-4/5 mx-auto animate-pulse"></div>
      </div>

      {/* Search and Filter Skeleton */}
      <div className="flex flex-col gap-4 mb-12 mt-8 max-w-7xl mx-auto justify-between w-full items-center">
        <div className="flex justify-between items-center w-full gap-4 flex-wrap md:flex-nowrap">
          {/* Search Input Skeleton */}
          <div className="relative flex-grow w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>
            <div className="w-full h-10 pl-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          
          {/* Category Buttons Skeleton */}
          <div className="flex gap-2 flex-wrap pb-2 md:pb-0 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-20 md:w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Tags Filter Skeleton */}
        <div className="flex gap-2 overflow-x-scroll pb-2 md:pb-0 max-w-7xl mx-auto justify-center w-full pl-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Featured Post Skeleton */}
      <div className="mb-16 max-w-7xl mx-auto border border-gray-200 dark:border-gray-700 rounded-2xl">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured Image Skeleton */}
            <div className="h-full overflow-hidden">
              <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
            
            {/* Featured Content Skeleton */}
            <div className="p-6 md:p-8 flex flex-col justify-between h-full">
              <div>
                {/* Category and Date Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
                
                {/* Title Skeleton */}
                <div className="h-8 md:h-10 w-full bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                
                {/* Stats Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group hover:shadow-lg transition-shadow rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Post Image Skeleton */}
              <div className="h-48 overflow-hidden">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-t-2xl animate-pulse"></div>
              </div>
              
              {/* Post Content Skeleton */}
              <div className="p-6">
                {/* Category and Date Skeleton */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
                
                {/* Title Skeleton */}
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                
                {/* Excerpt Skeleton */}
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                
                {/* Stats Skeleton */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;