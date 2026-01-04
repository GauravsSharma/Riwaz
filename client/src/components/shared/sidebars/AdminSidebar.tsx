'use client';

import React from 'react';
import { 
  ChevronLeft, 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users, 
  Megaphone, 
  TrendingUp, 
  Settings, 
  HomeIcon,
  Building2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: BarChart3, label: 'Overview', count: '24+', url: "/admin/dashboard" },
    { icon: Building2, label: 'Stores', url: "/admin/stores" },
    { icon: ShoppingCart, label: 'Orders', url: "/admin/orders" },
    { icon: Package, label: 'Products', url: "/admin/products" },
    { icon: Users, label: 'Customers', url: "/admin/customers" },
    // { icon: Megaphone, label: 'Marketing', url: "/admin/marketing" },
  ];

  return (
    <div className="w-64 h-screen sticky left-0 top-0 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-lg font-semibold text-gray-900">Denca</span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex-1 px-3 py-6">
        <div className="mb-6">
          <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Menu
          </p>
          
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Settings at bottom */}
      <div className="px-3 pb-6">
        <a
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
        >
          <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          <span>Settings</span>
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
