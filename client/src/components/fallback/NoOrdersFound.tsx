import { Package, ShoppingBag, TrendingUp } from 'lucide-react';

const NoOrdersFound = () => {
  return (
    <div className="flex w-full items-center justify-center h-screen px-4">
      <div className="max-w-xl w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full animate-pulse"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Orders Yet
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your order list is empty. When customers place orders, they&apos;ll appear here for you to manage.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
            <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Track Orders</p>
            <p className="text-xs text-gray-500 mt-1">Real-time updates</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Grow Sales</p>
            <p className="text-xs text-gray-500 mt-1">Monitor performance</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
          <p className="font-medium mb-2">Ready to get started?</p>
          <p className="text-sm text-purple-100">
            Share your store link with customers and start receiving orders!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoOrdersFound;