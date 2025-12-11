import React, { useState } from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import Image from 'next/image';
interface CartCardProps {
  title: string;
  color: string;
  price: number;
  thumbnail: string;
 quan: number;
}
const Cart_Card = (
  { title, color, price, thumbnail, quan }: CartCardProps
) => {
  const [quantity, setQuantity] = useState(quan);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (type:"increase"|"decrease") => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
          {/* Product Image */}
          <div className="w-32 h-32 flex-shrink-0">
            <img 
              src={thumbnail}
              alt="Peach Sheer Pattern Oversize Drop Shoulder Shirt"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
             {title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                Color: {color.toUpperCase() }<span className={`w-4 h-4 rounded-full border bg-${color}-500 border-gray-300`}></span>
              </span>
            </div>
            
            {/* Quantity and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">QTY</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-1 border-l border-r border-gray-300 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
                <span className="text-sm">REMOVE</span>
              </button>
            </div>
          </div>
          
          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₹{price}.00</div>
            <div className="text-sm text-green-600 font-medium">(41% off)</div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Product Image and Basic Info */}
          <div className="flex gap-3 p-3">
            <div className="w-20 h-20 flex-shrink-0">
              <Image
              height={80}
                width={80} 
                src={thumbnail}
                alt="Peach Sheer Pattern Oversize Drop Shoulder Shirt"
                className="w-full h-full object-cover rounded"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
               {title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <span className="flex items-center gap-1">
                  Color: {color.toUpperCase() }<span className={`w-3 h-3 rounded-full border bg-${color}-500 border-gray-300`}></span>
                </span>
            
              </div>
            
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">₹{price}.00</span>
                <span className="text-sm text-green-600 font-medium">(41% off)</span>
              </div>
            </div>
          </div>
          
          {/* Quantity and Actions */}
          <div className="px-3 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">QTY</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-2 py-1 border-l border-r border-gray-300 min-w-[32px] text-center text-sm">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
                <span className="text-sm">REMOVE</span>
              </button>
              
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_Card;