import { useState, useEffect } from 'react';
import { ChevronUp, MoreHorizontal } from 'lucide-react';

interface ColorFilterProps {
  selectedColors?: string[];
  setSelectedColors?: (colors: string[]) => void;
}

interface ColorOption {
  name: string;
  color: string;
  borderColor?: string;
}

const colors: ColorOption[] = [
  { name: 'Beige', color: '#F5F5DC', borderColor: '#D3D3D3' },
  { name: 'Black', color: '#000000' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Brown', color: '#8B4513' },
  { name: 'Cream', color: '#FFFDD0', borderColor: '#D3D3D3' },
  { name: 'Green', color: '#008000' },
  { name: 'Grey', color: '#808080' },
  { name: 'Khaki', color: '#F0E68C', borderColor: '#D3D3D3' },
  { name: 'Lavender', color: '#E6E6FA', borderColor: '#D3D3D3' },
  { name: 'Magenta', color: '#FF00FF' },
  { name: 'Maroon', color: '#800000' },
  { name: 'Mauve', color: '#E0B0FF', borderColor: '#D3D3D3' },
  { name: 'Multicoloured', color: 'linear-gradient(135deg, #FF0000 0%, #FF7F00 16.67%, #FFFF00 33.33%, #00FF00 50%, #0000FF 66.67%, #4B0082 83.33%, #9400D3 100%)', borderColor: '#D3D3D3' },
  { name: 'Orange', color: '#FFA500' },
  { name: 'Peach', color: '#FFE5B4', borderColor: '#D3D3D3' },
  { name: 'Pink', color: '#FFC0CB', borderColor: '#D3D3D3' },
  { name: 'Purple', color: '#800080' },
  { name: 'Red', color: '#FF0000' },
  { name: 'Turquoise', color: '#40E0D0' },
  { name: 'Violet', color: '#EE82EE' },
  { name: 'White', color: '#FFFFFF', borderColor: '#D3D3D3' },
  { name: 'Wine', color: '#722F37' },
  { name: 'Yellow', color: '#FFFF00' },
];

export default function ColorFilter({ selectedColors: selectedColorsFromProps, setSelectedColors: setSelectedColorsFromProps }: ColorFilterProps) {
  const [localSelectedColors, setLocalSelectedColors] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const selectedColors = selectedColorsFromProps || localSelectedColors;
  const setSelectedColors = setSelectedColorsFromProps || setLocalSelectedColors;

  const displayedColors = showAll ? colors : colors.slice(0, 8);

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
  };

  return (
    <div className="w-full p-4 ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-gray-900">Color</span>
          <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
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
            {displayedColors.map((colorOption) => (
              <div
                key={colorOption.name}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => toggleColor(colorOption.name)}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      background: colorOption.color,
                      border: colorOption.borderColor ? `1px solid ${colorOption.borderColor}` : 'none',
                    }}
                  />
                  {selectedColors.includes(colorOption.name) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-900 rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700">{colorOption.name}</span>
              </div>
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