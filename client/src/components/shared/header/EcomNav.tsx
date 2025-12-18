"use client";
import { useEffect, useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import LoginModal from '@/components/models/LoginModel';
import { useUserStore } from '@/stores/user.store';
import { useUserCart } from '@/stores/buyer/cart.user';
import { useGetCartSummary } from '@/hooks/buyer/useUserCart';
import { useRouter } from 'next/navigation';


export default function Header() {
  const user = useUserStore((s) => s.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { data: cartSummary } = useGetCartSummary();
  const [becomeASeller, setBecomeASeller] = useState(false);

  const cartCount = useUserCart((s) => s.count);
  const [guestCount, setGuestCount] = useState(0);

  useEffect(() => {
    if (!user) {
      const cart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
      setGuestCount(cart.length);
    }
  }, [user]);

  const count = user ? cartCount : guestCount;


  const router = useRouter()
  const navItems = [
    "Banarasi Sarees",
    "Baluchari Sarees",
    "Embellished Sarees",
    "Zari Sarees",
    "Foil Printed Sarees",
    "Cotton Sarees",
  ];

  const topLinks = [
    'Track Order',
    'Contact Us',
    'Become a Seller',
  ];

  return (
    <div className='fixed z-50 top-0 left-0 w-full'>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400">
        <div className=" mx-auto px-4 sm:px-2">
          <div className="flex items-center justify-end sm:justify-between gap-2 h-10 sm:h-12 ">
            {/* Social Icons */}
            <div className=" sm:flex hidden items-center space-x-4">
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg className="w-6 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>

            {/* Top Links */}
            <div className="flex  items-center ">
              {topLinks.map((link, index) => (
                <div key={link} className="flex items-center">
                  <div
                    onClick={() => {
                      if (link === "Contact Us") {
                        router.push('/contact_us');
                      }
                      if (link === "Become a Seller") {
                        setBecomeASeller(true);
                        setIsLoginOpen(true);
                      }
                    }}
                    className="text-white cursor-pointer hover:opacity-80 text-xs font-medium transition-opacity px-3"
                  >
                    {link}
                  </div>
                  {index < topLinks.length - 1 && (
                    <span className="text-white text-xs">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden  lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-2">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="" className='h-12' />
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
              {user ? <User className='w-5 h-5 cursor-pointer' onClick={()=>router.push("/account")}/> : <div
                onClick={() => { setBecomeASeller(false); setIsLoginOpen(true) }}
                className="text-gray-700 cursor-pointer hover:text-pink-500 text-[15px] font-medium transition-colors">
                Login
              </div>}
              <Link href={"/cart"}><button

                className="relative cursor-pointer mt-2 text-gray-700 hover:text-pink-500 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              </button></Link>
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
            <Link href={"/"} className="flex-shrink-0">
              <img src="/logo.png" alt="riwaz logo" className='h-12' />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center justify-center space-x-4">
              <button className="text-gray-700">
                <Search className="w-5 h-5" />
              </button>
              <Link href={"/cart"}>
                <button

                  className="relative cursor-pointer mt-2 text-gray-700">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="px-4 py-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/product-category?search=${item.toLowerCase()}`}
                      className="block text-gray-700 hover:text-pink-500 text-sm font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200">
                  {user ?<div>
                     
                    <Link
                      href={`/account`}
                      className="block text-gray-700 hover:text-pink-500 text-sm font-medium py-2"
                    >
                      Account
                    </Link>
                    <Link
                      href={`/`}
                      className="block text-gray-700 hover:text-pink-500 text-sm font-medium py-2"
                    >
                      Orders
                    </Link>
                  
                  </div> : <div
                    className="block cursor-pointer text-gray-700 hover:text-pink-500 text-sm font-medium py-2"
                    onClick={() => { setBecomeASeller(false); setIsLoginOpen(true); setMobileMenuOpen(false) }}
                  >
                    Login
                  </div>}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} becomeASeller={becomeASeller} />
    </div>
  );
}