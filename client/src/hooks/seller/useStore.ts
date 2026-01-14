import api from "@/lib/axios";
import { useSellerStore } from "@/stores/seller/store.store";
import { useQuery, useMutation } from "@tanstack/react-query";


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
// Send OTP
export const useUpdateStore = () => {
  const updateStore = useSellerStore(s=>s.updateStore)
  return useMutation({
    mutationFn: async ({data,id}:{data:StoreDataPayload,id:string}) => {
      const res = await api.put(`/store/${id}`, data);
      return res.data.store;
    },
    onSuccess:(data)=>{
      updateStore(data)
    }
  });
};
export const useDeleteStore = () => {
  const deleteStore = useSellerStore(s=>s.deleteStore)
  return useMutation({
    mutationFn: async (id:string) => {
      const res = await api.delete(`/store/${id}`);
      return res.data.id;
    },
    onSuccess:(data)=>{
      deleteStore(data)
    }
  });
};