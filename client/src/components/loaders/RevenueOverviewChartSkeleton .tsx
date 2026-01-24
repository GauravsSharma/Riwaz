const RevenueOverviewChartSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-9 w-32 bg-gray-200 rounded-md"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-28 bg-gray-300 rounded"></div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="h-72 w-full bg-gray-100 rounded-lg relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-shimmer"></div>
        
        {/* Y-axis lines */}
        <div className="absolute left-0 top-0 bottom-0 w-full flex flex-col justify-between p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-px bg-gray-200 w-full"></div>
          ))}
        </div>

        {/* Mock chart line */}
        <svg className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
          <path
            d="M 0,80 Q 25,60 50,70 T 100,50"
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
};

export default RevenueOverviewChartSkeleton;