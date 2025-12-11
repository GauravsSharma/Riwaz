import { useState } from 'react';

interface FilterState {
  colors: string[];
  priceRanges: string[];
  sizes: string[];
  sleeves: string[];
}

export default function FilterSidebar({isOpen,setIsOpen}: {isOpen: boolean, setIsOpen: (open: boolean) => void}) {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    priceRanges: [],
    sizes: [],
    sleeves: []
  });

  const [showMoreColors, setShowMoreColors] = useState(false);

  const colors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Light Blue', value: 'light-blue', color: 'bg-sky-300' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-600' },
    { name: 'White', value: 'white', color: 'bg-white border border-gray-300' },
    { name: 'Navy Blue', value: 'navy-blue', color: 'bg-blue-900' },
    { name: 'Brown', value: 'brown', color: 'bg-amber-800' },
    { name: 'Light Grey', value: 'light-grey', color: 'bg-gray-300' }
  ];

  const priceRanges = [
    '₹0.00 - ₹499.99',
    '₹500.00 - ₹999.99',
    '₹1,000.00 - ₹1,499.99',
    '₹1,500.00 - ₹1,999.99'
  ];

  const sizes = [
    'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL',
    '28', '30', '32', '34', '36', '38', '40', '42'
  ];

  const sleeves = [
    'Full Sleeves',
    'Half Sleeves',
    'Sleeveless'
  ];

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const resetFilters = () => {
    setFilters({
      colors: [],
      priceRanges: [],
      sizes: [],
      sleeves: []
    });
    setShowMoreColors(false);
  };

  const visibleColors = showMoreColors ? colors : colors.slice(0, 7);

  return (
    <div className={`lg:block ${isOpen?"left-0":"-left-[100%]"} fixed  duration-500 w-full z-50 lg:w-[20%] h-screen lg:sticky top-0 overflow-auto bg-white p  border-r border-gray-200`}>
<div className='p-6'>
          {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium text-gray-900">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-red-500 text-md font-medium hover:text-red-600"
        >
          RESET
        </button>
      </div>
      {/* Color Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Color</h3>
        <div className="space-y-3">
          {visibleColors.map((color) => (
            <label key={color.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.colors.includes(color.value)}
                onChange={() => handleFilterChange('colors', color.value)}
                className="sr-only"
              />
              <div className="relative">
                <div className={`w-4 h-4 border border-gray-300 ${
                  filters.colors.includes(color.value) ? 'border-gray-400' : ''
                }`}>
                  {filters.colors.includes(color.value) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full ml-3 mr-2 ${color.color}`}></div>
              <span className="text-sm text-gray-700">{color.name}</span>
            </label>
          ))}
          {!showMoreColors && (
            <button 
              onClick={() => setShowMoreColors(true)}
              className="text-red-500 text-sm font-medium hover:text-red-600"
            >
              +16 more
            </button>
          )}
        </div>
      </div>
      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Price</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(range)}
                onChange={() => handleFilterChange('priceRanges', range)}
                className="sr-only"
              />
              <div className="relative">
                <div className={`w-4 h-4 border border-gray-300 ${
                  filters.priceRanges.includes(range) ? 'border-gray-400' : ''
                }`}>
                  {filters.priceRanges.includes(range) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 ml-3">{range}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Size Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Size</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <label key={size} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleFilterChange('sizes', size)}
                className="sr-only"
              />
              <div className="relative">
                <div className={`w-4 h-4 border border-gray-300 ${
                  filters.sizes.includes(size) ? 'border-gray-400' : ''
                }`}>
                  {filters.sizes.includes(size) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 ml-3">{size}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Sleeves Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Sleeves</h3>
        <div className="space-y-3">
          {sleeves.map((sleeve) => (
            <label key={sleeve} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sleeves.includes(sleeve)}
                onChange={() => handleFilterChange('sleeves', sleeve)}
                className="sr-only"
              />
              <div className="relative">
                <div className={`w-4 h-4 border border-gray-300 ${
                  filters.sleeves.includes(sleeve) ? 'border-gray-400' : ''
                }`}>
                  {filters.sleeves.includes(sleeve) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 ml-3">{sleeve}</span>
            </label>
          ))}
        </div>
      </div>
</div>
       <div className='flex  lg:hidden justify-between items-center sticky shadow-2xl border-t border-gray-300 bg-white w-full bottom-0 px-20 py-3 left-0 tracking-wider'>
          <button 
            onClick={() => setIsOpen(false)}
            className='text-slate-800 font-semibold text-md hover:text-slate-900 transition-colors'
          >
            Cancel
          </button>
          <button className='text-red-500 font-semibold text-md hover:text-red-600 transition-colors'
          onClick={() => setIsOpen(!isOpen)}
          >
            Apply
          </button>
        </div>
    </div>
  );
}