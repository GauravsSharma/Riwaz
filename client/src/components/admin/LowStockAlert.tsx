import { AlertTriangle } from "lucide-react";

// Low Stock Alert Component
interface LowStockItem {
  name: string;
  stock: number;
  threshold: number;
}

const LowStockAlert: React.FC<{ items: LowStockItem[] }> = ({ items }) => (
  <div className="bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 rounded-2xl shadow-sm border border-rose-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2 mb-6">
      <div className="p-2 bg-rose-500 rounded-lg shadow-md">
        <AlertTriangle className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">Low Stock Alert</h2>
        <p className="text-xs text-gray-600">Requires immediate attention</p>
      </div>
    </div>
    
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
            <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200">
              {item.stock} left
            </span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(item.stock / item.threshold) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Threshold: {item.threshold} units</p>
        </div>
      ))}
    </div>
  </div>
);
export default LowStockAlert;
