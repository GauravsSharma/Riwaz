import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
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

//edit address type
export interface AddressEdit{
  
  id:string,
  address1: string
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  
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

// use to add address
export const addAddress = () =>{
    const queryClient = useQueryClient();

    return useMutation({
 
      mutationFn:async(data:Address) =>{

       const res=await api.post("/user/address",data);
       return res.data;

      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Address"] });
        toast.success("Address added");
      }
   
});}


//used to get all address
export const getAddress = () => {

    
 
 return useQuery<AddressResponse>({
    queryKey: ["Address"],
    queryFn: async () => {
      const res = await api.get("/user/address")
      
      console.log("Data------------>",res.data);
       return res.data ?? { addresses: [] };
      
    
    },
  });





};

//delete the address


export const deleteAddress = () =>{
  const queryClient = useQueryClient();

     return useMutation({
 
      mutationFn:async(id:string) =>{
 
       const res=await api.delete(`/user/address/${id}`);
       return res.data;

      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Address"] });
        toast.success("Address deleted");
      }
   
});


}

//edit the address

export const useEditAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddressEdit) => {
      console.log("id is: ",data.id);
      const res = await api.put(`/user/address/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Address"] });
      toast.success("Address updated");
    },
  });
};


// get ProductRecommendationByQuery

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

// Verify OTP → return token + user
export const useLogout = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/user/logout");
      return res.data;
    },
    onSuccess: () => {  
      setUser(null);
      toast.success("Logout successful!");
    },
  });
};


