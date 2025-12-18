import React from 'react';

const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 mt-24 sm:mt-32">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Side - Image Gallery */}
        <div className="space-y-3">
          {/* Main Image - Shows first on mobile */}
          <div className="w-full">
            <div className="relative w-full aspect-[3/4] bg-gray-200 rounded-lg animate-pulse">
              {/* NEW ARRIVAL Badge */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 h-7 w-24 md:h-8 md:w-28 bg-gray-300 rounded animate-pulse"></div>
              {/* Discount Badge */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 h-7 w-16 md:h-8 md:w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Thumbnail Row - Shows below main image on mobile */}
          <div className="flex gap-2 md:gap-3 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-20 md:w-20 md:h-24 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Share Button */}

          {/* Product Title */}
          <div className="space-y-2 lg:space-y-3">
            <div className="h-7 lg:h-8 w-full lg:w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 lg:h-8 w-3/4 lg:w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="h-5 lg:h-6 w-16 lg:w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 lg:h-10 w-28 lg:w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 lg:h-8 w-16 lg:w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Tax Info */}
          <div className="h-4 w-36 lg:w-40 bg-gray-200 rounded animate-pulse"></div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-4 lg:h-5 lg:w-5 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Purchase Info Box */}
          <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="h-7 w-7 lg:h-8 lg:w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-44 lg:w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Exclusive Discounts Box */}
          <div className="border border-blue-100 bg-blue-50 p-3 lg:p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-44 lg:w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 lg:w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-28 lg:w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Quantity Section */}
          <div className="space-y-2 lg:space-y-3">
            <div className="h-5 lg:h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="h-11 w-11 lg:h-12 lg:w-12 bg-gray-200 rounded border border-gray-300 animate-pulse"></div>
              <div className="h-11 w-14 lg:h-12 lg:w-16 bg-gray-200 rounded border border-gray-300 animate-pulse"></div>
              <div className="h-11 w-11 lg:h-12 lg:w-12 bg-gray-200 rounded border border-gray-300 animate-pulse"></div>
            </div>
          </div>

          {/* Delivery Section */}
          <div className="space-y-2 lg:space-y-3">
            <div className="h-5 lg:h-6 w-44 lg:w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-2 lg:gap-3">
              <div className="flex-1 h-11 lg:h-12 bg-gray-200 rounded border border-gray-300 animate-pulse"></div>
              <div className="h-11 w-24 lg:h-12 lg:w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 lg:h-5 lg:w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-52 lg:w-56 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 h-12 w-12 lg:h-14 lg:w-14 bg-gray-200 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
};

export default ProductPageSkeleton;