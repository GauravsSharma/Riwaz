import ProductCategoryClient from "@/components/sections/ProductCategoryClient";
import {  Suspense } from "react";

const Page = () => {
  return (
  <Suspense>
    <ProductCategoryClient/>
  </Suspense>
  );
};

export default Page;