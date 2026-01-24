const StoreCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Gradient Header */}
      <div className="h-12 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

      {/* Content */}
      <div className="p-6">
        {/* Icon and Menu */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-indigo-200 rounded-lg"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Store Name */}
        <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardSkeleton;