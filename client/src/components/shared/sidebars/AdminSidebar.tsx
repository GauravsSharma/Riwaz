'use client';

import React from 'react';
import {
  BarChart3,
  ShoppingCart,
  Package,
  Building2,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutModel from '@/components/models/LogoutModel';
import Image from 'next/image';

const menuItems = [
  { icon: BarChart3, label: 'Overview', url: '/admin/dashboard' },
  { icon: Building2, label: 'Stores', url: '/admin/stores' },
  { icon: ShoppingCart, label: 'Orders', url: '/admin/orders' },
  { icon: Package, label: 'Products', url: '/admin/products' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 bg-gray-50 border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="flex items-center p-6 border-b border-slate-300">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          onClick={() => setIsOpen(true)}
          className="mx-3 mb-6 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-4 mb-4 rounded-2xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-lg">
          <div className="flex justify-around items-center py-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className={`flex flex-col items-center gap-1 text-[11px] transition ${isActive ? 'text-purple-600' : 'text-gray-600'
                    }`}
                >
                  <div
                    className={`p-2 rounded-xl transition ${isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/40'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.label}
                </Link>
              );
            })}

            {/* Logout Button (Mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex flex-col items-center gap-1 text-[11px] text-red-500"
            >
              <div className="p-2 rounded-xl bg-red-100/60 hover:bg-red-200 transition">
                <LogOut className="w-5 h-5" />
              </div>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <LogoutModel isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default AdminSidebar;
