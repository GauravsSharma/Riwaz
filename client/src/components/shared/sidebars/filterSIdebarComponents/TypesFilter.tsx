import { useState } from 'react';
import { ChevronUp, MoreHorizontal } from 'lucide-react';

interface TypeFilterProps {
  selectedTypes?: string[];
  setSelectedTypes?: (types: string[]) => void;
}

const types = [
  'Banarasi',
  'Bandhani',
  'Embellished',
  'Baluchari',
  'Jamdani',
  'Foiled Printed',
  'Foil Printed',
  'Printed',
  'Zari Stripe',
  'Woven'
];

export default function TypeFilter({ selectedTypes: selectedTypesFromProps, setSelectedTypes: setSelectedTypesFromProps }: TypeFilterProps) {
  const [localSelectedTypes, setLocalSelectedTypes] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const selectedTypes = selectedTypesFromProps || localSelectedTypes;
  const setSelectedTypes = setSelectedTypesFromProps || setLocalSelectedTypes;

  const displayedTypes = showAll ? types : types.slice(0, 13);

  const toggleType = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
    }
  };

  const handleReset = () => {
    setSelectedTypes([]);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
          <span className="text-base font-medium text-gray-900">Type</span>
         <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{selectedTypes.length}</span>
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
            {displayedTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer accent-gray-900"
                />
                <span className="text-sm text-gray-700">{type}</span>
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