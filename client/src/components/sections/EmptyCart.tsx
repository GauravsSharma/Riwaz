import React from 'react';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const EmptyCart: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 mt-30">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Cart Icon */}
        <div className="relative inline-block mb-8">
          {/* Background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-blue-50 rounded-full animate-ping opacity-20"></div>
          </div>
          
          {/* Cart Icon */}
          <div className="relative bg-white p-8 rounded-full shadow-xl">
            <ShoppingCart className="w-20 h-20 text-gray-400" strokeWidth={1.5} />
          </div>
          
          {/* Floating sparkle */}
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-lg text-gray-600 mb-8">
         Looks like you haven&apos;t added anything to your cart yet.

          <br className="hidden sm:block" />
          Start shopping and fill it with amazing products!
        </p>

        {/* Primary CTA */}
        <Link 
          href="/product-category"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl mb-12"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free Shipping on Orders Above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Easy Returns & Exchanges</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;