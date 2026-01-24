const ProductVariantsTableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Parent Product Rows */}
      {[1, 2].map((parentIdx) => (
        <div key={parentIdx} className="border-b border-gray-200">
          {/* Parent Row */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white items-center">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="px-3 py-1 bg-purple-200 rounded w-16 h-6"></div>
              <div className="h-5 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded"></div>
            <div className="h-4 w-8 bg-gray-200 rounded"></div>
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-blue-200 rounded"></div>
          </div>

          {/* Variant Rows */}
          {[1, 2, 3].map((variantIdx) => (
            <div 
              key={variantIdx} 
              className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 items-center border-t border-gray-100"
            >
              <div className="flex items-center gap-3 pl-8">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-8 bg-gray-300 rounded"></div>
              <div className="px-3 py-1 bg-green-100 rounded w-16 h-6"></div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-200">
        <div className="h-9 w-20 bg-gray-200 rounded"></div>
        <div className="h-9 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductVariantsTableSkeleton;