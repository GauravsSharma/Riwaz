import api from "@/lib/axios";
import { useUserCart } from "@/stores/buyer/cart.user";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
interface CartPayLoad {
  productId: string;
  quantity: number;
}
interface CartSummary {
  totalDiscountedPrice: number,
  totalActualPrice: number
  itemCount: number,
}
interface CheckoutSessionPayload{
    coupon:string
}
export const useGetCartItems = (enabled: boolean) => {
  const setCartItems = useUserCart((s) => s.setCartItems);
  return useQuery<CartItem[]>({
    queryKey: ["cart-store"],
    queryFn: async () => {
      const res = await api.get(`/usercart`);
      setCartItems(res.data.cartItems);
      return res.data.cartItems;
    },
    enabled
  });
};

export const useGetCartSummary = () => {
  const setCount = useUserCart((s) => s.setCount);
  const setTotalDiscountedAmount = useUserCart((s) => s.setTotalDiscountedAmount);
  const setTotalActualAmount = useUserCart((s) => s.setTotalActualAmount);
  return useQuery<CartSummary>({
    queryKey: ["cart-summary-store"],
    queryFn: async () => {
      const res = await api.get(`/usercart/summary`);
      setCount(res.data.itemCount);
      setTotalDiscountedAmount(res.data.totalDiscountedPrice);
      setTotalActualAmount(res.data.totalActualPrice);
      return res.data;
    },
  });
};
export const useMergeCart = () => {
  const setCartItems = useUserCart((s) => s.setCartItems);
  return useMutation({
    mutationFn: async (cartItems: CartPayLoad[]) => {
      const res = await api.post(`/usercart/merge`, { cartItems });
      setCartItems(res.data.items);
      return res.data.items;
    }
  });
}

export const useAdditem = () => {
  const setSingleItem = useUserCart((s) => s.setSingleItem);
  return useMutation({
    mutationFn: async (data: CartPayLoad) => {
      const res = await api.post("/usercart/add", data);
      setSingleItem(res.data.cartItem);
      return res.data.cartItem;
    },
  });
};

export const useUpdateItem = () => {
  const setSingleItem = useUserCart((s) => s.setSingleItem);
  return useMutation({
    mutationFn: async (data: CartPayLoad) => {
      const res = await api.put("/usercart/update", data);
      setSingleItem(res.data.cartItem);
      return res.data.cartItem;
    },
  });
};

export const useDeleteItem = (id: string, onSuccessCallback: () => void) => {
  const removeItem = useUserCart(s => s.removeItem)
  return useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/usercart/${id}`);
      return res.data.id;
    },
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback();
      removeItem(data)
      toast.success("Item deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete item. Please try again.");
    }
  });
};


export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: async (data:CheckoutSessionPayload) => {
      const res = await api.post("/order/create-checkout-session",data);
      return res.data.order;
    },
  });
};