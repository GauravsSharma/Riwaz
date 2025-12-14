"use client";
import ProductCard from "@/components/cards/ProductCard";
import SortDrawer from "@/components/drawers/SortDrawer";
import FilterSidebar from "@/components/shared/sidebars/FilterSidebar";
import { useGetProducts } from "@/hooks/buyer/useProducts";
import { useParams, useSearchParams } from "next/navigation";
import { use, useState } from "react";

const page = () => {
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('latest');
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams()
  const query = params.query as string;
  const { isPending, data } = useGetProducts(query);
  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
    // Here you would implement your actual sorting logic
    console.log('Sorting by:', sortOption);
  };
  if (isPending) {
    return <div>Loading...</div>
  }
  console.log(data);

  return (
    <div className='flex relative mt-32'>
      <FilterSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className='md:p-5 w-full lg:w-[80%]'>
        <div className='flex items-center justify-between mb-5 lg:p-0 p-3'>
          <h1 className='text-xl text-slate-700 font-semibold pl-10'>Top results for "{query}"</h1>
        </div>

        <div className='flex items-center lg:gap-5 flex-wrap w-full justify-center pb-20'>
          {data&&data.length>0&&data.map((item, idx) => (
            <ProductCard key={idx}
            title={item.title}
            price={item.price}
            discount={item.discountPercentage}
            originalPrice={item.originalPrice}
            image={item.thumbnail.url}
            id={item._id}
            isFromHome={false} />
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