"use client";

import { 
  User, 
  RefreshCw, 
  ShoppingBag, 
   
  MapPin 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile Bottom Navigation
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <nav className="flex justify-around items-center px-2 py-3">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-red-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                  )}
                  <IconComponent className={`h-6 w-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-red-500' : 'text-gray-600'}`}>
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile spacing to prevent content from being hidden behind bottom nav */}
      {/* <div className="h-20"></div> */}
    </>
  );
}