import { useEffect, useState } from 'react';
import PriceFilter from './filterSIdebarComponents/PriceFIlter';
import ColorFilter from './filterSIdebarComponents/ColorFilter';
import TypeFilter from './filterSIdebarComponents/TypesFilter';
import WorkFilter from './filterSIdebarComponents/WorkFilter';
import FabricFilter from './filterSIdebarComponents/FabricFilter';
import { useRouter, useSearchParams } from 'next/navigation';


export default function FilterSidebar({ isOpen, setIsOpen,search }: { isOpen: boolean,search:string, setIsOpen: (open: boolean) => void }) {
  const router = useRouter();
  const [price, setPrice] = useState({ min: 0, max: 2999 });
  const [colors, setColors] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [work, setWork] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
  // price
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  if (priceMin && priceMax) {
    setPrice({
      min: Number(priceMin),
      max: Number(priceMax),
    });
  }

  // color
  const colorParam = searchParams.get("color");
  if (colorParam) {
    setColors(colorParam.split(","));
  }

  // type
  const typeParam = searchParams.get("type");
  if (typeParam) {
    setTypes(typeParam.split(","));
  }

  // fabric
  const fabricParam = searchParams.get("fabric");
  if (fabricParam) {
    setFabrics(fabricParam.split(","));
  }

  // work
  const workParam = searchParams.get("work");
  if (workParam) {
    setWork(workParam.split(","));
  }
}, [searchParams]);

useEffect(() => {
  const newParams = new URLSearchParams();
  
  if (search) newParams.set("search", search);
  if(price.min!==0 || price.max!==2999){
    newParams.set("priceMin", price.min.toString());
    newParams.set("priceMax", price.max.toString());
  }

  if (colors.length) newParams.set("color", colors.join(","));
  if (types.length) newParams.set("type", types.join(","));
  if (fabrics.length) newParams.set("fabric", fabrics.join(","));
  if (work.length) newParams.set("work", work.join(","));
  //useGetProducts(`?${newParams.toString()}`);
  router.push(`?${newParams.toString()}`);
  // console.log(`?${newParams.toString()}`);
  
}, [search, price, colors, types, fabrics, work, router]);
  return (
    <div className={`lg:block ${isOpen ? "left-0" : "-left-[100%]"} fixed  duration-500 w-full z-10 lg:w-[20%] h-screen lg:sticky top-0 overflow-auto bg-white p  border-r border-gray-200`}>
      <div className='p-6'>
        {/* Header */}
        <div className='text-xl font-semibold px-4 text-slate-700'>Filters</div>
        {/* Color Filter */}
        <PriceFilter setPrice={setPrice} price={price} />
        <ColorFilter setSelectedColors={setColors} selectedColors={colors} />
        <TypeFilter setSelectedTypes={setTypes} selectedTypes={types} />
        <WorkFilter setSelectedWork={setWork} selectedWork={work} />
        <FabricFilter setSelectedFabrics={setFabrics} selectedFabrics={fabrics} />
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