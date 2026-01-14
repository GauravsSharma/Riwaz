import { useState } from 'react';
import { ChevronUp, MoreHorizontal } from 'lucide-react';

interface FabricFilterProps {
  selectedFabrics?: string[];
  setSelectedFabrics?: (fabrics: string[]) => void;
}

const fabrics = [
 
  'Cotton',
  'Georgette',
  'Silk',
  'Silk Blend',
  'Chanderi',
  'Chanderi Cotton',
  'Chinnon',
];

export default function FabricFilter({ selectedFabrics: selectedFabricsFromProps, setSelectedFabrics: setSelectedFabricsFromProps }: FabricFilterProps) {
  const [localSelectedFabrics, setLocalSelectedFabrics] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const selectedFabrics = selectedFabricsFromProps || localSelectedFabrics;
  const setSelectedFabrics = setSelectedFabricsFromProps || setLocalSelectedFabrics;

  const displayedFabrics = showAll ? fabrics : fabrics.slice(0, 9);

  const toggleFabric = (fabricName: string) => {
    if (selectedFabrics.includes(fabricName)) {
      setSelectedFabrics(selectedFabrics.filter(f => f !== fabricName));
    } else {
      setSelectedFabrics([...selectedFabrics, fabricName]);
    }
  };

  const handleReset = () => {
    setSelectedFabrics([]);
  };

  return (
    <div className="w-full p-4 ">
      <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
          <span className="text-base font-medium text-gray-900">Fabric</span>
         <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{selectedFabrics.length}</span>
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

          <div className="space-y-2">
            {displayedFabrics.map((fabric) => (
              <label
                key={fabric}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedFabrics.includes(fabric)}
                  onChange={() => toggleFabric(fabric)}
                  className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer accent-gray-900"
                />
                <span className="text-sm text-gray-700">{fabric}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 mt-3"
          >
            <MoreHorizontal size={16} />
          </button>
        </>
      )}
    </div>
  );
}