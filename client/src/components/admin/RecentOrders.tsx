import { ArrowUpRight, ShoppingBag } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "delivered" | "pending" | "shipped" | "confirmed";
  time: string;
}

const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const statusStyles = {
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    shipped: "bg-blue-50 text-blue-700 border-blue-200",
    confirmed: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Recent Orders
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Latest customer transactions
          </p>
        </div>

        <button className="self-start sm:self-auto text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
          View All <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200"
          >
            {/* Left */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold">
                    {idx + 1}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">
                  {order.id}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {order.customer}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {order.time}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <p className="font-bold text-base sm:text-lg text-gray-900">
                ₹{order.amount.toLocaleString("en-IN")}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border ${statusStyles[order.status]}`}
              >
                {order.status.charAt(0).toUpperCase() +
                  order.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
