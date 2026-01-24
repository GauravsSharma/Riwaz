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
  title: string,
  _id: string,
  price: number,
  originalPrice: number,
  stock: number,
  description: string,
  fabric: string,
  work: string,
  type: string,
  color: string,
  parentId: string,
  thumbnail:{
    url:string,
    public_id:string
  },
  isActive:boolean
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
  ],
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
  _id: string,
  address: string,
  landmark: string,
  city: string,
  state: string,
  pincode: string,
  country: string,
  isDefault: boolean,
  type: "home" | "work" | "other"
}
interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number;        // total amount (in paise)
  amount_paid: number;   // amount paid (in paise)
  amount_due: number;    // remaining amount (in paise)
  currency: string;      // "INR"
  receipt: string | null;
  offer_id: string | null;
  status: "created" | "attempted" | "paid";
  attempts: number;
  notes: Record<string, string>;
  created_at: number;    // UNIX timestamp (seconds)
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  thumbnail: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveredAt: string; // ISO date string
  createdAt: string;   // ISO date string
}

interface OrderedItem {
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  thumbnail?: string;
}

interface UserOrder {
  _id: string;
  orderItems: OrderedItem[];
  paymentMethod: 'COD' | 'Razorpay';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  deliveredAt?: string;
}
interface RazorpayOrder {
  id: string;
  amount: number;
  currency: "INR";
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  userType: 'customer' | 'seller' | 'admin';
  isAdmin: boolean;
}
interface AdminUser {
  _id: string
  fullName: string
  email: string
  phone: string
  userType: 'customer' | 'seller' | 'admin'
  isAdmin: boolean
}
interface AdminOrderItem {
  productId: {
    _id: string;
    title: string;
  };
  quantity: number;
  price: number;
  color: string;
  thumbnail: string;
}

interface AdminOrder {
  _id: string;
  userId: AdminUser;
  orderItems: AdminOrderItem[];
  shippingAddress: Address;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  paymentMode?: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  isCancelled: boolean;
  cancelReason: string;
  deliveredAt?: Date;
  razorpayOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}


