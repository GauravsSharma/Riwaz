"use client";

import { 
  User, 
  RefreshCw, 
  ShoppingBag, 
  Heart, 
  MapPin 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();

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
      label: "My Wishlist",
      icon: Heart,
      href: "/account/wishlist",
    },
    {
      label: "Addresses",
      icon: MapPin,
      href: "/account/addresses",
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
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
