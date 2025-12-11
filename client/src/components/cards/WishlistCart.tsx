import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import Image from 'next/image';

const WishlistCart = () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-sm">
            {/* Product Image */}
            <div className="relative bg-gray-100">
                <Image
                    height={320}
                    width={320}
                    src="/home/shirt.avif"
                    alt="Off White Regular Fit Full Sleeve Cardigan"
                    className="w-full h-80 object-cover"
                />
                {/* Heart Icon */}
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                    <Heart
                        className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
                {/* Product Title */}
                <h3 className="text-gray-800 font-medium text-md mb-2 leading-tight">
                    Off White Regular Fit Full Sleeve...
                </h3>

                {/* Price Section */}
                <div className="flex items-center gap-2 justify-center text-center mb-4">
                    <span className="text-xl font-bold text-gray-700">₹799</span>
                    <span className="text-sm text-gray-500 line-through">₹1199</span>
                    <span className="text-sm text-green-600 font-medium">(33% OFF)</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-2 text-gray-700 font-medium text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        REMOVE
                    </button>
                    <button className="flex-1 py-2.5 px-2 bg-red-500 text-white font-medium text-xs rounded hover:bg-red-600 transition-colors">
                        MOVE TO BAG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCart;