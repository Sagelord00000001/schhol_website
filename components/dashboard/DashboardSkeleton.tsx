export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header Skeleton */}
        <div className="morphism-card p-8 mb-8 animate-pulse">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-gray-700"></div>
            <div className="flex-1">
              <div className="h-8 w-64 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="morphism-card p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-8 bg-gray-700 rounded"></div>
                <div className="h-5 w-5 bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 w-16 bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 morphism-card p-6 animate-pulse">
            <div className="h-6 w-48 bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
          <div className="morphism-card p-6 animate-pulse">
            <div className="h-6 w-32 bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
