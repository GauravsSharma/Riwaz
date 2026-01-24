"use client";

import React, { useState } from "react";
import { useSellerProducts } from "@/stores/seller/seller_product.store";
import SellerProductsTable from "@/components/tables/SellerProductsTable";
import { useGetAllSellerProducts } from "@/hooks/seller/useSellerProduct";
import { useSellerStore } from "@/stores/seller/store.store";
import ProductVariantsTableSkeleton from "@/components/loaders/ProductVariantsTableSkeleton";
import AdminPageHeading from "@/components/headings/AdminPageHeading";
import { Plus } from "lucide-react";
import AddBaseProductModel from "@/components/models/AddBaseProductModel";


const Page = () => {
  const { isLoading, isError } = useGetAllSellerProducts();
  const products = useSellerProducts((s) => s.products);
  const [showAddBaseProductDialog, setShowAddBaseProductDialog] = useState(false);
  useSellerStore(s => s.stores)
  useGetAllSellerProducts();
  return (
    <div className="py-12 px-8  w-full">
      {(!products || products.length === 0 )&& <button
        onClick={() => setShowAddBaseProductDialog(true)}
        className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium cursor-pointer"
      >
        <Plus size={18} />
        Add Base Product
      </button>}
      <div className="mb-6 flex items-start md:items-center md:flex-row flex-col  justify-between">
        <AdminPageHeading
          title='Products'
          desciption='Manage all your products and their variants from this panel.'
        />
        <button
          onClick={() => setShowAddBaseProductDialog(true)}
          className="inline-flex md:w-auto w-full justify-center items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium cursor-pointer"
        >
          <Plus size={18} />
          Add Base Product
        </button>
      </div>
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load orders</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      {products && products.length > 0 && <SellerProductsTable data={products} />}
      {isLoading && <ProductVariantsTableSkeleton />}

      {/* Add Base Product Dialog */}
      {showAddBaseProductDialog && (
        <AddBaseProductModel setShowAddBaseProductDialog={setShowAddBaseProductDialog} />
      )}
    </div>
  );
};

export default Page;
