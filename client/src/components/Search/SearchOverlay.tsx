"use client";

import { useGetProductRecommendation, useGetSearchRecommendation } from "@/hooks/buyer/useProducts";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  thumbnail: {
    url: string;
  };
}

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const debounceQuery = useDebounce(searchQuery, 500);
  const { data: suggestionData } = useGetProductRecommendation(debounceQuery);
  const { data: productData } = useGetSearchRecommendation(debounceQuery);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 inset-0 bg-black/30 backdrop-blur-sm pt-20"
      onClick={onClose}
    >
      <div
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="text-gray-400" />
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sarees..."
            className="flex-1 outline-none"
          />
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {suggestionData?.suggestions?.map((s: string, i: number) => (
            <div
              key={i}
              onClick={() => {
                router.push(`/product-category?search=${s}`);
                onClose();
              }}
              className="p-2 hover:bg-pink-50 cursor-pointer"
            >
              {s}
            </div>
          ))}

          {productData?.products?.map((p: Product) => (
            <div
              key={p._id}
              onClick={() => {
                router.push(`/item/${p._id}`);
                onClose();
              }}
              className="flex gap-3 p-2 hover:bg-pink-50 cursor-pointer"
            >
              <Image
                src={p.thumbnail.url}
                alt={p.title}
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p>{p.title}</p>
                <p className="text-sm text-gray-500">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
