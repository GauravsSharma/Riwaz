const StatCardSkeleton = () => {
  return (
    <div className="relative h-60 w-60 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      {/* Fake gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 opacity-30 rounded-full -mr-16 -mt-16"></div>

      <div className="p-6">
        {/* Icon placeholder */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
        </div>

        {/* Text placeholders */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
