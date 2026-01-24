import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdminOrders = () => {
  return useQuery<AdminOrder[]>({
    queryKey: ["seller-store"],
    queryFn: async () => {
      const res = await api.get("/order/getAdminOrders")
      return res.data.orders;
    },
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data:{orderStatus:"pending" |"confirmed"|"shipped"| "delivered"|"cancelled"} }) => {
      const res = await api.put(`/order/update-order-status/${id}`, data);
      return res.data
    },
  });
};
