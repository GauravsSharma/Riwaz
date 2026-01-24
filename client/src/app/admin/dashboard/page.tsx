"use client"
import React, { useState } from 'react';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import RecentOrders from '@/components/admin/RecentOrders';
import TopProducts from '@/components/admin/TopProducts';
import LowStockAlert from '@/components/admin/LowStockAlert';
import { useGetDashboardStates, useGetLowStock, useGetRecentOrders, useGetRevenuesByFilters, useGetSellesOverview, useGetTopThree } from '@/hooks/seller/useDashboard';
import { SalesByColor, SalesByFabric, SalesByType, SalesByWork } from '@/components/admin/CategorySales';
import RevenueOverviewChart from '@/components/admin/RevenueChart';
import AdminPageHeading from '@/components/headings/AdminPageHeading';
import StatCardSkeleton from '@/components/loaders/StatCardSkeleton';
import RevenueOverviewChartSkeleton from '@/components/loaders/RevenueOverviewChartSkeleton ';
import SalesBreakdownSkeleton from '@/components/loaders/SalesBreakdownSkeleton';

const AdminDashboard: React.FC = () => {


  const { data, isLoading } = useGetDashboardStates()
  const { data: lowStock } = useGetLowStock()
  const { data: topProducts} = useGetTopThree()
  const { data: recentOrders } = useGetRecentOrders()
  const { data: sellesOverview, isLoading: isSellesOvervewLoading } = useGetSellesOverview()
  const [period, setPeriod] = useState<"7days" | "30days" | "3months">("7days");
  const {
    data: revenue, isLoading: isRevenuesLoading
  } = useGetRevenuesByFilters(period);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-8 py-12">
      <div className=" mx-auto">
        {/* Header */}
        <AdminPageHeading
          title='Dashboard'
          desciption='Your dashboard which make you feel better.'
        />
        {/* Stats Grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={data.revenue}
              icon={DollarSign}
              gradient="from-blue-500 to-cyan-500"
              isRevenue
            />
            <StatCard
              title="Total Orders"
              value={data.orders}
              icon={ShoppingCart}
              gradient="from-emerald-500 to-teal-500"
            />
            <StatCard
              title="Total Customers"
              value={data.customers}
              icon={Users}
              gradient="from-purple-500 to-pink-500"
            />
            <StatCard
              title="Total Products"
              value={data.products}
              icon={Package}
              gradient="from-orange-500 to-amber-500"
            />
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)}
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {revenue && <RevenueOverviewChart data={revenue} onPeriodChange={setPeriod} />}
            {isRevenuesLoading && <RevenueOverviewChartSkeleton />}
          </div>

          {sellesOverview && (
            <>
              <SalesByType data={sellesOverview.salesByType} />
              <SalesByFabric data={sellesOverview.salesByFabric} />
              <SalesByWork data={sellesOverview.salesByWork} />
              <SalesByColor data={sellesOverview.salesByColor} />
            </>
          )}

          {isSellesOvervewLoading && (
            <>
              {[1, 2, 3, 4].map((i) => <SalesBreakdownSkeleton key={i} />)}
            </>
          )}
        </div>


        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recentOrders && <div className="lg:col-span-2">
            <RecentOrders orders={recentOrders} />
          </div>}
          <div className="space-y-6">
            {topProducts && <TopProducts products={topProducts} />}
            {lowStock && lowStock.length > 0 && <LowStockAlert items={lowStock} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;