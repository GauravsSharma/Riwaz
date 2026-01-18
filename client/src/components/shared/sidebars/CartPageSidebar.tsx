import { Tag, Truck } from 'lucide-react'
import React from 'react'

const CartPageSidebar = ({
    totalAmount,
    totalActualAmount,
    handleCouponToggle,
    handleCheckout,
    showCheckoutPage
}:{
    totalAmount: number,
    totalActualAmount: number,
    handleCouponToggle: () => void,
    handleCheckout: () => void,
    showCheckoutPage:boolean
}) => {
    const [showCouponInput] = React.useState(false);
    const [couponCode, setCouponCode] = React.useState('');
    return (
        <>
            {
                <div className="xl:col-span-1 h-screen sticky top-40 right-0">
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

                       { 
                        !showCheckoutPage &&
                        <>
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
                        </>}
                    </div>
                </div>}
        </>
    )
}

export default CartPageSidebar
