"use client"
import AdminOrderCard from '@/components/cards/AdminOrderCard';
import NoOrdersFound from '@/components/fallback/NoOrdersFound';
import AdminPageHeading from '@/components/headings/AdminPageHeading';
import AdminOrderCardSkeleton from '@/components/loaders/AdminOrderCardSkeleton';
import OrderStatsFilterSkeleton from '@/components/loaders/OrderStatsFilterSkeleton';
import { useGetAdminOrders, useUpdateOrderStatus } from '@/hooks/seller/useOrder';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>();
  const [filter, setFilter] = useState<'all' | AdminOrder['orderStatus']>('all');
  const { data, isLoading, isError } = useGetAdminOrders();
  const { mutate } = useUpdateOrderStatus();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  let filteredOrders;
  let stats;

  if (orders) {
    filteredOrders = filter === 'all'
      ? orders
      : orders.filter(order => order.orderStatus === filter);

    stats = {
      total: orders.length,
      pending: orders.filter(o => o.orderStatus === 'pending').length,
      confirmed: orders.filter(o => o.orderStatus === 'confirmed').length,
      shipped: orders.filter(o => o.orderStatus === 'shipped').length,
      delivered: orders.filter(o => o.orderStatus === 'delivered').length,
      cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
    };
  }

  const handleStatusUpdate = async (orderId: string, newStatus: AdminOrder['orderStatus']) => {
    if (!orders) return;

    mutate({ id: orderId, data: { orderStatus: newStatus } }, {
      onSuccess: () => {
        setOrders(orders.map(order =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus, updatedAt: new Date() }
            : order
        ));
        toast.success("Order status updated successfully");
      },
      onError: () => {
        toast.error("Failed to update order status");
      }
    });
  };
  if (!isLoading && !orders) {
    return <NoOrdersFound />
  }
  return (
    <div className="min-h-screen w-full bg-gray-50 px-8 py-12">
      <div className="mx-auto">
        {/* Header */}
        <AdminPageHeading
          title='Orders'
          desciption='Manage all the orders from your store here.'
        />

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">Failed to load orders</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <>
            <OrderStatsFilterSkeleton />
            <div className="space-y-4 mt-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <AdminOrderCardSkeleton key={i} />
              ))}
            </div>
          </>
        )}

        {/* Content */}
        {!isLoading && !isError && orders && filteredOrders && stats && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All Orders
                </button>
                {(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === status
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow text-center border border-gray-200">
                  <p className="text-gray-500 text-lg">No orders found</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <AdminOrderCard
                    key={order._id}
                    order={order}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;