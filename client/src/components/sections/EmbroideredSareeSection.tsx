import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface SareeProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
  colors: string[];
}

const SareeCard = ({ product }: { product: SareeProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
        {product.discount}% OFF
      </div>

      {/* Favorite Button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <Heart 
          className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
      
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Color Options */}
        <div className="flex gap-2 mb-4">
          {product.colors.map((color, index) => (
            <div 
              key={index}
              className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-600 transition-colors duration-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
          <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default function EmbroideredSareeSection() {
  const sarees: SareeProduct[] = [
    {
      id: 1,
      name: "Royal Embroidered Banarasi Silk Saree with Golden Zari Work",
      price: 4999,
      originalPrice: 8999,
      image: "/images/design.jpg",
      rating: 5,
      reviews: 234,
      discount: 44,
      colors: ["#8B4513", "#DAA520", "#CD853F"]
    },
    {
      id: 2,
      name: "Designer Embroidered Net Saree with Floral Pattern",
      price: 3499,
      originalPrice: 6999,
      image: "/images/floraldesign.jpg",
      rating: 4,
      reviews: 189,
      discount: 50,
      colors: ["#FF69B4", "#FFB6C1", "#DDA0DD"]
    },
    
    {
      id: 4,
      name: "Elegant Chiffon Embroidered Saree with Pearl Details",
      price: 2999,
      originalPrice: 5999,
      image: "/images/chiffon.webp",
      rating: 4,
      reviews: 156,
      discount: 50,
      colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD"]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-purple-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-pink-600 text-sm font-semibold uppercase tracking-widest bg-pink-100 px-6 py-2 rounded-full">
              ✨ Trending Collection
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Embroidered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"> Saree </span>
            Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked embroidered sarees with intricate designs and premium fabrics. Perfect for weddings, festivals, and special occasions.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sarees.map((saree) => (
            <SareeCard key={saree.id} product={saree} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="group bg-gradient-to-r from-pink-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            View All Embroidered Sarees
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
