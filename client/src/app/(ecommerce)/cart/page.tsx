"use client";
import React, { useEffect, useState } from 'react';
import { Tag, Truck } from 'lucide-react';
import Cart_Card from '@/components/cards/Cart_Card';
import { useCreateCheckoutSession, useGetCartItems, useGetCartSummary } from '@/hooks/buyer/useUserCart';
import { useUserCart } from '@/stores/buyer/cart.user';
import DeleteCartItem from '@/components/models/DeleteCartItem';
import { useUserStore } from '@/stores/user.store';
import { toast } from 'react-toastify';
import CheckoutSessionLoader from '@/components/loaders/CheckoutSessionLoader';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

const ShoppingCartPage = () => {
  const [item, setItem] = useState<string>();
  useGetCartSummary()
  const user = useUserStore(s => s.user)
  const [isOpen, setIsOpen] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const { isLoading } = useGetCartItems(!!user)
  const [isCheckOutLoaderOpen, setIsCheckOutLoaderOpen] = useState(true);
  const totalAmount = useUserCart((s) => s.totalDiscountedAmount);
  const totalActualAmount = useUserCart((s) => s.totalActualAmount);
  const setTotalActualAmount = useUserCart((s) => s.setTotalActualAmount);
  const setTotalDiscountedAmount = useUserCart((s) => s.setTotalDiscountedAmount);
  const { mutate } = useCreateCheckoutSession();
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([]);
  const cartItems = useUserCart((s) => s.items);

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
    setIsCheckOutLoaderOpen(true);
    mutate({ coupon: "NONE" }, {
      onSuccess: (order: RazorpayOrder) => {
        setIsCheckOutLoaderOpen(false);
        loadPaymentPage(order)
      },
      onError: () => {
        setIsCheckOutLoaderOpen(false)
        toast.error("Something went wrong")
      }
    })
  }
  const loadPaymentPage = (order: RazorpayOrder) => {
    let options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. 
      "currency": "INR",
      "name": "Riwaz",
      "description": "",
      "image": "/logo.png",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_API_URL}/order/paymentVerification`,
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }

  if (isLoading) {
    return <div className='h-screen bg-amber-200 flex justify-center items-center'>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 relative mt-34">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Shopping cart</h1>
                <div className="text-base md:text-lg font-semibold text-gray-900">
                  Total: ₹{totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Cart Item */}
              {
                items && items.length > 0 ? (
                  items.map((item, i) => (
                    <Cart_Card
                      key={item.productId + i}
                      title={item.title}
                      color={item.color}
                      price={item.unitPrice}
                      thumbnail={item.thumbnail}
                      quan={item.quantity}
                      productId={item.productId}
                      setItem={setItem}
                      setIsOpen={setIsOpen}
                      discountPercentage={item.discountPercentage}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">Your cart is empty.</div>
                )
              }
            </div>
          </div>

          {/* Price Details Section */}
          {items && items.length > 0 && <div className="xl:col-span-1 h-screen sticky top-6 right-0">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Price Details</h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total MRP</span>
                  <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount on MRP</span>
                  <span className="font-medium text-green-600">-₹{(totalActualAmount - totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-red-500">Free Delivery</span>
                </div>
              </div>

              {/* Free Delivery Badge */}
              <div className="flex items-center gap-2 mb-4 md:mb-6 p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-600 shrink-0" size={16} />
                <span className="text-sm font-medium text-green-700">Free delivery order over ₹499</span>
              </div>

              {/* Coupon Section */}
              <div className="mb-4 md:mb-6">
                <button
                  onClick={handleCouponToggle}
                  className="flex items-center gap-2 w-full p-3 border border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                >
                  <Tag size={16} />
                  <span className="font-medium">Apply coupon</span>
                </button>

                {showCouponInput && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}

                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Total and Checkout */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg font-semibold text-gray-700">Total Amount</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors cursor-pointer">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>}
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