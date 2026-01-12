import api from "@/lib/axios";
import { useProductStore } from "@/stores/buyer/products.store";
import { useQuery } from "@tanstack/react-query";

interface SingleProduct{
  product: MainProduct;
  variants: Variant[];
  success: boolean;
}
// Product recommendation API response
export interface ProductRecommendationResponse {
  success: boolean;
  products: Product[];
}

export interface ProductSuggestionResponse{
  success:boolean;
  suggestions:string[]
}
export const useGetProducts = (query:string) => {
  const setProducts = useProductStore((s) => s.setProducts);
  return useQuery<Product[]>({
    queryKey: ["product-store",query],
    queryFn: async () => {
      const res = await api.get(`/product/search${query}`);
      setProducts(res.data.products);
    // console.log("Data------------>",res.data);
      return res.data.products;
    },
  });
};

export const useGetSingleProduct = () => {
  return useQuery<SingleProduct>({
    queryKey: ["product-single-store"],
    queryFn: async () => {
      const res = await api.get("/product/single")
      return res.data;
    },
  });
};
export const useGetMainProduct = (productId: string) => {
    const setMainProduct = useProductStore((s) => s.setMainProduct);
    const setVariants = useProductStore((s) => s.setVariants);

    return useQuery<MainProduct>({
        queryKey: ["main-product", productId],
        queryFn: async () => {
            const res = await api.get(`/product/id/${productId}`)
            setMainProduct(res.data.product);
            setVariants(res.data.variants)
            return res.data.product;
        },
    });
};

export const getProductRecommendation = (searchQuery: string) => {
  return useQuery<ProductSuggestionResponse>({
    queryKey: ["searchSuggestions", searchQuery],
    queryFn: async ({ queryKey }) => {
      const [, query] = queryKey;

      if (!query) {
        return { success: true, products: [] };
      }

      const response = await api.get(
        `/product/search/suggestions?q=${query}`,
       {
       headers: {
        "Cache-Control": "no-cache",
         Pragma: "no-cache",
       }
      }

      );

      console.log("Data------------>", response.data);
      return response.data;
    },
    enabled: !!searchQuery, // prevents empty calls
  });
};


export const getSearchRecommendation = (searchQuery: string) => {
  return useQuery<ProductRecommendationResponse>({
    queryKey: ["ProductSuggestions", searchQuery],
    queryFn: async ({ queryKey }) => {
      const [, query] = queryKey;

      if (!query) {
        return { success: true, products: [] };
      }

      const response = await api.get(
        `/product/query?q=${query}`,
       {
       headers: {
        "Cache-Control": "no-cache",
         Pragma: "no-cache",
       }
      }

      );

      console.log("Data------------>", response.data);
      return response.data;
    },
    enabled: !!searchQuery, // prevents empty calls
  });
};
