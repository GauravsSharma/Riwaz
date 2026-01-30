import { Award, Star, Zap } from "lucide-react";
import Image from "next/image";

interface Product {
  name: string;
  sales: number;
  revenue: number;
  image: string;
}

const TopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
  if(!products || products.length==0) return;
  return  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2 mb-6">
      <Award className="w-5 h-5 text-amber-500" />
      <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
    </div>

    <div className="space-y-3">
      {products.slice(0, 3).map((product, idx) => (
        <div
          key={idx}
          className="group flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent rounded-xl transition-all duration-300 border border-transparent hover:border-amber-200"
        >
          <div className="relative">
            {/* ✅ Product Image */}
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>

            {idx === 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
              {product.name}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <Zap className="w-3 h-3" />
              {product.sales} sales
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">
              ₹{(product.revenue / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
}

export default TopProducts;
