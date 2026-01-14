"use client";

import React from "react";

import LoginModal from "@/components/models/LoginModel";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetProductRecommendation,
  useGetSearchRecommendation,
} from "@/hooks/buyer/useProducts";
import { useUserCart } from "@/stores/buyer/cart.user";
import { useUserStore } from "@/stores/user.store";
import { Facebook, Instagram, Menu, Search, ShoppingCart, Twitter, User, X, Youtube } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const count = useUserCart((s) => s.count);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Login modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Become seller state
  const [becomeASeller, setBecomeASeller] = useState(false);

  // Search overlay state
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    "Banarasi Sarees",
    "Kanjivaram Sarees",
    "Silk Sarees",
    "Cotton Sarees",
    "Chiffon Sarees",
    "Georgette Sarees",
  ];

  const topLinks = ["Track Order", "Contact Us", "Become a Seller"];

  // Debounce the search query to avoid too many API calls
  const debounceQuery = useDebounce(searchQuery, 500);

  // API calls
  const { data: suggestionData } = useGetProductRecommendation(debounceQuery);
  const { data: productData } = useGetSearchRecommendation(debounceQuery);


  // Focus input when search overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Keyboard shortcuts for search overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
        //call the product description...
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = (id: string) => {
    router.push(`/item/${id}`)
    handleClose();
  };

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    console.log("hi i am suggestion");
    router.push(`/product-category?search/${text}`)
    handleClose();
    // router.push(`/item/${id}`)
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="block bg-linear-to-r from-pink-400 to-purple-400">
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
              {topLinks.map((l,index) => (

                <span key={l+index}>

                  {l === "Become a Seller" ? <span key={l+index} className="cursor-pointer hover:underline"  onClick={() => {
                    setBecomeASeller(true);
                    setIsLoginOpen(true);
                  }}>
                    {l}
                  </span> : <span key={l+index} className="cursor-pointer hover:underline">
                  {l}
                </span > }
            </span>
              
              ))}
          </div>
        </div>
      </div>
    </div>

      {/* Desktop Header */ }
  <header className="hidden lg:block bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-2">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
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
          <button className="text-gray-700 cursor-pointer hover:text-pink-500 transition-colors">
            <Search className="w-5 h-5" onClick={() => setIsOpen(true)} />
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

  {/* Mobile Header */ }
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
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="riwaz logo" width={150} height={150} />
        </Link>

        {/* Right Icons */}
        <div className="flex items-center justify-center space-x-4">
          <button className="text-gray-700 cursor-pointer">
            <Search className="w-5 h-5"
              onClick={() => setIsOpen(true)}
            />
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
  {/* ================= SEARCH OVERLAY ================= */ }
  {
    isOpen && (
      <div
        className="fixed backdrop-blur-xs z-100 top-0 pt-20 h-screen w-full flex justify-center items-start px-4"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-2xl bg-white shadow-md rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
            <Search className="text-slate-400" />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search sarees..."
              className="flex-1 bg-transparent outline-none text-black"
            />
            <X className="cursor-pointer" onClick={handleClose} />
          </div>

          <div className="p-4 overflow-y-auto">
            {searchQuery ? (
              <>
                <h3 className="text-sm text-slate-400 mb-2">Suggested searches</h3>
                {/* Suggestions fallback */}
                {suggestionData?.suggestions?.length ? (
                  suggestionData.suggestions.map((text: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => handleSuggestionClick(text)}
                      className="p-2 hover:bg-pink-50 rounded cursor-pointer"
                    >
                      {text}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No suggestions found</p>
                )}

                <h3 className="text-sm text-slate-400 mt-4 mb-2">Products</h3>
                {/* Products fallback */}
                {productData?.products?.length ? (
                  productData.products.map((p: {
                    _id: string;
                    title: string;
                    price: number;
                    thumbnail: { url: string };
                  }) => (
                    <div
                      key={p._id}
                      onClick={() => handleProductClick(p._id)}
                      className="flex gap-3 p-3 hover:bg-pink-50 rounded cursor-pointer"
                    >
                      <Image
                        src={p.thumbnail.url}
                        alt={p.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="text-black">{p.title}</p>
                        <p className="text-sm text-slate-400">
                          ₹{p.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 mt-2">No products found</p>
                )}
              </>
            ) : (
              <p className="text-slate-400">No results</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  {/* ================= LOGIN MODAL ================= */ }
  <LoginModal
    isOpen={isLoginOpen}
    setIsOpen={setIsLoginOpen}
    becomeASeller={becomeASeller}
  />
    </div >
  );
}