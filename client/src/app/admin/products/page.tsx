"use client";

import React from "react";
import { useSellerProducts } from "@/stores/seller/seller_product.store";
import SellerProductsTable from "@/components/tables/SellerProductsTable";

const Page = () => {
  const products = useSellerProducts((s) => s.products);

  return (
    <div className="p-6  w-full">
      {products && <SellerProductsTable data={products} />}
     
    </div>
  );
};

export default Page;
