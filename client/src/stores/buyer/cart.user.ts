import { create } from "zustand";

type CartStoreState = {
    items: CartItem[] | null;
    count: number;
    setCount:(count:number)=>void;
    removeItem: (productId: string) => void;
    setSingleItem: (item: CartItem) => void;
    setCartItems: (item: CartItem[] | null) => void;
};

export const useUserCart = create<CartStoreState>((set) => ({
    items: null,
    count:0,
    setCount: (count) => set({count}),
    setCartItems: (items) => set({ items }),
    removeItem: (productId) => set((state) => ({ items: state.items ? state.items.filter(item => item.productId !== productId) : null })),
    setSingleItem: (item) => set((state) => ({ items: state.items ? [...state.items, item] : [item] })),
}));
