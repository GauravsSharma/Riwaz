"use client";
import { useEffect, useState } from 'react';
import { Search, User, ShoppingCart, Menu, X, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import LoginModal from '@/components/models/LoginModel';
import { useUserStore } from '@/stores/user.store';
import { useUserCart } from '@/stores/buyer/cart.user';
import { useGetCartSummary } from '@/hooks/buyer/useUserCart';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const user = useUserStore((s) => s.user);
  // const router = useRouter();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Login modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [becomeASeller, setBecomeASeller] = useState(false);
  
  useGetCartSummary();
  
  const setCount = useUserCart(s => s.setCount);
  const count = useUserCart((s) => s.count);

  useEffect(() => {
    if (!user) {
      const cart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
      setCount(cart.length);
    }
  }, [user, setCount]);

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
      {/* ================= TOP BAR ================= */}
      <div className="hidden md:block bg-gradient-to-r from-pink-400 to-purple-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12 text-white text-xs">
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Facebook className="w-4 h-4 fill-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Instagram className="w-4 h-4 fill-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Twitter className="w-4 h-4 fill-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Youtube className="w-4 h-4 fill-white" />
              </a>
            </div>
            <div className="flex gap-4">
              {topLinks.map((l) => (
                <span key={l} className="cursor-pointer hover:underline">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-2">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </Link>

            {/* Navigation */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/product-category?search=${item.toLowerCase()}`}
                      className="text-gray-700 hover:text-pink-500 text-[15px] font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center justify-center space-x-6">
              <button className="text-gray-700 hover:text-pink-500 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              {user ? (
                <Link href="/account">
                  <User className="w-5 h-5 cursor-pointer" />
                </Link>
              ) : (
                <div
                  onClick={() => {
                    setBecomeASeller(false);
                    setIsLoginOpen(true);
                  }}
                  className="text-gray-700 cursor-pointer hover:text-pink-500 text-[15px] font-medium transition-colors"
                >
                  Login
                </div>
              )}
              <Link href="/cart">
                <button className="relative cursor-pointer mt-2 text-gray-700 hover:text-pink-500 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="riwaz logo" width={150} height={150} />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center justify-center space-x-4">
              <button className="text-gray-700">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart">
                <button className="relative cursor-pointer mt-2 text-gray-700">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu content */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-gray-200">
            <nav className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/product-category?search=${item.toLowerCase()}`}
                  className="cursor-pointer hover:text-pink-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ================= LOGIN MODAL ================= */}
      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        becomeASeller={becomeASeller}
      />
    </div>
  );
}  