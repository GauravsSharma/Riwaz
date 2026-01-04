import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

// ------------------------
// Payload types
// ------------------------
interface SendOtpPayload {
  phone: string;
}

export interface ProductThumbnail {
  url: string;
  public_id: string;
}

export interface Products {
  _id: string;
  title: string;
  slug: string;
  type: string;
  price: number;
  thumbnail: ProductThumbnail;
}

export interface ProductRecommendationResponse {
  success: boolean;
  products: Products[];
}

export interface ProductSuggestionResponse {
  success: boolean;
  suggestions: string[];
}

interface VerifyOtpPayload {
  phone: string;
  otp: string;
  userType: "seller" | "customer";
}

interface UserDetails {
  name: string;
  email: string;
}

export interface AddressResponse {
  addresses: Address[];
}

export interface AddressEdit {
  id: string;
  address1: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

// ------------------------
// GET current user
// ------------------------
export const useCurrentUser = () => {
  const setUser = useUserStore((s: UserState) => s.setUser);

  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get("/user");
      setUser(res.data.user);
      return res.data.user;
    },
  });
};

// ------------------------
// Send OTP
// ------------------------
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: SendOtpPayload) => {
      const res = await api.post("/user/login", data);
      return res.data;
    },
  });
};

// ------------------------
// Verify OTP
// ------------------------
export const useVerifyOtp = () => {
  const setUser = useUserStore((s: UserState) => s.setUser);

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const res = await api.post<{ token: string; user: User }>(
        "/user/verify-otp",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

// ------------------------
// Edit profile
// ------------------------
export const useUpdateOrEditProfile = () => {
  return useMutation({
    mutationFn: async (data: UserDetails) => {
      const res = await api.put("/user/profile", data);
      return res.data;
    },
  });
};

// ------------------------
// Add address
// ------------------------
export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Address) => {
      const res = await api.post("/user/address", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Address"] });
      toast.success("Address added");
    },
  });
};

// ------------------------
// Get addresses
// ------------------------
export const useGetAddresses = () => {
  return useQuery<AddressResponse>({
    queryKey: ["Address"],
    queryFn: async () => {
      const res = await api.get("/user/address");
      return res.data ?? { addresses: [] };
    },
  });
};

// ------------------------
// Delete address
// ------------------------
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/user/address/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Address"] });
      toast.success("Address deleted");
    },
  });
};

// ------------------------
// Edit address
// ------------------------
export const useEditAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddressEdit) => {
      const res = await api.put(`/user/address/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Address"] });
      toast.success("Address updated");
    },
  });
};

// ------------------------
// Search suggestions
// ------------------------
export const getProductRecommendation = (searchQuery: string) => {
  return useQuery<ProductSuggestionResponse>({
    queryKey: ["searchSuggestions", searchQuery],
    queryFn: async ({ queryKey }) => {
      const [, query] = queryKey;
      if (!query) return { success: true, suggestions: [] };

      const response = await api.get(
        `/product/search/suggestions?q=${query}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      return response.data;
    },
    enabled: !!searchQuery,
  });
};

export const getSearchRecommendation = (searchQuery: string) => {
  return useQuery<ProductRecommendationResponse>({
    queryKey: ["ProductSuggestions", searchQuery],
    queryFn: async ({ queryKey }) => {
      const [, query] = queryKey;
      if (!query) return { success: true, products: [] };

      const response = await api.get(`/product/query?q=${query}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      return response.data;
    },
    enabled: !!searchQuery,
  });
};

// ------------------------
// Logout
// ------------------------
export const useLogout = (setIsOpen: (open: boolean) => void) => {
  const setUser = useUserStore((s: UserState) => s.setUser);

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/user/logout");
      return res.data;
    },
    onSuccess: () => {
      setUser(null);
      setIsOpen(false);
      toast.success("Logout successful!");
    },
    onError: () => {
      toast.error("Logout failed!");
    },
  });
};
