"use client";
import LoginModal from '@/components/models/LoginModel';
import { useGetCartSummary } from '@/hooks/buyer/useUserCart';
import { useUserCart } from '@/stores/buyer/cart.user';
import { useUserStore } from '@/stores/user.store';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';


export default function Header() {
  const user = useUserStore((s) => s.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { data: cartSummary } = useGetCartSummary(); 
  const [becomeASeller, setBecomeASeller] = useState(false);
  const count = useUserCart((s) => s.count);
  const navItems = [
    "Banarasi Sarees",
    "Kanjivaram Sarees",
    "Silk Sarees",
    "Cotton Sarees",
    "Chiffon Sarees",
    "Georgette Sarees",
  ];

  const topLinks = [
    'Track Order',
    'Contact Us',
    'Become a Seller',
  ];

  // Search overlay state
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  
  const recommendedProducts = [
    {
      id: '1',
      name: 'Traditional Banarasi Silk Saree',
      price: 4999,
      originalPrice: 7999,
      image: '/images/banarsi.webp',
    },
    {
      id: '2',
      name: 'Pure Kanjivaram Silk Saree',
      price: 8999,
      originalPrice: 12999,
      image: '/images/kanjeevaram.jpg',
    },
    {
      id: '3',
      name: 'Elegant Chiffon Saree',
      price: 2499,
      originalPrice: 3999,
      image: '/images/chiffon.webp',
    },
    // Add more products...
  ];

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      // Open with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching for:', searchQuery);
  };

  
  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
    handleClose(); // Close search overlay
    // Navigate to product page
    // router.push(`/products/${productId}`);
  };

  return (
    <div className='fixed z-50 top-0 left-0 w-full'>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-2">
          <div className="flex items-center justify-between h-12">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
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
            <div className="flex items-center">
              {topLinks.map((link, index) => (
                <div key={link} className="flex items-center">
                  <a
                    href="#"
                    className="text-white hover:opacity-80 text-xs font-medium transition-opacity px-3"
                  >
                    {link}
                  </a>
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
      <header className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-2">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-pink-500">peach</span>
                <div className="w-7 h-7 bg-gradient-to-br from-orange-300 to-pink-400 rounded-full relative">
                  <div className="absolute top-0 right-0 w-2 h-3 bg-green-400 rounded-br-full"></div>
                </div>
                <span className="text-3xl font-bold text-pink-500">mode</span>
                <span className="text-pink-500 text-xs ml-0.5">®</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-pink-500 text-[15px] font-medium transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsOpen(true)}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {user ? <User className='w-5 h-5 cursor-pointer' /> : <div
                onClick={() => { setBecomeASeller(false); setIsLoginOpen(true) }}
                className="text-gray-700 cursor-pointer hover:text-pink-500 text-[15px] font-medium transition-colors">
                Login
              </div>}
              <Link href={"/cart"}>
                <button
                  className="relative cursor-pointer mt-2 text-gray-700 hover:text-pink-500 transition-colors"
                >
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
      <header className="md:hidden bg-white border-b border-gray-200">
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
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-pink-500">peach</span>
                <div className="w-5 h-5 bg-gradient-to-br from-orange-300 to-pink-400 rounded-full relative">
                  <div className="absolute top-0 right-0 w-1.5 h-2 bg-green-400 rounded-br-full"></div>
                </div>
                <span className="text-2xl font-bold text-pink-500">mode</span>
                <span className="text-pink-500 text-xs ml-0.5">®</span>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsOpen(true)}
                className="text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href={"/cart"}>
                <button
                  className="relative cursor-pointer text-gray-700"
                >
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
                    <a
                      href="#"
                      className="block text-gray-700 hover:text-pink-500 text-sm font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200">
                  {user ? <User className='w-5 h-5 cursor-pointer' /> : <div
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

      {/* Search Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/95 z-[100] animate-in fade-in duration-200 flex items-start justify-center pt-20"
          onClick={handleClose}
        >
          {/* Search Container */}
          <div
            className="w-full max-w-2xl mx-4 animate-in slide-in-from-top-2 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Box */}
            <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-slate-700">
              {/* Search Input Area */}
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sarees..."
                    className="w-full text-base outline-none bg-transparent text-slate-200 placeholder:text-slate-500"
                  />
                </form>
                <kbd className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-700/50 rounded border border-slate-600">
                  esc
                </kbd>
              </div>

                {/* Content Area */}
              <div className="px-5 py-8 min-h-[200px]">
                {searchQuery ? (
                  <div className="w-full space-y-4">
                    {/* Search Results */}
                    <div className="space-y-2">
                      {navItems.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-slate-700/50 rounded cursor-pointer transition-colors duration-150"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                              <Search className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-slate-200">{item}</h3>
                              <p className="text-xs text-slate-500">Category</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {navItems.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="text-center py-4">
                          <p className="text-slate-500 text-sm">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>

                    {/* Product Recommendations - Show when searching */}
                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <h3 className="text-slate-300 text-sm font-medium mb-4">You might also like</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {recommendedProducts.slice(0, 6).map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="group cursor-pointer bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <div className="relative aspect-[3/4] overflow-hidden bg-slate-700">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="text-xs font-medium text-slate-200 line-clamp-2 mb-2">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-slate-100">
                                  ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-xs text-slate-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-6">No recent searches</p>
                    
                    {/* Product Recommendations - Show when no search query */}
                    <div className="mt-6">
                      <h3 className="text-slate-300 text-sm font-medium mb-4 text-left">Trending Now</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {recommendedProducts.slice(0, 6).map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="group cursor-pointer bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <div className="relative aspect-[3/4] overflow-hidden bg-slate-700">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="text-xs font-medium text-slate-200 line-clamp-2 mb-2">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-slate-100">
                                  ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-xs text-slate-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-slate-700 bg-slate-800/50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-slate-700/50 rounded border border-slate-600">↵</kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-slate-700/50 rounded border border-slate-600">ESC</kbd>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} becomeASeller={becomeASeller} />
    </div>
  );
}
