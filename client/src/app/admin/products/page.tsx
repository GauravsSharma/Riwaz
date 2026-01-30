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
import Retry from "@/components/shared/retry/Retry";
import StoreNotFound from "@/components/shared/retry/StoreNotFound";
import { AxiosError } from "axios";


const Page = () => {
  const { isLoading, error } = useGetAllSellerProducts();
  const products = useSellerProducts((s) => s.products);
  const [showAddBaseProductDialog, setShowAddBaseProductDialog] = useState(false);
  useSellerStore(s => s.stores)
  useGetAllSellerProducts();
 if (error) {
  const axiosError = error as AxiosError;

  const statusCode = axiosError.response?.status;

  if (statusCode === 404) {
    return <StoreNotFound />;
  }

  return <Retry />;
}

  
  return (
    <div className="py-12 px-8  w-full">

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

      {products && products.length > 0 && <SellerProductsTable data={products} />}
      {isLoading && <ProductVariantsTableSkeleton />}

      {/* Add Base Product Dialog */}
      {showAddBaseProductDialog && (
        <AddBaseProductModel setShowAddBaseProductDialog={setShowAddBaseProductDialog} />
      )}
      {products && products.length===0 && <div className="bg-white p-12 rounded-lg shadow text-center border border-gray-200">
        <p className="text-gray-500 text-lg">No Products found</p>
      </div>}

    </div>
  );
};

export default Page;
