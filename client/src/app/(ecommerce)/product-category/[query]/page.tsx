"use client";
import ProductCard from "@/components/cards/ProductCard";
import SortDrawer from "@/components/drawers/SortDrawer";
import FilterSidebar from "@/components/shared/sidebars/FilterSidebar";
import { useState } from "react";

const page = () => {
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('latest');
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
    // Here you would implement your actual sorting logic
    console.log('Sorting by:', sortOption);
  };

  return (
    <div className='flex relative'>
      <FilterSidebar setIsOpen={setIsOpen} isOpen={isOpen}/>
      <div className='md:p-5 w-full lg:w-[80%]'>
        <div className='flex items-center justify-between mb-5 lg:p-0 p-3'>
          <h1 className='text-lg text-slate-700 font-semibold'>Trending Products</h1>
        </div>
        
        <div className='flex items-center lg:gap-5 flex-wrap w-full justify-center pb-20'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((item, idx) => (
            <ProductCard key={idx}/>
          ))}
        </div>
        
        {/* Bottom Navigation Bar */}
        <div className='flex lg:hidden justify-between items-center fixed shadow-2xl border-t border-gray-300 bg-white w-full bottom-0 px-20 py-3 tracking-wider'>
          <button 
            onClick={() => setSortDrawerOpen(true)}
            className='text-red-500 font-semibold text-md hover:text-red-600 transition-colors'
          >
            Sort
          </button>
          <button className='text-red-500 font-semibold text-md hover:text-red-600 transition-colors'
          onClick={() => setIsOpen(!isOpen)}
          >
            Filter
          </button>
        </div>
      </div>
      
      {/* Sort Drawer */}
      <SortDrawer
        isOpen={sortDrawerOpen}
        onClose={() => setSortDrawerOpen(false)}
        onSortChange={handleSortChange}
        currentSort={currentSort}
      />
    </div>
  );
};

export default page;