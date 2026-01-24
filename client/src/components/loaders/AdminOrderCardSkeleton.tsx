const AdminOrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div>
              <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Status and Payment Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-40 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-36 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="mb-4">
          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded border border-gray-200"></div>
                <div className="h-3 w-8 bg-gray-200 rounded mt-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Update Section */}
        <div className="mb-4">
          <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-24 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCardSkeleton;