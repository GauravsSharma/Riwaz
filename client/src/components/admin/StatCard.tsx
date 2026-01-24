import { Activity } from "lucide-react";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  gradient: string;
  isRevenue?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, gradient, isRevenue = false }) => (
  <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    {/* Gradient Background Effect */}
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`}></div>
    
    <div className="relative p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
       
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
          {isRevenue ? `₹${Number(value).toLocaleString('en-IN')}` : Number(value).toLocaleString('en-IN')}
        </h3>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Activity className="w-3 h-3" />
          overall 
        </p>
      </div>
    </div>
  </div>
);
export default StatCard;
