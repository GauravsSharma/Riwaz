import { useEffect, useState } from 'react';
import PriceFilter from './filterSIdebarComponents/PriceFIlter';
import ColorFilter from './filterSIdebarComponents/ColorFilter';
import TypeFilter from './filterSIdebarComponents/TypesFilter';
import WorkFilter from './filterSIdebarComponents/WorkFilter';
import FabricFilter from './filterSIdebarComponents/FabricFilter';
import { useRouter, useSearchParams } from 'next/navigation';


export default function FilterSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const router = useRouter();
  const [price, setPrice] = useState({ min: 0, max: 3799 });
  const [colors, setColors] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [work, setWork] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  useEffect(() => {
    params.set("priceMin", price.min.toString());
    params.set("priceMax", price.max.toString());

    colors.length ? params.set("color", colors.join(",")) : params.delete("color");
    types.length ? params.set("type", types.join(",")) : params.delete("type");
    fabrics.length ? params.set("fabric", fabrics.join(",")) : params.delete("fabric");
    work.length ? params.set("work", work.join(",")) : params.delete("work");
     router.push(`?${params.toString()}`);
  }, [price, colors, types, fabrics, work]);
  return (
    <div className={`lg:block ${isOpen ? "left-0" : "-left-[100%]"} fixed  duration-500 w-full z-10 lg:w-[20%] h-screen lg:sticky top-0 overflow-auto bg-white p  border-r border-gray-200`}>
      <div className='p-6'>
        {/* Header */}

        {/* Color Filter */}
        <ColorFilter setSelectedColors={setColors} selectedColors={colors} />
        <PriceFilter setPrice={setPrice} price={price} />
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