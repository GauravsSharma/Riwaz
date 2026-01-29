"use client";

import { 
  User, 
  RefreshCw, 
  ShoppingBag, 
  MapPin,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutModel from "../models/LogoutModel";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
  setIsLogoutModelOpen(true)
  };

  const menuItems = [
    {
      label: "Profile",
      icon: User,
      href: "/account",
    },
    {
      label: "Returns / Exchange",
      icon: RefreshCw,
      href: "/account/return&exchange",
    },
    {
      label: "My Orders",
      icon: ShoppingBag,
      href: "/account/orders",
    },
    {
      label: "Addresses",
      icon: MapPin,
      href: "/account/addresses",
    },
  ];

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <div className="w-64 border-r sticky top-40 left-0 h-screen border-gray-200 p-6">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={index} className="relative">
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                )}
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-md font-medium transition-colors ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    );
  }

  // Mobile Bottom Navigation with Glassmorphism
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Glassmorphism container */}
        <div className="mx-4 mb-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
          <nav className="flex justify-around items-center px-2 py-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                    {isActive && (
                      <div className="absolute -inset-2 bg-red-500/10 rounded-full blur-md" />
                    )}
                    {isActive && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg" />
                    )}
                    <IconComponent className={`h-6 w-6 relative z-10 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${isActive ? 'text-red-500' : 'text-gray-600'}`}>
                    {item.label.split(' ')[0]}
                  </span>
                </Link>
              );
            })}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all duration-300 text-gray-600 hover:text-red-500"
            >
              <div className="relative transition-transform duration-300 hover:scale-110">
                <LogOut className="h-6 w-6 stroke-2" />
              </div>
              <span className="text-xs mt-1.5 font-medium">
                Logout
              </span>
            </button>
          </nav>
        </div>
            {isLogoutModelOpen && (
        <LogoutModel
          isOpen={isLogoutModelOpen}
          setIsOpen={setIsLogoutModelOpen}
        />
      )}
      </div>

    
    </>
  );
}