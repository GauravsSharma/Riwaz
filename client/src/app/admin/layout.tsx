"use client";
import AdminSidebar from "@/components/shared/sidebars/AdminSidebar";
import { useGetAllSellerProducts } from "@/hooks/seller/useSellerProduct";
import { useGetAllStores } from "@/hooks/seller/useStore";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { da } from "zod/locales";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
const user = useUserStore((s) => s.user);
const { data, isLoading } = useGetAllStores();
const router = useRouter();

useEffect(() => {
    if (!user || user.userType !== "seller") {
        router.push("/");
    }
}, [user]);

// extract storeId safely
const storeId = !isLoading && data?.length ? data[0]._id : "";

// call hook unconditionally
const {
    data: sellerProducts,
    isLoading: productsLoading,
} = useGetAllSellerProducts(storeId);

    return (
        <div className="flex w-full">
            <AdminSidebar />
            {children}
        </div>
    )
}

export default Layout