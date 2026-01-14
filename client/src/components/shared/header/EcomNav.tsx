"use client";

import LoginModal from "@/components/models/LoginModel";
import SearchOverlay from "@/components/Search/SearchOverlay";
import { useUserCart } from "@/stores/buyer/cart.user";
import { useUserStore } from "@/stores/user.store";
import { Facebook, Instagram, Menu, Search, ShoppingCart, Twitter, User, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const user = useUserStore((s) => s.user);
  const count = useUserCart((s) => s.count);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [becomeASeller, setBecomeASeller] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    "Banarasi Sarees",
    "Kanjivaram Sarees",
    "Silk Sarees",
    "Cotton Sarees",
    "Chiffon Sarees",
    "Georgette Sarees",
  ];

  const topLinks = ["Track Order", "Contact Us", "Become a Seller"];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-linear-to-r from-pink-400 to-purple-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12 text-white text-xs">
            <div className="flex gap-4 items-center">
              <Facebook className="w-4 h-4" />
              <Instagram className="w-4 h-4" />
              <Twitter className="w-4 h-4" />
              <Youtube className="w-4 h-4" />
            </div>
            <div className="flex gap-4">
              {topLinks.map((l, i) => (
                <span
                  key={i}
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    if (l === "Become a Seller") {
                      setBecomeASeller(true);
                      setIsLoginOpen(true);
                    }
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </Link>

            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <Link key={item} href={`/product-category?search=${item.toLowerCase()}`}>
                    {item}
                  </Link>
                ))}
              </ul>
            </nav>

            <div className="flex items-center space-x-6">
              <Search className="cursor-pointer" onClick={() => setIsSearchOpen(true)} />

              {user ? (
                <Link href="/account"><User /></Link>
              ) : (
                <span
                  onClick={() => {
                    setBecomeASeller(false);
                    setIsLoginOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  Login
                </span>
              )}

              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <Link href="/">
            <Image src="/logo.png" alt="logo" width={120} height={120} />
          </Link>

          <div className="flex items-center gap-4">
            <Search onClick={() => setIsSearchOpen(true)} />
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay Component */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        becomeASeller={becomeASeller}
      />
    </div>
  );
}
