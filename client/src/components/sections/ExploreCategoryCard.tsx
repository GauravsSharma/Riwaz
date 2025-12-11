import { JSX, useState } from 'react';

interface CategoryParam {
  url: string;
  title: string;
  description: string;
  gradient: string;
}

export default function ExploreCategoryCard({ 
  url, 
  title, 
  description, 
  gradient 
}: CategoryParam): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <div 
      className="relative overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group h-80 sm:h-96 md:h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      <img 
        src={url} 
        alt={title}
        className={` max-w-full h-auto transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
      />
      <div className="absolute inset-0  bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
        <h3 className="text-2xl font-bold mb-2 tracking-wide">{title}</h3>
        <p className="text-sm text-gray-200 opacity-90 mb-4">{description}</p>
        <div className={`flex items-center gap-2 transition-all duration-500 ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-wider">Explore Collection</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      <div className={`absolute top-4 right-4 bg-white/95 text-gray-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        Premium
      </div>
    </div>
  );
}