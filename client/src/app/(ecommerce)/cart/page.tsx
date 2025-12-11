"use client";
import React, { useState } from 'react';
import { Minus, Plus, Trash2, Heart, Tag, Truck } from 'lucide-react';
import Cart_Card from '@/components/cards/Cart_Card';
import { useGetCartItems } from '@/hooks/buyer/useUserCart';
import { useUserCart } from '@/stores/buyer/cart.user';

const ShoppingCartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const {isPending} = useGetCartItems()
  const items = useUserCart((s) => s.items);
  if(isPending){
    return <div>Loading...</div>
  }
  console.log(items);
  const handleCouponToggle = () => {
    setShowCouponInput(!showCouponInput);
  };

  const basePrice = 699;
  const mrp = 1199;
  const discount = mrp - basePrice;
  const totalAmount = basePrice * quantity;
  const totalMRP = mrp * quantity;

  return (
    <div className="min-h-screen bg-gray-50 relative mt-34">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Shopping cart</h1>
                <div className="text-base md:text-lg font-semibold text-gray-900">
                  Total: ₹{totalMRP.toFixed(2)}
                </div>
              </div>

              {/* Cart Item */}
            {
              items && items.length > 0 ? (
                items.map((item) => (
                  <Cart_Card 
                    key={item.productId}
                    title={item.title}
                    color={item.color}
                    price={item.unitPrice}  
                    thumbnail={item.thumbnail}
                    quan={item.quantity}
                    ={
                  />
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">Your cart is empty.</div>
              )
            }
            </div>
          </div>

          {/* Price Details Section */}
          <div className="xl:col-span-1 h-screen sticky top-6 right-0">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Price Details</h2>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total MRP</span>
                  <span className="font-medium">₹{totalMRP.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount on MRP</span>
                  <span className="font-medium text-green-600">-₹{(discount * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-red-500">Free Delivery</span>
                </div>
              </div>

              {/* Free Delivery Badge */}
              <div className="flex items-center gap-2 mb-4 md:mb-6 p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-600 flex-shrink-0" size={16} />
                <span className="text-sm font-medium text-green-700">Free delivery order over ₹499</span>
              </div>

              {/* Coupon Section */}
              <div className="mb-4 md:mb-6">
                <button
                  onClick={handleCouponToggle}
                  className="flex items-center gap-2 w-full p-3 border border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                >
                  <Tag size={16} />
                  <span className="font-medium">Apply coupon</span>
                </button>
                
                {showCouponInput && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Total and Checkout */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg font-semibold text-gray-700">Total Amount</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;