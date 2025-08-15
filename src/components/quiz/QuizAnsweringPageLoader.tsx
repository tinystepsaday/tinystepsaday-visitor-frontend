export function QuizAnsweringPageLoader() {
  return (
    <div className="flex flex-col items-center justify-start gap-8 md:gap-16 mb-8 md:mb-16 w-full">
      {/* Header Section Skeleton */}
      <div className="w-full bg-muted/50">
        <div className="flex items-center justify-between w-full p-4 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
            <div className="h-5 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
            <div className="h-10 w-10 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 w-full">
        {/* Progress and Timer Skeleton */}
        <div className="text-center space-y-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-muted animate-pulse rounded" />
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="h-2 w-full bg-muted animate-pulse rounded" />
        </div>

        {/* Question Card Skeleton */}
        <div className="w-full border rounded-lg p-6">
          <div className="space-y-4">
            {/* Question Text Skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-5 w-1/2 bg-muted animate-pulse rounded" />
            </div>
            
            {/* Options Skeleton */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded-full" />
                  <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-between w-full">
          <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
