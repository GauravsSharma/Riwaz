import { create } from "zustand";

type ProductStoreState = {
    products: Product[] | null;
    mainProduct:MainProduct|null;
    variants:Variant[]|null;
    setMainProduct:(product:MainProduct|null)=>void
    setProducts: (products: Product[] | null) => void;
    setVariants: (Variant: Variant[] | null) => void;
};

export const useProductStore = create<ProductStoreState>((set) => ({
    products: null,
    mainProduct:null,
    variants:null,
    setVariants:(variants)=>set({variants}),
    setMainProduct:(product)=>set({mainProduct:product}),
    setProducts: (products) => set({ products }),
}));
