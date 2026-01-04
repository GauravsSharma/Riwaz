
// const ProductCard = () => (
//   <div className="w-48 h-64 bg-gray-200 m-2 rounded-lg"></div>
// );

// const FilterSidebar = () => (
//   <div className="w-80 bg-gray-100 h-screen p-4">
//     <h2>Filter Sidebar</h2>
//   </div>
// );

// Sort Drawer Component
interface SortDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sortOption: string) => void;
  currentSort: string;
}

const SortDrawer = ({ isOpen, onClose, onSortChange, currentSort }: SortDrawerProps) => {
  const sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Price: High to Low', value: 'price-high-low' },
    { label: 'Price: Low to High', value: 'price-low-high' }
  ];

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    onClose();
  };

  if (!isOpen) return null;

  return (
      <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed bottom-0 left-0 duration-500 right-0 bg-white rounded-t-lg z-50  ${
        isOpen ? 'bottom-0' : 'bottom-[-100%]'
      }`}>
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-6 py-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sort By</h3>
        </div>
        
        {/* Sort Options */}
        <div className="px-6 py-4">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`w-full text-left py-3 px-0 border-b border-gray-100 last:border-b-0 transition-colors ${
                currentSort === option.value 
                  ? 'text-red-500 font-medium' 
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {/* Safe area for mobile */}
        {/* <div className="h-6"></div> */}
      </div>
    </>

  );
};
export default SortDrawer;
