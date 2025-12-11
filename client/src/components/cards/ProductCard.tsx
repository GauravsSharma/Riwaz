
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useUserStore } from '@/stores/user.store';
import { trimTitle } from '@/utils/trimeTitle';
import { useRouter } from 'next/navigation';


const ProductCard = ({ 
  id="",
  image = "/home/tshirt.avif",
  title = "Blue Structured Checks..",
  price = 899,
  originalPrice = 1099,
  discount = 18,
  onWishlist = () => console.log('Wishlist clicked'),
  className = ""
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
    const router = useRouter();
  const handleWishlistClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist();
  };

  const handleViewDetails = () => {
    router.push(`/item/${id}`);
  };

  return (
   <div className="group cursor-pointer w-80">
      <div className="relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-400 text-white px-3 py-1 text-sm font-semibold">
            SAVE {discount}%
          </span>
        </div>
        <img
        onClick={handleViewDetails}
          src={image}
          alt={title}
          className="w-full h-92 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg text-gray-800 line-clamp-2 mb-2">{trimTitle(title)}</h3>
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-semibold text-lg">₹ {price.toLocaleString('en-IN')+"0.00"}</span>
          <span className="text-gray-400 line-through text-sm">₹ {originalPrice.toLocaleString('en-IN')+"0.00"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;