"use client";
import AdminSidebar from "@/components/shared/sidebars/AdminSidebar";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";


const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
const user = useUserStore((s) => s.user);
const router = useRouter();
useEffect(() => {
    if (!user || user.userType !== "seller") {
        router.push("/");
    }
}, [user,router]);

    return (
        <div className="flex w-full pb-20 md:pb-0">
            <AdminSidebar />
            {children}
        </div>
    )
}

export default Layout