export default function QuizPageSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 w-full mt-20">
      {/* Header Skeleton */}
      <div className="text-center mb-12 md:mb-16">
        <div className="h-12 md:h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 w-3/4 md:w-2/3 mx-auto animate-pulse"></div>
        <div className="h-6 md:h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-full md:w-4/5 mx-auto animate-pulse"></div>
      </div>

      {/* Search and Filters Skeleton */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Results Summary Skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Quiz Cards Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg animate-pulse"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            {/* Card Header Skeleton */}
            <div className="py-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              {/* Decorative background pattern skeleton */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 transform -translate-x-6 translate-y-6"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
                  <div className="flex items-center gap-2 bg-white/30 dark:bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-black/20">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            
            {/* Card Content Skeleton */}
            <div className="py-4 px-4">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                
                {/* Category badge skeleton */}
                <div className="flex items-center justify-between">
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Button Skeleton */}
            <div className="py-4 px-4">
              <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Why Take Our Quizzes Section Skeleton */}
      <div className="mt-20 text-center">
        <div className="h-10 w-80 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mx-auto mb-6 animate-pulse"></div>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}