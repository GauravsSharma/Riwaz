import api from "@/lib/axios";
import { Address, EditAddressInput, useAddressStore } from "@/stores/buyer/address.user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Fetch all addresses
 */
export const useGetAddresses = () => {
  const setAddresses = useAddressStore((s) => s.setAddresses);

  return useQuery<Address[]>({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const res = await api.get("/user/address");
      setAddresses(res.data.addresses);
      return res.data.addresses;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Add a new address
 */
export const useCreateAddress = () => {
  const addAddress = useAddressStore((s) => s.addAddress);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Address, "_id" | "userId">) => {
      const res = await api.post("/user/address", data);
      return res.data.address as Address;
    },
    onSuccess: (address: Address) => {
      addAddress(address);
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
};

/**
 * Edit an existing address
 */
export const useEditAddress = () => {
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditAddressInput }) => {
      const res = await api.put(`/user/address/${id}`, data);
      return res.data.address as Address;
    },
    onSuccess: (address: Address) => {
      updateAddress(address);
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
};

/**
 * Delete an address
 */
export const useDeleteAddress = () => {
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/user/address/${id}`);
      return id;
    },
    onSuccess: (id: string) => {
      removeAddress(id);
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
};
