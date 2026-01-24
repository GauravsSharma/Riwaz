const OrderStatsFilterSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-12 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="h-9 w-24 bg-gray-200 rounded-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatsFilterSkeleton;