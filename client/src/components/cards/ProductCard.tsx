
import React from 'react';
import { trimTitle } from '@/utils/trimeTitle';

import Link from 'next/link';
import Image from 'next/image';


const ProductCard = ({ 
  id="",
  image = "/home/tshirt.avif",
  title = "Blue Structured Checks..",
  price = 899,
  originalPrice = 1099,
  discount = 18,
  isFromHome = true
}) => {
 
  return (
   <div className={`group cursor-pointer  ${isFromHome? "sm:w-80 w-[48%]":"sm:w-60 w-[48%]"}`}>
      <div className="relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-purple-500 text-white px-3 py-1 text-sm font-semibold">
            SAVE {discount}%
          </span>
        </div>
        <Link href={`/item/${id}`}>
        
        <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className={`w-full ${isFromHome?"h-80 sm:h-92":"h-80"} object-cover transition-transform duration-500 group-hover:scale-105 rounded md:rounded-none`}
        />
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-lg text-gray-800 line-clamp-2 mb-2">{trimTitle(title)}</h3>
        <div className="flex items-center gap-2">
          <span className="text-purple-700 font-semibold text-lg">₹ {price.toLocaleString('en-IN')+"0.00"}</span>
          <span className="text-gray-400 line-through text-sm">₹ {originalPrice.toLocaleString('en-IN')+"0.00"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;