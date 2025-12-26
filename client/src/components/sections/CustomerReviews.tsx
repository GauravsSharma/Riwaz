import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

// Types
interface Review {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
  product: string;
}

// Star Rating Component
const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  rating, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} fill-current ${
            star <= rating ? 'text-purple-900' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

// Review Card Component
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="shrink-0 w-64 bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="mb-4 relative h-40 w-full">
        <Image
          src={review.image}
          alt={review.product}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-700 line-clamp-3 min-h-15">
          {review.comment}
        </p>
      </div>
      
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>
      
      <div className="border-t pt-3">
        <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
        <p className="text-xs text-gray-500 mt-1 truncate">{review.product}</p>
      </div>
    </div>
  );
};

// Navigation Button Component
const NavButton: React.FC<{
  direction: 'left' | 'right';
  onClick: () => void;
}> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
      style={{
        [direction]: '-20px'
      }}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      ) : (
        <ChevronRight className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

// Main Component
const CustomerReviews: React.FC = () => {
  
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Swagata Sarkar',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
      rating: 5,
      comment: 'Best at this price. Not accepting that good quality but I am happy...',
      product: 'Shweta Tiwari...'
    },
    {
      id: 2,
      name: 'Neha',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=300&fit=crop',
      rating: 5,
      comment: "Wasn't sure before buying but it turned out perfect",
      product: 'Shweta Tiwari...'
    },
    {
      id: 3,
      name: 'Vinita Verma',
      image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400&h=300&fit=crop',
      rating: 5,
      comment: "The fabric quality is very good, doesn't feel like it's only 1649... A...",
      product: 'Mouni Roy Crimso...'
    },
    {
      id: 4,
      name: 'Nisha Kumari',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=300&fit=crop',
      rating: 5,
      comment: 'Shweta Tiwari wali saree sabse bestest nikli ❤️ Mujhe bohot...',
      product: 'Shweta Tiwari...'
    },
    {
      id: 5,
      name: 'Simran Shah',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
      rating: 5,
      comment: "Desaign wise It's really preety in this price the quality of this...",
      product: 'Shweta Tiwari...'
    }
  ];

  const scrollLeft = () => {
    const container = document.getElementById('reviews-container');
    if (container) {
      container.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('reviews-container');
    if (container) {
      container.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl fraunces sm:text-4xl font-bold text-purple-900 mb-4">
            CUSTOMER REVIEWS
          </h2>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <StarRating rating={5} size="lg" />
            <span className="text-lg font-semibold text-gray-900">
              4.62 ★ (27,062)
            </span>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verified</span>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative px-12">
          <NavButton direction="left" onClick={scrollLeft} />
          
          <div
            id="reviews-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          <NavButton direction="right" onClick={scrollRight} />
        </div>
      </div>

      <style jsx>{`
        #reviews-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomerReviews;