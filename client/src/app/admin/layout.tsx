"use client";
import AdminSidebar from "@/components/shared/sidebars/AdminSidebar";
import { useGetAllSellerProducts } from "@/hooks/seller/useSellerProduct";
import { useGetAllStores } from "@/hooks/seller/useStore";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
}, [user,router]);

// extract storeId safely
const storeId = !isLoading && data?.length ? data[0]._id : "";

   useGetAllSellerProducts(storeId);

    return (
        <div className="flex w-full">
            <AdminSidebar />
            {children}
        </div>
    )
}

export default Layout