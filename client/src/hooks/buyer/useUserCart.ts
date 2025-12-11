import api from "@/lib/axios";
import { useUserCart } from "@/stores/buyer/cart.user";
import { useProductStore } from "@/stores/buyer/products.store";
import { useQuery, useMutation } from "@tanstack/react-query";
interface CartPayLoad {
  productId: string;
  quantity: number;
}
interface CartSummary{
  total:number,
  itemCount:number
}
export const useGetCartItems = () => {
  const setCartItems = useUserCart((s) => s.setCartItems);
  return useQuery<CartItem[]>({
    queryKey: ["cart-store"],
    queryFn: async () => {
      const res = await api.get(`/usercart`);
      setCartItems(res.data.cartItems);
    console.log("Data------------>",res.data.cartItems);
      return res.data.cartItems;
    },
  });
};

export const useGetCartSummary = () => {
  const setCount = useUserCart((s) => s.setCount);
  return useQuery<CartSummary>({
    queryKey: ["cart-summary-store"],
    queryFn: async () => {
      const res = await api.get(`/usercart/summary`);
      setCount(res.data.itemCount);
      return res.data;
    },
  });
};


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
