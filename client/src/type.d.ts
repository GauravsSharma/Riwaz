declare module "*.css";
interface User {
  _id: string;
  fullName: string | null;
  email: string | null;
  phone: string;
  address: string[];          // array of address IDs or strings
  isAdmin: boolean;
  userType: "seller" | "customer";
  createdAt: string;          // ISO date string
  updatedAt: string;          // ISO date string
  __v: number;
}
interface Store {
  _id: string;
  name: string;
  description: string;
  address: string;

}
interface Product {
  _id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  thumbnail: {
    url: string,
    public_id: string
  };
}

interface SellerProduct {
  _id: string;
  title: string;
  isActive: boolean;
  stock: number;
  price: number;
  status: string
  thumbnail: {
    public_id: string;
    url: string;
  };
  slug: string
}
interface BaseProduct {
  _id: string,
  title: string,
  isParent: boolean
  storeId: string,
  varients: SellerProduct[]
}

interface MainProduct {
  _id: string
  title: string,
  price: number,
  originalPrice: number,
  discountPercentage: number,
  description: string,
  images: [
    {
      url: string,
      public_id: string
    }
  ]
  color: string,

}
interface Variant {
  thumbnail: {
    url: string,
    public_id: string
  },
  color: string,
  _id: string
}

interface ReviewUser {
  _id: string;
  fullName: string
}

interface ProductReview {
  _id: string;
  review: string;
  rating: number;
  userId: ReviewUser;
  createdAt: string;
}
interface RatingBreakdown {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

interface CartItem {
  productId: string; // ObjectId as string
  quantity: number;
  unitPrice: number;
  color: string;
  title: string;
  thumbnail: string,
  discountPercentage: number,
  originalPrice: number
}
interface Address {
  type:"home"|"office"|"other"
  _id:string,
  address: string,
  landmark: string,
  city: string,
  state:string,
  pincode: string,
  country: string,
  isDefault: boolean
}
