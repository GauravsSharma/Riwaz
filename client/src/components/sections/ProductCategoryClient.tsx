"use client";

import React, { useEffect, useState } from 'react'
import FilterSidebar from '../shared/sidebars/FilterSidebar';
import { Filter } from 'lucide-react';
import ProductCard from '../cards/ProductCard';
import { useSearchParams } from 'next/navigation';
import { useGetProducts } from '@/hooks/buyer/useProducts';
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from '../loaders/ProductCardLoader';
import SortDrawer from '../drawers/SortDrawer';
import LoadMoreProducts from '../loaders/LoadMoreProducts';

const ProductCategoryClient = () => {
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const [currentSort, setCurrentSort] = useState('latest');
  const [isOpen, setIsOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const { data, hasNextPage, isFetchingNextPage, isPending, fetchNextPage } = useGetProducts(`?${searchParams.toString()}`);
  const products = data?.pages.flatMap(page => page.products) ?? [];

  const { ref, inView } = useInView(
    {
      threshold: 1,
    }
  )
  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
  };
  // console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <>
      <div className='flex relative mt-28 md:mt-32'>
        <FilterSidebar setIsOpen={setIsOpen} isOpen={isOpen} search={search} />

        <div className='md:p-5 w-full lg:w-[80%]'>
          <button
            className='bg-purple-700 md:hidden cursor-pointer mx-auto text-white font-semibold text-sm px-10 py-2  hover:bg-purple-800 transition-colors flex items-center gap-2'
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Filter className="w-5 h-5" />
            APPLY FILTERS
          </button>
          <div className='flex items-center mt-2 justify-between mb-2 md:mb-5 lg:p-0 p-3'>
            <h1 className='text-md text-zinc-500 font-medium pl-2 md:pl-10'>
              {products && products.length} results found for &quot;{decodeURIComponent(search || "").toLowerCase()}&quot;
            </h1>
          </div>

          <div className='flex items-center gap-y-2 lg:gap-5 gap-x-2 flex-wrap w-full justify-start pb-20 md:px-10 px-1'>
            {isPending && [1, 2, 3, 4].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
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
           <div ref={ref} className='w-full flex justify-center items-center'>
            {
              isFetchingNextPage && <LoadMoreProducts/>
            }
          </div>

          {/* Bottom Navigation Bar */}

        </div>

        {/* Sort Drawer */}
        <SortDrawer
          isOpen={sortDrawerOpen}
          onClose={() => setSortDrawerOpen(false)}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
      </div>

    </>
  )
}

export default ProductCategoryClient