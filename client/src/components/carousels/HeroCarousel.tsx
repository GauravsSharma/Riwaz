import React, { useCallback, useEffect, useState } from 'react';

interface Slide {
  url: string;
  theme: 'light' | 'dark';
}

const slides: Slide[] = [
 
  {
    url: '/home/s2.webp',
    theme: 'dark'
  },
  {
    url: '/home/s3.webp',
    theme: 'light'
  }, {
    url: '/home/s1.webp',
    theme: 'light'
  },
];

const PeachCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [isTransitioning]);

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  const currentSlide = slides[currentIndex];
  const textColor = currentSlide.theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div 
      className="relative mt-30 w-full h-[81vh] bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + slides.length) % slides.length;
          const isNext = index === (currentIndex + 1) % slides.length;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100'
                  : isPrev && direction === 'prev'
                  ? 'opacity-0 scale-105 -translate-x-full'
                  : isNext && direction === 'next'
                  ? 'opacity-0 scale-105 translate-x-full'
                  : 'opacity-0 scale-95'
              }`}
            >
              <img
                src={slide.url}
              
                className="w-full h-fit object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 ${
                slide.theme === 'dark' 
                  ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                  : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Content */}



      {/* Dot Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className="group relative disabled:cursor-not-allowed"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`transition-all duration-500 ${
              index === currentIndex
                ? `w-12 h-1 ${slide.theme === 'dark' ? 'bg-white' : 'bg-black'}`
                : `w-8 h-1 ${slide.theme === 'dark' ? 'bg-white/40' : 'bg-black/40'} group-hover:${slide.theme === 'dark' ? 'bg-white/60' : 'bg-black/60'}`
            }`} />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PeachCarousel;