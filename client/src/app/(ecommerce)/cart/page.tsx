"use client";
import React, { useEffect, useState } from 'react';
import { useClearCart,useGetCartItems, useGetCartSummary } from '@/hooks/buyer/useUserCart';
import { useUserCart } from '@/stores/buyer/cart.user';
import DeleteCartItem from '@/components/models/DeleteCartItem';
import { useUserStore } from '@/stores/user.store';
import { toast } from 'react-toastify';
import CheckoutSessionLoader from '@/components/loaders/CheckoutSessionLoader';
import Script from 'next/script';
import CartPageSidebar from '@/components/shared/sidebars/CartPageSidebar';
import ViewCartItems from '@/components/sections/ViewCartItems';
import CheckoutDetailPage from '@/components/cartPage/CheckoutDetailPage';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import EmptyCart from '@/components/sections/EmptyCart';
import { useGetAddresses } from '@/hooks/buyer/useAddress';

const ShoppingCartPage = () => {
  const [item, setItem] = useState<string>();
  const user = useUserStore(s => s.user)
  const [isOpen, setIsOpen] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [isCheckOutLoaderOpen, setIsCheckOutLoaderOpen] = useState(false);
  const setTotalDiscountedAmount = useUserCart((s) => s.setTotalDiscountedAmount);
  const setTotalActualAmount = useUserCart((s) => s.setTotalActualAmount);
  const totalAmount = useUserCart((s) => s.totalDiscountedAmount);
  const totalActualAmount = useUserCart((s) => s.totalActualAmount);
  useGetAddresses();
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { isLoading } = useGetCartItems(!!user)
  const cartItems = useUserCart((s) => s.items);
  useGetCartSummary()
  const clearCart = useClearCart();
  const handleCouponToggle = () => {
    setShowCouponInput(!showCouponInput);
  };
  useEffect(() => {
    if (user && cartItems) {
      setItems(cartItems);
    } else {
      const localItems = JSON.parse(
        localStorage.getItem('guest-cart') || '[]'
      );
      setItems(localItems);
      const totalActualAmount = localItems.reduce((acc: number, item: CartItem) => {
        return acc + (item.originalPrice * item.quantity)
      }, 0)
      const totalDiscountedAmount = localItems.reduce((acc: number, item: CartItem) => {
        return acc + (item.unitPrice * item.quantity)
      }, 0)
      setTotalActualAmount(totalActualAmount)
      setTotalDiscountedAmount(totalDiscountedAmount)
    }
  }, [user, cartItems, setTotalActualAmount, setTotalDiscountedAmount]);
  const handleCheckout = () => {
    if (!user) {
      toast.info("Please login first.");
      return;
    }
    setShowCheckoutPage(true)

  }
 const loadPaymentPage = (order: RazorpayOrder) => {
  const options: RazorpayOptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
    amount: order.amount,
    currency: "INR",
    name: "Riwaz",
    description: "",
    image: "/logo.png",
    order_id: order.id,

    handler: async (response) => {
      try {
        const res = await api.post<{
          success: boolean;
          orderId: string;
        }>("/order/paymentVerification", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (res.data.success) {
          clearCart.mutate();
          router.push(`/success/${res.data.orderId}`);
        }
      } catch (err) {
        console.log(err);
        
        toast.error("Payment verification failed");
      }
    },

    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "+919876543210",
    },

    notes: {
      address: "Razorpay Corporate Office",
    },

    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

  if (isLoading) {
    return <div className='h-screen bg-purple-200 flex justify-center text-xl font-semibold items-center'>Loading...</div>
  }
  if(!items || items.length === 0){
    return <EmptyCart/>
  }
  return (
    <div className="min-h-screen bg-gray-50 relative mt-24 md:mt-34">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          {
            !showCheckoutPage && items && items.length > 0 && <ViewCartItems
              items={items}
              totalAmount={totalAmount}
              setItem={setItem}
              setIsOpen={setIsOpen}
            />
          }
          {showCheckoutPage && <CheckoutDetailPage setShowCheckoutPage={setShowCheckoutPage} setIsCheckOutLoaderOpen={setIsCheckOutLoaderOpen} loadPaymentPage={loadPaymentPage} />}

          {/* Price Details Section */}
          {items && items.length > 0 && <CartPageSidebar
            totalAmount={totalAmount}
            totalActualAmount={totalActualAmount}
            handleCouponToggle={handleCouponToggle}
            handleCheckout={handleCheckout}
            showCheckoutPage={showCheckoutPage}
          />}
        </div>
      </div>
      {
        isOpen && item && <DeleteCartItem
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productId={item}
        />
      }
      {isCheckOutLoaderOpen && <CheckoutSessionLoader />}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </div>

  );
};

export default ShoppingCartPage;