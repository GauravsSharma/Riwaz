import { useState, useEffect } from 'react';
import { ChevronUp, MoreHorizontal } from 'lucide-react';

interface WorkFilterProps {
  selectedWork?: string[];
  setSelectedWork?: (work: string[]) => void;
}

const workTypes = [
  'Bandhani',
  'Woven',
  'Embroidery',
  'Stone Work',
  'Minakari',
  'Floral Printed',
  'Foil Printed',
  'Patch Work',
  'Printed',
  'Zari Stripe',
  'Embellished',
];

export default function WorkFilter({ selectedWork: selectedWorkFromProps, setSelectedWork: setSelectedWorkFromProps }: WorkFilterProps) {
  const [localSelectedWork, setLocalSelectedWork] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const selectedWork = selectedWorkFromProps || localSelectedWork;
  const setSelectedWork = setSelectedWorkFromProps || setLocalSelectedWork;

  const displayedWork = showAll ? workTypes : workTypes.slice(0, 11);

  const toggleWork = (workName: string) => {
    if (selectedWork.includes(workName)) {
      setSelectedWork(selectedWork.filter(w => w !== workName));
    } else {
      setSelectedWork([...selectedWork, workName]);
    }
  };

  const handleReset = () => {
    setSelectedWork([]);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
          <span className="text-base font-medium text-gray-900">Work</span>
         <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{selectedWork.length}</span>
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
            {displayedWork.map((work) => (
              <label
                key={work}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedWork.includes(work)}
                  onChange={() => toggleWork(work)}
                  className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer accent-gray-900"
                />
                <span className="text-sm text-gray-700">{work}</span>
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