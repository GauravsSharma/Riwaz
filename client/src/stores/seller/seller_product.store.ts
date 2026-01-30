import { create } from "zustand";

type SellerProductState = {
  products: BaseProduct[] | null;
  setProducts: (products: BaseProduct[] | null) => void;
  addBaseProduct: (product: BaseProduct) => void;
  addVariant: (variant: SellerProduct) => void;
  updateVariant: (variant: SellerProduct) => void;
  deleteVariant: (variantId: string) => void;
};

export const useSellerProducts = create<SellerProductState>((set) => ({
  products: null,
  setProducts: (products) => set({ products }),

  // Add a single base product to products
  addBaseProduct: (product) => {
    set((state) => ({
      products: state.products ? [...state.products, product] : [product],
    }));
  },

  // Add a variant to a product's variants array
  addVariant: (variant) => {
    set((state) => ({
      products: state.products
        ? state.products.map((product) =>
            product._id === variant.parentId
              ? {
                  ...product,
                  varients: [...product.varients, variant],
                }
              : product
          )
        : null,
    }));
  },

  // Update a variant in the products
  updateVariant: (updatedVariant) => {
    set((state) => ({
      products: state.products
        ? state.products.map((product) =>
            product._id === updatedVariant.parentId
              ? {
                  ...product,
                  varients: product.varients.map((variant) =>
                    variant._id === updatedVariant._id
                      ? updatedVariant
                      : variant
                  ),
                }
              : product
          )
        : null,
    }));
  },

  // Delete a variant by variantId
  deleteVariant: (variantId) => {
    set((state) => ({
      products: state.products
        ? state.products.map((product) => ({
            ...product,
            varients: product.varients.filter(
              (variant) => variant._id !== variantId
            ),
          }))
        : null,
    }));
  },
}));