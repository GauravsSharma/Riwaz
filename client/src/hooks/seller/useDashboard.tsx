import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
interface DashboardStats {
    revenue: number,
    orders: number,
    customers: number,
    products: number
}
interface LowStockItem {
    name: string;
    stock: number;
    threshold: number;
}
interface Product {
    name: string;
    sales: number;
    revenue: number;
    image: string;
}
interface Order {
    id: string;
    customer: string;
    amount: number;
    status: 'delivered' | 'pending' | 'shipped' | 'confirmed';
    time: string;
}
interface SalesData {
    name: string;
    percentage: number;
    sales: number;
    count: number;
    color: string;
}
interface SalesBreakdownProps {
    totalSales: number
    totalOrders: number
    salesByType: SalesData[]
    salesByFabric: SalesData[]
    salesByWork: SalesData[]
    salesByColor: SalesData[]
}
// types/dashboard.ts (ya jahan tumhare types hain)

interface ChartDataPoint {
  day: string;
  revenue: number;
  orders: number;
  month?: number; // Only for 3months period
}

interface RevenueOverviewResponse {
  period: '7days' | '30days' | '3months';
  totalRevenue: number;
  totalOrders: number;
  chartData: ChartDataPoint[];
}

export const useGetDashboardStates = () => {
    return useQuery<DashboardStats>({
        queryKey: ["seller-dashboard"],
        queryFn: async () => {
            const res = await api.get("/dashboard/stats")
            return res.data.stats;
        },
    });
};
export const useGetLowStock = () => {
    return useQuery<LowStockItem[]>({
        queryKey: ["seller-dashboard-low-stock"],
        queryFn: async () => {
            const res = await api.get("/dashboard/low-stock")
            return res.data.lowStockItems;
        },
    });
};
export const useGetTopThree = () => {
    return useQuery<Product[]>({
        queryKey: ["seller-dashboard-top-three"],
        queryFn: async () => {
            const res = await api.get("/dashboard/top-three")
            return res.data.topProducts;
        },
    });
};

export const useGetRecentOrders = () => {
    return useQuery<Order[]>({
        queryKey: ["seller-dashboard-recent-orders"],
        queryFn: async () => {
            const res = await api.get("/dashboard/recent-orders")
            return res.data.orders;
        },
    });
};

export const useGetSellesOverview = () => {
    return useQuery<SalesBreakdownProps>({
        queryKey: ["seller-dashboard-sales-overview"],
        queryFn: async () => {
            const res = await api.get("/dashboard/selles-overview")
            return res.data.data;
        },
    });
};

export const useGetRevenuesByFilters = (
  period: '7days' | '30days' | '3months'
) => {
  return useQuery<RevenueOverviewResponse>({
    queryKey: ['seller-dashboard-revenue-overview', period],
    queryFn: async ({ queryKey }) => {
      const [, period] = queryKey as [
        string,
        '7days' | '30days' | '3months'
      ];

      const res = await api.get(
        `/dashboard/revenue-overview?period=${period}`
      );
      return res.data.data;
    },
  });
};