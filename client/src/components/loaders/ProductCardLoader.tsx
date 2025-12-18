import React from 'react';

const ProductCardSkeleton = ({ isFromHome = true }) => {
  return (
    <div className={`group cursor-pointer ${isFromHome ? "sm:w-80 w-[48%]" : "sm:w-60 w-[48%]"}`}>
      <div className="relative overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gray-300 h-7 w-20 rounded"></div>
        </div>
        <div className={`w-full ${isFromHome ? "h-92" : "h-80"} bg-gray-300`}></div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;