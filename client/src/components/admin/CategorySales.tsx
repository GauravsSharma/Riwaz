// Sales Breakdown Component (Type/Fabric/Work/Color)
interface SalesData {
  name: string;
  percentage: number;
  sales: number;
  count: number;
  color: string;
}

interface SalesBreakdownProps {
  title: string;
  subtitle: string;
  data: SalesData[];
}

const SalesBreakdown: React.FC<SalesBreakdownProps> = ({ title, subtitle, data }) => {
  if(!data || data.length === 0) {
    return;
  }
  return  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    
    <div className="space-y-5">
      {data.map((item, idx) => (
        <div key={idx} className="group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.color}`}></div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                {item.name}
              </span>
              <span className="text-xs text-gray-400">({item.count} units)</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
          </div>
          <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500 shadow-sm`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400 mt-1.5 block">
            ₹{item.sales.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  </div>
}

// Usage Examples:

// Sales by Type
const SalesByType: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <SalesBreakdown 
    title="Sales by Type" 
    subtitle="Saree type breakdown"
    data={data}
  />
);

// Sales by Fabric
const SalesByFabric: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <SalesBreakdown 
    title="Sales by Fabric" 
    subtitle="Fabric-wise breakdown"
    data={data}
  />
);

// Sales by Work
const SalesByWork: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <SalesBreakdown 
    title="Sales by Work" 
    subtitle="Work type breakdown"
    data={data}
  />
);

// Sales by Color
const SalesByColor: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <SalesBreakdown 
    title="Sales by Color" 
    subtitle="Color-wise breakdown"
    data={data}
  />
);

export { SalesBreakdown, SalesByType, SalesByFabric, SalesByWork, SalesByColor };