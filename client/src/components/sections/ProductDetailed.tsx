import { useAdditem, useGetCartSummary } from '@/hooks/buyer/useUserCart';
import { Banknote, ChevronDown, Minus, Plus, RotateCcw, Share2, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import { useQueryClient } from '@tanstack/react-query';
type Section = 'details' | 'return' | 'shipping' | 'seller' | 'help';
interface Props {
    product:MainProduct,
    productImages: {
        public_id: string;
        url: string;
    }[],
    rating: number|null,
    reviewsLen: number,
    variants: Variant[],
    isFromHome?:boolean
}
const ProductDetailed = ({
    product,
    productImages,
    rating,
    reviewsLen,
    variants,
    isFromHome = false
}:Props) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
        details: true,
        return: false,
        shipping: false,
        seller: false,
        help: false
    });
    const queryClient = useQueryClient();
    const router = useRouter()
    const [quantity, setQuantity] = useState(1);
    const {mutate,isPending}=useAdditem()
    const [pincode, setPincode] = useState('');
    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const toggleSection = (section: Section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const handleAddToCart=()=>{
       mutate({productId:product._id,quantity},{
        onSuccess:()=>{
             queryClient.invalidateQueries({ queryKey: ['cart-summary-store'] });
            toast.success("Item added to cart successfully!")
        },
        onError:()=>{
            toast.error("Failed to add item to cart.")
        }
       })
    }
    return (
        <div className={`flex flex-col lg:flex-row px-4 md:px-6 ${isFromHome?"lg:px-20":"lg:px-8"} pb-6 gap-8`}>
            {/* LEFT SECTION - Product Images */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
                <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
                    {/* Thumbnail Images */}
                    {productImages.length > 0 && (
                        <div className="flex md:flex-col gap-3 w-full md:w-20 overflow-x-auto md:overflow-x-visible">
                            {productImages.map((image, index) => (
                                <div
                                    key={image.public_id}
                                    className={`cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === index ? 'border-purple-700' : 'border-gray-200'
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={image.url}
                                        alt={`Product ${index + 1}`}
                                        className="w-16 h-20 md:w-full md:h-20 object-cover hover:opacity-80 transition"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Main Image */}
                    {productImages[selectedImage] && (
                        <div className="flex-1 relative">
                            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold z-10 rounded">
                                NEW ARRIVAL
                            </div>
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-4 right-4 bg-purple-700 text-white px-3 py-1 text-xs font-bold z-10 rounded">
                                    {product.discountPercentage}% OFF
                                </div>
                            )}
                            <img
                                src={productImages[selectedImage].url}
                                alt={product.title}
                                className="w-full h-96 lg:h-full object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SECTION - Product Details */}
            <div className="w-full lg:w-1/2">
                <div className="space-y-2">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {product.title}
                        </h1>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition">
                            <Share2 size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {product.originalPrice > product.price && (
                            <span className="text-gray-400 line-through text-lg">
                                ₹{product.originalPrice}
                            </span>
                        )}
                        <span className="text-3xl font-bold text-red-700">
                            ₹{product.price}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="bg-purple-700 text-white px-3 py-1 rounded text-sm font-semibold">
                                {product.discountPercentage}% OFF
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 font-semibold">Inclusive of all taxes.</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.floor(Number(rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">({reviewsLen})</span>
                    </div>

                    {/* Recent Purchases */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center gap-2">
                        <div className="bg-purple-700 p-1 rounded">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                            <span className="font-bold text-purple-700">223</span> Bought this in 24 hours
                        </span>
                    </div>

                    {/* Exclusive Discounts Banner */}
                   {!isFromHome && <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold text-gray-900">Exclusive Discounts + Gifts</span>
                        </div>
                        <p className="text-sm text-gray-700">
                            Only on App : <span className="text-blue-700 font-semibold underline cursor-pointer">DOWNLOAD NOW</span>
                        </p>
                    </div>}

                    {/* Quantity */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={decrementQuantity}
                                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                            <button
                                onClick={incrementQuantity}
                                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Delivery Check */}
                  { !isFromHome && <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Check Delivery Details</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                            />
                            <button className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition">
                                Check
                            </button>
                        </div>
                        <div className="mt-3 space-y-1">
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                                <Truck size={16} className="text-gray-600" />
                                Delivery between <span className="font-semibold">7th and 9th Dec</span>
                            </p>
                            <p className="text-sm text-green-600 flex items-center gap-2">
                                <Banknote size={16} />
                                Cash On Delivery <span className="font-semibold">available</span>
                            </p>
                        </div>
                    </div>}

                    {/* Add to Cart Buttons */}
                    <div className="space-y-3"
                    

                    >
                        <button className={`w-full py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-red-50 bg-red-200 transition cursor-pointer flex justify-center items-center gap-2 ${isPending?"opacity-50 pointer-events-none":""}`}
                        onClick={handleAddToCart}
                        disabled={isPending}
                        >
                            ADD TO CART

                            {isPending && <FormSubmissionLoader/>}
                        </button>
                        <button className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition">
                            BUY IT NOW
                        </button>
                    </div>

                    {/* Features */}
                   { !isFromHome && <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
                        <div className="text-center">
                            <Truck className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                            <p className="text-sm font-semibold text-gray-900">Free</p>
                            <p className="text-xs text-gray-600">Shipping</p>
                        </div>
                        <div className="text-center">
                            <RotateCcw className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                            <p className="text-sm font-semibold text-gray-900">3 Days</p>
                            <p className="text-xs text-gray-600">Return Policy</p>
                        </div>
                        <div className="text-center">
                            <Banknote className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                            <p className="text-sm font-semibold text-gray-900">Cash on</p>
                            <p className="text-xs text-gray-600">Delivery</p>
                        </div>
                    </div>}

                    {/* Colors Section - Only show if variants exist */}
                    {variants && variants.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Colors:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {variants.map((variant) => (
                                    <div
                                        key={variant._id}
                                        onClick={() => { router.push(`/item/${variant._id}`) }}
                                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition border-gray-200`}
                                    >
                                        <img
                                            src={variant.thumbnail.url}
                                            alt={variant.color}
                                            className="w-full h-60 object-cover"
                                        />
                                        <p className="text-center py-2 font-semibold text-sm capitalize">{variant.color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Accordion Sections */}
                  { !isFromHome && <div className="space-y-2">
                        {/* Product Details */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('details')}
                                className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-900">PRODUCT DETAILS</span>
                                <ChevronDown
                                    className={`transform transition-transform ${expandedSections.details ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            {expandedSections.details && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                                    <p className="whitespace-pre-wrap">{product.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Return and Exchange */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('return')}
                                className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-900">RETURN AND EXCHANGE</span>
                                <ChevronDown
                                    className={`transform transition-transform ${expandedSections.return ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            {expandedSections.return && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                                    <p>Easy 3 days return and exchange policy. Items must be unused and in original packaging.</p>
                                </div>
                            )}
                        </div>

                        {/* Shipping Information */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('shipping')}
                                className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-900">SHIPPING INFORMATION</span>
                                <ChevronDown
                                    className={`transform transition-transform ${expandedSections.shipping ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            {expandedSections.shipping && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                                    <p>Free shipping on all orders. Delivery within 5-7 business days.</p>
                                </div>
                            )}
                        </div>

                        {/* Seller Information */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('seller')}
                                className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-900">SELLER INFORMATION</span>
                                <ChevronDown
                                    className={`transform transition-transform ${expandedSections.seller ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            {expandedSections.seller && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                                    <p><span className="font-semibold">Seller:</span> Premium Collections</p>
                                    <p><span className="font-semibold">Rating:</span> 4.7/5</p>
                                </div>
                            )}
                        </div>

                        {/* Need Help */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('help')}
                                className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-900">NEED HELP?</span>
                                <ChevronDown
                                    className={`transform transition-transform ${expandedSections.help ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            {expandedSections.help && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                                    <p>Contact our customer support at support@example.com or call 1800-XXX-XXXX</p>
                                </div>
                            )}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailed
