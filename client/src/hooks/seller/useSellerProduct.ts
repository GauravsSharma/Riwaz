import api from "@/lib/axios";
import { useSellerProducts } from "@/stores/seller/seller_product.store";
import { useSellerStore } from "@/stores/seller/store.store";
import { useUserStore } from "@/stores/user.store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProductDataPayload {
    title: string,
    description: string,
    fabric: string,
    work: string,
    type: string,
    parentId: string,
    stock: number,
    color: string,
    price: number,
    originalPrice: number,
}
interface BaseProductPayload {
    title:string,
    storeId:string
}
// GET /api/users/me
export const useGetAllSellerProducts = (storeId: string) => {
    const setProducts = useSellerProducts((s) => s.setProducts);

    return useQuery<SellerProduct[]>({
        queryKey: ["seller-product", storeId],
        queryFn: async () => {
            const res = await api.get(`/parentProduct/${storeId}`)
            setProducts(res.data.parentProducts);
            console.log("Data------------>", res.data);
            return res.data.parentProducts;
        },
    });
};


export const useAddProduct = () => {
    return useMutation({
        mutationFn: async (data: ProductDataPayload) => {
            const res = await api.post("/product", data);
            return res.data;
        },
    });
};
export const useAddBaseProduct = () => {
    return useMutation({
        mutationFn: async (data: BaseProductPayload) => {
            const res = await api.post("/parentProduct", data);
            return res.data;
        },
    });
};
export const useUploadMedia = (productId: string) => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            const res = await api.post(`/product/upload/${productId}`, data);
            return res.data;
        },
    });
};
export const useDeleteProduct = (productId: string) => {
    return useMutation({
        mutationFn: async () => {
            const res = await api.delete(`/product/${productId}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Product deleted successfully");
        },

        onError: () => {
            toast.error("Failed to delete product. Please try again.");
        }
    });
};
