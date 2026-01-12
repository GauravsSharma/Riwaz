import { create } from "zustand";

type StoreState = {
    stores: Store[] | null;
    setStores: (stores: Store[] | null) => void;
    createStore: (store: Store) => void;
    updateStore: (store: Store) => void;
    deleteStore: (storeId: string) => void;

};

export const useSellerStore = create<StoreState>((set) => ({
    stores: null,
    setStores: (stores) => set({ stores }),
    createStore: ((store) => {
        set((state) => ({
            stores: state.stores ? [...state.stores, store] : [store],
        }));
    }),
    updateStore: (()=>{

    }),
    deleteStore: ((storeId) => {

    }),
}));
