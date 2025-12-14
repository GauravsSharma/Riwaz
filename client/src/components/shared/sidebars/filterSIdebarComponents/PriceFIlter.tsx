import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface PriceFilterProps {
  price?: { min: number; max: number };
  setPrice?: (price: { min: number; max: number }) => void;
}

export default function PriceFilter({ price: priceFromProps, setPrice: setPriceFromProps }: PriceFilterProps) {
  const [localPrice, setLocalPrice] = useState({ min: 0, max: 3799 });
  const [isExpanded, setIsExpanded] = useState(true);

  const price = priceFromProps || localPrice;
  const setPrice = setPriceFromProps || setLocalPrice;



  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), price.max);
    setPrice({ min: value, max: price.max });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), price.min);
    setPrice({ min: price.min, max: value });
  };

  const handleReset = () => {
    setPrice({ min: 0, max: 3799 });
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-gray-900">Price</span>
          <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-900 transition-transform"
          style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          <ChevronUp size={20} />
        </button>
      </div>

      {isExpanded && (
        <>
          <button
            onClick={handleReset}
            className="text-sm text-gray-700 hover:text-gray-900 mb-4 underline"
          >
            Reset
          </button>

          <div className="relative mb-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="range"
                  min="0"
                  max="3799"
                  value={price.min}
                  onChange={handleMinChange}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-20"
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="3799"
                  value={price.max}
                  onChange={handleMaxChange}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-20"
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                <div className="relative w-full h-2 bg-gray-300 rounded-full">
                  <div
                    className="absolute h-2 bg-gray-800 rounded-full"
                    style={{
                      left: `${(price.min / 3799) * 100}%`,
                      right: `${100 - (price.max / 3799) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-700">
            Price: ₹ {price.min.toLocaleString('en-IN')} – ₹ {price.max.toLocaleString('en-IN')}
          </div>
        </>
      )}

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          pointer-events: all;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          pointer-events: all;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}