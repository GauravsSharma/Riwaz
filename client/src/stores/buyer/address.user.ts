import { create } from "zustand";

// Input type for editing/updating
export interface EditAddressInput {
  id: string;
  landmark: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
}

// Zustand store state type
type AddressStoreState = {
  addresses: Address[];
  selectedAddress: Address | null;

  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setSelectedAddress: (address: Address | null) => void;
};

// Create store
export const useAddressStore = create<AddressStoreState>((set) => ({
  addresses: [], // default empty array
  selectedAddress: null,
  // Set all addresses
  setAddresses: (addresses) => set({ addresses }),
  // Add single address
  addAddress: (address) =>
    set((state) => ({
      addresses: [...state.addresses, address],
    })),

  // Update address by id
  updateAddress: (address) =>
    set((state) => ({
      addresses: state.addresses.map((a) =>
        a._id === address._id ? { ...a, ...address } : a
      ),
    })),

  // Remove address by id
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((a) => a._id !== id),
    })),

  // Set selected address (nullable)
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
