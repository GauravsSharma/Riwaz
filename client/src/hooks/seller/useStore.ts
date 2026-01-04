import api from "@/lib/axios";
import { useSellerStore } from "@/stores/seller/store.store";
import { useUserStore } from "@/stores/user.store";
import { Store } from "@/type";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface StoreDataPayload {
    name: string;
    description: string;
    address: string;
}
// GET /api/users/me
export const useGetAllStores = () => {
  const setStores = useSellerStore((s) => s.setStores);

  return useQuery<Store[]>({
    queryKey: ["seller-store"],
    queryFn: async () => {
      const res = await api.get("/store")
      setStores(res.data.stores);
    //   console.log("Data------------>",res.data);
      return res.data.stores;
    },
  });
};

// Send OTP
export const useCreateStore = () => {
  return useMutation({
    mutationFn: async (data: StoreDataPayload) => {
      const res = await api.post("/store", data);
      return res.data;
    },
  });
};
