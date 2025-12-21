"use client";

import LoginModal from "@/components/models/LoginModel";
import useDebounce from "@/hooks/useDebounce";
import {
  getProductRecommendation,
  getSearchRecommendation,
} from "@/hooks/useUser";
import { useUserCart } from "@/stores/buyer/cart.user";
import { useUserStore } from "@/stores/user.store";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const { data: suggestionData } = getProductRecommendation(debounceQuery);
  const { data: productData } = getSearchRecommendation(debounceQuery);

  // Focus input when search overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Keyboard shortcuts for search overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
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

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
    handleClose();
  };

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* ================= TOP BAR ================= */}
      <div className="hidden md:block bg-gradient-to-r from-pink-400 to-purple-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12 text-white text-xs">
            <div className="flex gap-4">Social</div>
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

      {/* ================= MOBILE HEADER ================= */}
      <header className="md:hidden bg-white border-b">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Hamburger menu */}
          <Menu
            className="cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <div className="text-2xl font-bold text-pink-500">peachmode</div>
          <div className="flex items-center gap-4">
            {/* Search button */}
            <Search className="cursor-pointer" onClick={() => setIsOpen(true)} />
            {/* Cart */}
            <Link href="/cart">
              <div className="relative">
                <ShoppingCart />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
                    {count}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile menu content */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-gray-200">
            <nav className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <span
                  key={item}
                  className="cursor-pointer hover:text-pink-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="text-3xl font-bold text-pink-500 cursor-pointer">
                peachmode
              </div>
            </Link>

            <nav className="flex gap-6">
              {navItems.map((item) => (
                <span
                  key={item}
                  className="hover:text-pink-500 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <Search
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              />

              {user ? (
                <User />
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </span>
              )}

              <Link href="/cart">
                <div className="relative cursor-pointer">
                  <ShoppingCart />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
                      {count}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SEARCH OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/95 z-[100] flex justify-center pt-20 px-4"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-2xl bg-slate-800 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
              <Search className="text-slate-400" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search sarees..."
                className="flex-1 bg-transparent outline-none text-white"
              />
              <X className="cursor-pointer" onClick={handleClose} />
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {searchQuery ? (
                <>
                  {/* Suggestions fallback */}
                  {suggestionData?.suggestions?.length ? (
                    suggestionData.suggestions.map((text, i) => (
                      <div
                        key={i}
                        onClick={() => handleSuggestionClick(text)}
                        className="p-2 hover:bg-slate-700 rounded cursor-pointer"
                      >
                        {text}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400">No suggestions found</p>
                  )}

                  {/* Products fallback */}
                  {productData?.products?.length ? (
                    productData.products.map((p) => (
                      <div
                        key={p._id}
                        onClick={() => handleProductClick(p.slug)}
                        className="flex gap-3 p-3 hover:bg-slate-700 rounded cursor-pointer"
                      >
                        <img
                          src={p.thumbnail.url}
                          className="w-16 h-16 rounded object-cover"
                          alt={p.title}
                        />
                        <div>
                          <p className="text-white">{p.title}</p>
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
                <>
                  <p className="text-slate-400 mb-3">Trending Now</p>
                  <div className="grid grid-cols-2 gap-3">
                    {productData?.products?.slice(0, 6).map((p) => (
                      <div
                        key={p._id}
                        onClick={() => handleProductClick(p.slug)}
                        className="p-3 bg-slate-700/30 rounded cursor-pointer"
                      >
                        <p className="text-sm text-white truncate">
                          {p.title}
                        </p>
                      </div>
                    )) || <p className="text-slate-400">No trending products</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= LOGIN MODAL ================= */}
      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        becomeASeller={becomeASeller}
      />
    </div>
  );
}
