const SalesBreakdownSkeleton = () => {
  // Static widths to avoid hydration mismatch
  const barWidths = [75, 60, 45, 55, 35];
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <div className="h-7 w-40 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-56 bg-gray-200 rounded"></div>
      </div>
      
      {/* Items */}
      <div className="space-y-5">
        {barWidths.map((width, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-10 bg-gray-200 rounded"></div>
            </div>
            <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="h-2.5 rounded-full bg-gray-300"
                style={{ width: `${width}%` }}
              ></div>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded mt-1.5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesBreakdownSkeleton;