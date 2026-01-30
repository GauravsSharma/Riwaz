import { useAddBaseProduct } from '@/hooks/seller/useSellerProduct';
import React, { useState } from 'react'
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import { toast } from 'react-toastify';
import { useSellerStore } from '@/stores/seller/store.store';
import { useSellerProducts } from '@/stores/seller/seller_product.store';

interface AddBaseProductModelProps {
    setShowAddBaseProductDialog: (value: boolean) => void;
}

const AddBaseProductModel = ({ setShowAddBaseProductDialog }: AddBaseProductModelProps) => {
    const [baseProductName, setBaseProductName] = useState('');
    const [storeId, setStoreId] = useState('');

    const stores = useSellerStore(s => s.stores); // array of { _id, name }
    
    const { mutate, isPending } = useAddBaseProduct()
    const addBaseProduct = useSellerProducts(s=>s.addBaseProduct)
    const handleCreateBaseProduct = () => {
        if (!baseProductName.trim()) {
            toast.warning('Please enter a product name');
            return;
        }

        if (!storeId) {
            toast.warning("Please select a store");
            return;
        }

        mutate(
            { title: baseProductName, storeId },
            {
                onSuccess: (data:BaseProduct) => {
                    addBaseProduct(data)
                    toast.success("Base Product Added Successfully");
                    setBaseProductName('');
                    setStoreId('');
                    setShowAddBaseProductDialog(false);
                },
                onError: () => {
                    toast.error("Error while creating base product");
                }
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">

                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900">Add Base Product</h2>
                    <p className="text-sm text-gray-500 mt-1">Create a new parent product</p>
                </div>

                {/* Form Fields */}
                <div className="p-6">

                    {/* Product Name Input */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={baseProductName}
                        onChange={(e) => setBaseProductName(e.target.value)}
                        placeholder="e.g., Banarasi Silk Saree"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        autoFocus
                    />

                    <p className="text-xs text-gray-500 mt-2 mb-4">
                        This will be the base name for your product. You can add variants later.
                    </p>

                    {/* Store Dropdown */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Store <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                        <option value="">-- Select Store --</option>
                        {stores?.map((store) => (
                            <option key={store._id} value={store._id}>
                                {store.name}
                            </option>
                        ))}
                    </select>

                    <p className="text-xs text-gray-500 mt-2">
                        Choose the store under which this product will be added.
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-200 p-6 flex gap-3">
                    <button
                        onClick={() => {
                            setShowAddBaseProductDialog(false);
                            setBaseProductName('');
                            setStoreId('');
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={isPending}
                        onClick={handleCreateBaseProduct}
                        className={`flex-1 flex justify-center items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium ${
                            isPending ? "bg-purple-500 cursor-not-allowed" : ""
                        }`}
                    >
                        Create Product
                        {isPending && <FormSubmissionLoader />}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddBaseProductModel;
