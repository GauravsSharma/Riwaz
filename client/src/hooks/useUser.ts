import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";
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

// product recommendation.... thumbnail type
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

// Product recommendation API response
export interface ProductRecommendationResponse {
  success: boolean;
  products: Products[];
}


export interface ProductSuggestionResponse{

  success:boolean;
  suggestions:string[]
    
}



interface VerifyOtpPayload {
  phone: string;
  otp: string;
  userType: "seller" | "customer";
}

interface UserDetails{
   name:string;
   email:string
}

//AddressResponse-picture of address 
export interface AddressResponse {
  addresses: Address[];
}

// ------------------------
// GET current user
// ------------------------
export const useCurrentUser = () => {
  // Explicitly type 's' to UserState
  const setUser = useUserStore((s: UserState) => s.setUser);
 
  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get("/user")
      setUser(res.data.user);
      console.log("Data------------>",res.data);
      
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
// Verify OTP → return token + user
// ------------------------
export const useVerifyOtp = () => {
  const setUser = useUserStore((s) => s.setUser);

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

//used to edit profile 
export const useUpdateOrEditProfile = () =>{
    return useMutation({
       mutationFn:async(data:UserDetails) =>{
          const res=await api.put("/user/profile",data);
          return res.data;
        }
    });

}
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