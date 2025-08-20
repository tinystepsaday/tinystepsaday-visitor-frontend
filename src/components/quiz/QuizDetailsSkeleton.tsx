import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const QuizDetailsSkeleton = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex items-start justify-between w-full gap-2">
            {/* Back Button Skeleton */}
            <Skeleton className="w-32 h-10 rounded-md" />
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            {/* Title Skeleton */}
            <Skeleton className="h-12 md:h-16 w-3/4" />
            {/* Subtitle Skeleton */}
            <Skeleton className="h-6 md:h-8 w-full max-w-3xl" />
          </div>
        </div>
      </div>

      {/* Hero Section with CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 md:p-8">
        <div className="flex items-center flex-wrap gap-4 mb-6">
          {/* Category Badge Skeleton */}
          <Skeleton className="w-24 h-6 rounded-full" />
          {/* Time Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-48 h-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Questions Count Skeleton */}
            <div className="text-center space-y-2">
              <Skeleton className="w-16 h-10 rounded-md" />
              <Skeleton className="w-20 h-4" />
            </div>
            {/* Start Button Skeleton */}
            <Skeleton className="w-40 h-14 rounded-md" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quiz Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Description */}
          <div className="border rounded-lg p-6">
            <Skeleton className="w-48 h-6 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="border rounded-lg p-6">
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-96 h-5 mb-6" />
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <div className="border rounded-lg p-6">
            <Skeleton className="w-32 h-6 mb-4" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="border rounded-lg p-6">
            <Skeleton className="w-32 h-6 mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-18 h-6 rounded-full" />
              <Skeleton className="w-14 h-6 rounded-full" />
            </div>
          </div>

          {/* Quick Start */}
          <div className="border rounded-lg p-6">
            <Skeleton className="w-32 h-6 mb-4" />
            <div className="space-y-3">
              <Skeleton className="w-full h-12 rounded-md" />
              <div className="text-center">
                <Skeleton className="w-48 h-3 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsSkeleton;
