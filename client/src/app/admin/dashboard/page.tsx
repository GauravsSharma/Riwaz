"use client";
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import { 
  ChevronDown, 
  DollarSign, 
  ShoppingCart, 
  MousePointer,
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  LucideLogOut
} from 'lucide-react';
import Image from 'next/image';
import { useLogout } from '@/hooks/useUser';

// Sample data for orders table
const ordersData = [
  { id: '#8567', customer: 'Rahul Mohamed', status: 'Delivered', amount: '$64.65' },
  { id: '#8563', customer: 'Saleb Mehmet', status: 'Processing', amount: '$64.65' },
  { id: '#8549', customer: 'Julie Jewels', status: 'Shipped', amount: '$64.65' },
  { id: '#8505', customer: 'Rayhan Kabir', status: 'Delivered', amount: '$64.65' },
  { id: '#8571', customer: 'Shagor Rahman', status: 'Processing', amount: '$64.65' },
];

// Column helper for type safety
const columnHelper = createColumnHelper();

const DashboardOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const logout = useLogout();
  // Define columns for the orders table
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Order ID',
        cell: info => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('customer', {
        header: 'Customer',
        cell: info => (
          <span className="text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          const getStatusColor = (status) => {
            switch (status) {
              case 'Delivered':
                return 'bg-green-100 text-green-800';
              case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
              case 'Shipped':
                return 'bg-blue-100 text-blue-800';
              default:
                return 'bg-gray-100 text-gray-800';
            }
          };
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: ordersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleLogout = () => {
    // Implement logout functionality here
    logout.mutate()
  }
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
        <div  onClick={handleLogout} className="flex cursor-pointer max-w-40 bg-amber-200 justify-between items-center p-6 border-b border-gray-200">
              <button
               
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LucideLogOut size={24} />
              </button>
            </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-700">{selectedPeriod}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Today's Sales Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>June</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Today's Sales</p>
            <div className="flex items-baseline space-x-4">
              <p className="text-3xl font-bold text-gray-900">$4.8M</p>
              <span className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </span>
            </div>
          </div>
          
          {/* Mini chart visualization */}
          <div className="flex items-end space-x-1 mt-4 h-8">
            {[2.8, 3.2, 3.6, 4.8].map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-purple-200 to-purple-400 rounded-sm flex-1"
                style={{ height: `${(value / 4.8) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Orders</p>
            <div className="flex items-baseline space-x-4">
              <p className="text-3xl font-bold text-gray-900">26K</p>
              <span className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +16%
              </span>
            </div>
          </div>
          
          {/* Mini trend line */}
          <div className="mt-4 h-8 flex items-center">
            <svg className="w-full h-6" viewBox="0 0 100 20">
              <path
                d="M0,15 Q25,10 50,8 T100,5"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Conversion Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MousePointer className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Conversion</p>
            <div className="flex items-baseline space-x-4">
              <p className="text-3xl font-bold text-gray-900">3.2%</p>
              <span className="text-sm text-red-600 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -8%
              </span>
            </div>
          </div>
          
          {/* Mini trend line (declining) */}
          <div className="mt-4 h-8 flex items-center">
            <svg className="w-full h-6" viewBox="0 0 100 20">
              <path
                d="M0,5 Q25,8 50,12 T100,15"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customers Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-sm text-gray-500">Customers</h3>
              </div>
              <div className="flex items-baseline space-x-4">
                <p className="text-3xl font-bold text-gray-900">17K</p>
                <span className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1%
                </span>
              </div>
            </div>
            
            {/* Customer avatars */}
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 overflow-hidden border-white"
                >
                    <Image height={100} width={100} src={`/cus-${_}.avif`}alt="" className='h-full w-full object-cover'/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-sm text-gray-500">Top Selling</h3>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">MON 15,Dec-2022</p>
                <p className="text-sm text-gray-600">9:16AM - 9:19AM</p>
              </div>
            </div>
            
            {/* Product image placeholder */}
            <div className="w-16 h-16 overflow-hidden rounded-lg">
                <Image height={100} width={100} src={"/home/coorders.avif"} alt="tshirt" className='h-full w-full object-cover'/>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
          <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-700">Today</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;