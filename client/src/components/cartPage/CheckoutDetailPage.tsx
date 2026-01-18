
"use client"
import React, { useEffect, useState } from 'react';
import { MapPin, Plus, CreditCard, Banknote, ChevronRight, ArrowLeft } from 'lucide-react';
import { useUserCart } from '@/stores/buyer/cart.user';
import Cart_Card from '../cards/Cart_Card';
import { toast } from 'react-toastify';
import { useClearCart, useCreateCheckoutSession, useCreateOrder } from '@/hooks/buyer/useUserCart';
import { useAddressStore } from '@/stores/buyer/address.user';
import { useRouter } from 'next/navigation';

// Types
// interface Address {
//   _id: string;
//   address: string;
//   landmark: string;
//   state: string;
//   pinCODe: string;
// }


interface CheckoutData {
  selectedAddressId: string | null;
  products: CartItem[] | null;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe' | null;
}

// Components
const DeliveryAddressCard: React.FC<{
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ address, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
  >
    <div className="flex items-start gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${isSelected ? 'border-blue-600' : 'border-gray-300'
        }`}>
        {isSelected && <div className="w-3 h-3 rounded-full bg-blue-600" />}
      </div>
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">{address.address}</p>
            <p className="text-sm text-gray-600 mt-1">
              {address.landmark}, {address.state} - {address.pincode}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DeliverySection: React.FC<{
  addresses: Address[];
  selectedId: string | null;
  onSelectAddress: (id: string) => void;
  onAddAddress: () => void;
}> = ({ addresses, selectedId, onSelectAddress, onAddAddress }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
        1
      </div>
      <h2 className="text-xl font-bold text-gray-900">SELECT DELIVERY ADDRESS</h2>
    </div>

    <div className="space-y-3">
      {addresses.map((address) => (
        <DeliveryAddressCard
          key={address._id}
          address={address}
          isSelected={selectedId === address._id}
          onSelect={() => onSelectAddress(address._id)}
        />
      ))}

      <button
        onClick={onAddAddress}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add New Address
      </button>
    </div>
  </div>
);

const OrderSummarySection: React.FC<{
  products: CartItem[];
  estimatedDelivery: string;
  isEnabled: boolean;
  onContinue: () => void;
}> = ({ products, estimatedDelivery, isEnabled, onContinue }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-6 transition-opacity ${!isEnabled ? 'opacity-50 pointer-events-none' : ''
    }`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isEnabled ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
        }`}>
        2
      </div>
      <h2 className="text-xl font-bold text-gray-900">ORDER SUMMARY</h2>
    </div>

    <p className="text-sm text-gray-600 mb-4">
      Estimated delivery by <span className="text-red-600 font-semibold">{estimatedDelivery}</span>
    </p>

    <div className="space-y-4">
      {products.map((item) => (
        <Cart_Card
          key={item.productId}
          title={item.title}
          color={item.color}
          price={item.unitPrice}
          thumbnail={item.thumbnail}
          quan={item.quantity}
          productId={item.productId}
          setItem={() => { }}
          setIsOpen={() => { }}
          discountPercentage={item.discountPercentage} />
      ))}
    </div>

    {isEnabled && (
      <button
        onClick={onContinue}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    )}
  </div>
);

const PaymentSection: React.FC<{
  isEnabled: boolean;
  selectedMethod: 'COD' | 'Razorpay' | 'Stripe' | null;
  onSelectMethod: (method: 'COD' | 'Razorpay' | 'Stripe') => void;
  onPlaceOrder: () => void;
}> = ({ isEnabled, selectedMethod, onSelectMethod, onPlaceOrder }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-6 transition-opacity ${!isEnabled ? 'opacity-50 pointer-events-none' : ''
    }`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isEnabled ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
        }`}>
        3
      </div>
      <h2 className="text-xl font-bold text-gray-900">PAYMENT METHOD</h2>
    </div>

    <div className="space-y-3">
      <div
        onClick={() => onSelectMethod('Razorpay')}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'Razorpay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'Razorpay' ? 'border-blue-600' : 'border-gray-300'
            }`}>
            {selectedMethod === 'Razorpay' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
          </div>
          <CreditCard className="w-6 h-6 text-gray-700" />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Razorpay Payment</p>
            <p className="text-sm text-gray-600">Pay using Credit/Debit Card</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => onSelectMethod('COD')}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'COD' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'COD' ? 'border-blue-600' : 'border-gray-300'
            }`}>
            {selectedMethod === 'COD' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
          </div>
          <Banknote className="w-6 h-6 text-gray-700" />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Cash on Delivery</p>
            <p className="text-sm text-gray-600">Pay when you receive</p>
          </div>
        </div>
      </div>
    </div>

    {isEnabled && selectedMethod && (
      <button
        onClick={onPlaceOrder}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Place Order
      </button>
    )}
  </div>
);

// Main Component
export default function CheckoutDetailPage({
  setShowCheckoutPage,
  setIsCheckOutLoaderOpen,
  loadPaymentPage
}: {
  loadPaymentPage: (order: RazorpayOrder) => void
  setShowCheckoutPage: (x: boolean) => void
  setIsCheckOutLoaderOpen: (x: boolean) => void
}) {
  const addressesFromStore: Address[] = useAddressStore((state) => state.addresses);
  const [addresses, setAddresses] = useState<Address[]>();
  const cartItems: CartItem[] | null = useUserCart((state) => state.items);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    selectedAddressId: null,
    products: cartItems,
    paymentMethod: null
  });
  const { mutate } = useCreateCheckoutSession();
  const { mutate: mutateCreateOrder } = useCreateOrder()
  const {mutate:clearCartIten} = useClearCart()
  const setCartItems = useUserCart(s=>s.setCartItems)
  const setCount = useUserCart(s=>s.setCount)
  const setTotalActualAmount = useUserCart(s=>s.setTotalActualAmount)
  const setTotalDiscountedAmount = useUserCart(s=>s.setTotalDiscountedAmount)
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleSelectAddress = (id: string) => {
    setCheckoutData({ ...checkoutData, selectedAddressId: id });
    setShowOrderSummary(true);
  };
  const handleContinueToPayment = () => {
    setShowPayment(true);
  };

  const handleSelectPaymentMethod = (method: 'COD' | 'Razorpay' | 'Stripe') => {
    setCheckoutData({ ...checkoutData, paymentMethod: method });
  };
  const clearCart = ()=>{
     clearCartIten(undefined,{
      onSuccess: ()=>{
        setCartItems([])
        setCount(0)
        setTotalActualAmount(0)
        setTotalDiscountedAmount(0)
      }
     })
  }
  useEffect(() => {
    setAddresses(addressesFromStore.length ? addressesFromStore : []);
  }, [addressesFromStore]);
  const handlePlaceOrder = () => {
    // console.log(checkoutData);
    if (checkoutData.products === null || checkoutData.selectedAddressId === null || checkoutData.paymentMethod === null) return;
    
    setIsCheckOutLoaderOpen(true);
    if (checkoutData.paymentMethod === "Razorpay") {
      mutate({ coupon: "NONE", shippingAddress: checkoutData.selectedAddressId, paymentMethod: checkoutData.paymentMethod }, {
        onSuccess: (order:RazorpayOrder) => {
          setIsCheckOutLoaderOpen(false)
          loadPaymentPage(order)
        },
        onError: () => {
          setIsCheckOutLoaderOpen(false)
          toast.error("Something went wrong")
        }
      })
    }
    else if( checkoutData.paymentMethod === "COD"){
      mutateCreateOrder({ coupon: "NONE", shippingAddress: checkoutData.selectedAddressId, paymentMethod: checkoutData.paymentMethod }, {
        onSuccess: (orderId:string) => { 
          clearCart()
          setIsCheckOutLoaderOpen(false)
          toast.success("Order placed successfully")
          router.push(`/success/${orderId}`)
        },
        onError: () => {
          setIsCheckOutLoaderOpen(false)
          toast.error("Something went wrong")
        }
      })
    }
  };
  if (checkoutData.products === null) {
    return <div className="xl:col-span-2 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className=" flex items-center gap-3 text-3xl font-bold text-gray-900 mb-8">
          <div className='flex justify-center items-center border-2 border-zinc-500 cursor-pointer rounded-sm ' onClick={() => setShowCheckoutPage(false)}>
            <ArrowLeft className=' text-zinc-500' />
          </div>
          Checkout</h1>
        <div className=' text-center text-gray-700 font-medium text-lg'>Your cart is empty. Please add items to cart before proceeding to checkout.</div>
      </div>
    </div>
  }
  

  return (
    <div className="xl:col-span-2 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className=" flex items-center gap-3 text-3xl font-bold text-gray-900 mb-8">
          <div className='flex justify-center items-center border-2 border-zinc-500 cursor-pointer rounded-sm ' onClick={() => setShowCheckoutPage(false)}>
            <ArrowLeft className=' text-zinc-500' />
          </div>

          Checkout</h1>

        {addresses && <DeliverySection
          addresses={addresses}
          selectedId={checkoutData.selectedAddressId}
          onSelectAddress={handleSelectAddress}
          onAddAddress={() => setIsModalOpen(true)}
        />}

        <OrderSummarySection
          products={checkoutData.products}
          estimatedDelivery="Thursday, December 28, 2023"
          isEnabled={showOrderSummary}
          onContinue={handleContinueToPayment}
        />

        <PaymentSection
          isEnabled={showPayment}
          selectedMethod={checkoutData.paymentMethod}
          onSelectMethod={handleSelectPaymentMethod}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
}