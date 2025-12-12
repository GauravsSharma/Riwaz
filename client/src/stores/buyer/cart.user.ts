import { create } from "zustand";

type CartStoreState = {
    items: CartItem[] | null;
    count: number;
    totalDiscountedAmount: number;
    totalActualAmount: number;
    setTotalActualAmount: (amount: number) => void;
    setTotalDiscountedAmount: (amount: number) => void;
    setCount: (count: number) => void;
    removeItem: (productId: string) => void;
    setSingleItem: (item: CartItem) => void;
    setCartItems: (item: CartItem[] | null) => void;
};

export const useUserCart = create<CartStoreState>((set) => ({
    items: null,
    count: 0,
    totalDiscountedAmount: 0,
    totalActualAmount: 0,
    setTotalActualAmount: (amount) => set({ totalActualAmount: amount }),
    setTotalDiscountedAmount: (amount) => set({ totalDiscountedAmount: amount }),
    setCount: (count) => set({ count }),
    setCartItems: (items) => set({ items }),
    removeItem: (productId) => set((state) => ({ items: state.items ? state.items.filter(item => item.productId !== productId) : null })),
    setSingleItem: (item) =>
        set((state) => {
            const items = state.items ?? [];
            const exists = items.find((i) => i.productId === item.productId);
            if (exists) {
                return {
                    items: items.map((i) =>
                        i.productId === item.productId ? item : i
                    ),
                };
            }
            return {
                items: [...items, item],
            };
        }),

}));
