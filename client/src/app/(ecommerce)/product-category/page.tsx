"use client";
import ProductCard from "@/components/cards/ProductCard";
import SortDrawer from "@/components/drawers/SortDrawer";
import FilterSidebar from "@/components/shared/sidebars/FilterSidebar";
import { useGetProducts } from "@/hooks/buyer/useProducts";
import { useProductStore } from "@/stores/buyer/products.store";
import { useParams, useSearchParams } from "next/navigation";
import { use, useState } from "react";

const page = () => {
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const [currentSort, setCurrentSort] = useState('latest');
  const [isOpen, setIsOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const { isPending } = useGetProducts(`?${searchParams.toString()}`);
  const products = useProductStore((s) => s.products);
  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
    // Here you would implement your actual sorting logic
    console.log('Sorting by:', sortOption);
  };
  if (isPending) {
    return <div className="mt-20 md::mt-32">Loading...</div>
  }
  console.log(searchParams.toString());

  return (
    <div className='flex relative mt-20 md::mt-32'>
      <FilterSidebar setIsOpen={setIsOpen} isOpen={isOpen} search={search} />
      <div className='md:p-5 w-full lg:w-[80%]'>
        <div className='flex items-center justify-between mb-5 lg:p-0 p-3'>
          <h1 className='text-xl text-slate-700 font-semibold pl-2 md:pl-10'>
            Top results for "{decodeURIComponent(search || '').toLowerCase()}"
          </h1>
        </div>

        <div className='flex items-center gap-y-2 lg:gap-5 flex-wrap w-full justify-start pb-20 md:px-10'>
          {!isPending && products && products.length > 0 && products.map((item, idx) => (
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
      {products && products.length === 0 && (
        <div className='flex justify-center items-center h-[50vh] w-full'>
          <h2 className='text-2xl text-gray-500'>No products found.</h2>
        </div>
      )}
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