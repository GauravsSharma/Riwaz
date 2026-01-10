
"use client"
import React, { useState } from 'react';
import { MapPin, Plus, CreditCard, Banknote, ChevronRight, ArrowLeft } from 'lucide-react';

// Types
interface Address {
  _id: string;
  address: string;
  landmark: string;
  state: string;
  pincode: string;
}

interface Product {
  _id: string;
  img: string;
  title: string;
  color: string;
  price: number;
  quantity: number;
}

interface CheckoutData {
  selectedAddressId: string | null;
  products: Product[];
  paymentMethod: 'online' | 'cod' | null;
}

// Sample Data
const sampleAddresses: Address[] = [
  {
    _id: 'addr_1',
    address: 'Paktola Tajganj shivmandir',
    landmark: 'Near Shiv Temple',
    state: 'Uttar Pradesh',
    pincode: '282002'
  },
  {
    _id: 'addr_2',
    address: '123 Main Street, Sadar Bazaar',
    landmark: 'Opposite City Mall',
    state: 'Uttar Pradesh',
    pincode: '282001'
  }
];

const sampleProducts: Product[] = [
  {
    _id: 'prod_1',
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop',
    title: 'Dusty Pink Textured Oversized Shirt',
    color: 'Dusty Pink',
    price: 799,
    quantity: 1
  }
];

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
  products: Product[];
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
      {products.map((product) => (
        <div key={product._id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
          <img
            src={product.img}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{product.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">Color:</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-pink-300 border border-gray-300" />
                <span className="text-sm text-gray-800">{product.color}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">QTY</span>
                <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1">
                  <button className="text-gray-600 hover:text-gray-900">-</button>
                  <span className="font-medium">{product.quantity}</span>
                  <button className="text-gray-600 hover:text-gray-900">+</button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</div>
                <div className="text-xs text-green-600 font-medium">(33% off)</div>
              </div>
            </div>
          </div>
        </div>
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
  selectedMethod: 'online' | 'cod' | null;
  onSelectMethod: (method: 'online' | 'cod') => void;
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
        onClick={() => onSelectMethod('online')}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'online' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'online' ? 'border-blue-600' : 'border-gray-300'
            }`}>
            {selectedMethod === 'online' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
          </div>
          <CreditCard className="w-6 h-6 text-gray-700" />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Online Payment</p>
            <p className="text-sm text-gray-600">Pay using Credit/Debit Card</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => onSelectMethod('cod')}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'
            }`}>
            {selectedMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
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

const AddAddressModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (address: Omit<Address, '_id'>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    address: '',
    landmark: '',
    state: '',
    pincode: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ address: '', landmark: '', state: '', pincode: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add New Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function CheckoutDetailPage({
    setShowCheckoutPage
}:{
    setShowCheckoutPage:(x:boolean)=>void
}) {
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    selectedAddressId: null,
    products: sampleProducts,
    paymentMethod: null
  });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAddress = (id: string) => {
    setCheckoutData({ ...checkoutData, selectedAddressId: id });
    setShowOrderSummary(true);
  };

  const handleAddAddress = (newAddress: Omit<Address, '_id'>) => {
    const address: Address = {
      ...newAddress,
      _id: `addr_${Date.now()}`
    };
    setAddresses([...addresses, address]);
  };

  const handleContinueToPayment = () => {
    setShowPayment(true);
  };

  const handleSelectPaymentMethod = (method: 'online' | 'cod') => {
    setCheckoutData({ ...checkoutData, paymentMethod: method });
  };

  const handlePlaceOrder = () => {
    const finalData = {
      selectedAddressId: checkoutData.selectedAddressId,
      products: checkoutData.products.map(p => ({
        _id: p._id,
        img: p.img,
        title: p.title,
        color: p.color,
        price: p.price,
        quantity: p.quantity
      })),
      paymentMethod: checkoutData.paymentMethod
    };

    console.log('=== ORDER PLACED ===');
    console.log('Selected Address ID:', finalData.selectedAddressId);
    console.log('Products:', finalData.products);
    console.log('Payment Method:', finalData.paymentMethod);
    console.log('===================');

    alert('Order placed successfully! Check console for details.');
  };

  return (
    <div className="xl:col-span-2 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className=" flex items-center gap-3 text-3xl font-bold text-gray-900 mb-8">
            <div className='flex justify-center items-center border-2 border-zinc-500 cursor-pointer rounded-sm ' onClick={()=>setShowCheckoutPage(false)}>
              <ArrowLeft className=' text-zinc-500'/>
            </div>
            
            Checkout</h1>

        <DeliverySection
          addresses={addresses}
          selectedId={checkoutData.selectedAddressId}
          onSelectAddress={handleSelectAddress}
          onAddAddress={() => setIsModalOpen(true)}
        />

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

      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAddress}
      />
    </div>
  );
}