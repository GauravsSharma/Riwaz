import { Tag, Truck, ChevronDown, ChevronUp } from 'lucide-react'
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
    const [isMobile, setIsMobile] = React.useState(false);
    const [showMobilePriceDetails, setShowMobilePriceDetails] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
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
                </div>
            )}

            {/* Mobile Version */}
            {isMobile && !showCheckoutPage && (
                <>
                    {/* Expandable Price Details Card */}
                    <div className="mx-4 mb-4 rounded-2xl backdrop-blur-xl bg-white/90 border border-white/20 shadow-lg">
                        {/* Header - Always Visible */}
                        <button
                            onClick={() => setShowMobilePriceDetails(!showMobilePriceDetails)}
                            className="w-full flex items-center justify-between px-4 py-4"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-700">Price Details</span>
                            </div>
                            {showMobilePriceDetails ? (
                                <ChevronUp className="text-gray-600" size={20} />
                            ) : (
                                <ChevronDown className="text-gray-600" size={20} />
                            )}
                        </button>

                        {/* Expandable Content */}
                        {showMobilePriceDetails && (
                            <div className="px-4 pb-4 space-y-4">
                                {/* Price Breakdown */}
                                <div className="space-y-3 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total MRP</span>
                                        <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Discount on MRP</span>
                                        <span className="font-medium text-green-600">-₹{(totalActualAmount - totalAmount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery</span>
                                        <span className="font-medium text-red-500">Free</span>
                                    </div>
                                </div>

                                {/* Free Delivery Badge */}
                                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                    <Truck className="text-green-600 shrink-0" size={16} />
                                    <span className="text-xs font-medium text-green-700">Free delivery order over ₹499</span>
                                </div>

                                {/* Coupon Section */}
                                <div>
                                    <button
                                        onClick={handleCouponToggle}
                                        className="flex items-center gap-2 w-full p-3 border border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        <Tag size={16} />
                                        <span className="text-sm font-medium">Apply coupon</span>
                                    </button>

                                    {showCouponInput && (
                                        <div className="mt-3 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                                                Apply
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Bottom Checkout Bar */}
                    <div className="fixed bottom-0 left-0 right-0 z-50">
                        <div className="mx-4 mb-4 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-4">
                                {/* Left: Total Amount */}
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">Total Amount</span>
                                    <span className="text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                                </div>

                                {/* Right: Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Spacing to prevent content from being hidden */}
                    <div className="h-24"></div>
                </>
            )}
        </>
    )
}

export default CartPageSidebar