import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { useSellerStore } from '@/stores/seller/store.store';
import { useAddProduct, useUpdateProduct } from '@/hooks/seller/useSellerProduct';
import { toast } from 'react-toastify';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import { useQueryClient } from '@tanstack/react-query';

export const productSchema = z.object({
  title: z.string().min(1).max(100),
  price: z.number().min(0.01),
  originalPrice: z.number().min(0.01),
  stock: z.number().int().min(0),
  description: z.string(),
  fabric: z.string().min(1),
  work: z.string().min(1),
  type: z.string().min(1),
  color: z.string().min(1),
  parentId: z.string()
});

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

type ProductFormData = z.infer<typeof productSchema>;

const fabrics = [
  'Chanderi', 'Chanderi Cotton', 'Chiffon', 'Chinnon', 'Cotton',
  'Cotton Blend', 'Cotton Silk', 'Georgette', 'Khadi', 'Linen',
  'Net', 'Organza', 'Satin', 'Shimmer', 'Shimmer Net', 'Silk',
  'Silk Blend', 'Tissue Cotton', 'Tissue Silk', 'Tussar Silk'
];

const works = [
  'Bandhani', 'Dyed', 'Embellished', 'Embroidery', 'Floral Printed',
  'Foil Printed', 'Ikkat', 'Lace', 'Laheriya', 'Minakari', 'Patch Work',
  'Pearl Work', 'Printed', 'Sequence', 'Stone Work', 'Warli Printed',
  'Woven', 'Woven (Dual Tone)', 'Zari', 'Zari Stripe'
];

const types = [
  'Baluchari', 'Banarasi', 'Bandhani', 'Embellished', 'Embroidery',
  'Floral Printed', 'Foil Printed', 'Jamdani', 'Kanjivaram', 'Lace',
  'Laheriya', 'Paithani', 'Patola', 'Plain', 'Printed', 'Sequence',
  'Swarovski', 'Warli Printed', 'Woven', 'Zari Stripe'
];

interface AddProductModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setCreatedProductId?: (id: string) => void;
  setImageOpenModel?: (open: boolean) => void;
  parentId: string;
  editProduct?: SellerProduct; // Optional product to edit
  mode?: 'add' | 'edit'; // Mode: add or edit
}

export default function AddProductModal({
  isOpen,
  setIsOpen,
  parentId,
  setCreatedProductId,
  setImageOpenModel,
  editProduct,
  mode = 'add'
}: AddProductModalProps) {
  useSellerStore((s) => s.stores);
  const { mutate: addProductMutation, isPending } = useAddProduct();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateProduct()
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    fabric: "",
    work: "",
    type: "",
    stock: 0,
    color: "",
    price: 0,
    originalPrice: 0,
    parentId
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient()
  // Populate form data when editing
  useEffect(() => {
    if (mode === 'edit' && editProduct) {
      console.log(editProduct)
      setFormData({
        title: editProduct.title,
        description: editProduct.description || '',
        fabric: editProduct.fabric,
        work: editProduct.work,
        type: editProduct.type,
        stock: editProduct.stock,
        color: editProduct.color,
        price: editProduct.price,
        originalPrice: editProduct.originalPrice,
        parentId: editProduct.parentId || parentId
      });
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        description: '',
        fabric: "",
        work: "",
        type: "",
        stock: 0,
        color: "",
        price: 0,
        originalPrice: 0,
        parentId
      });
    }
  }, [mode, editProduct, parentId]);

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    try {
      productSchema.parse({
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stock: Number(formData.stock)
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (mode === 'edit' && editProduct) {
        // TODO: Call update API
        updateMutate({ id: editProduct._id, data: formData }, {
          onSuccess: () => {
            setIsOpen(false);
            toast.success("Product Updated.")
            queryClient.invalidateQueries({ queryKey: ['seller-product'] });
          },
          onError: () => {
            toast.error("Failed to update product.")
          }
        })
      } else {
        // Add new product
        addProductMutation(formData, {
          onSuccess: (data) => {
            toast.success("Product added successfully");
            if (setCreatedProductId) {
              setCreatedProductId(data.product._id);
            }
            setIsOpen(false);
            if (setImageOpenModel) {
              setImageOpenModel(true);
            }
            setFormData({
              title: '',
              description: '',
              fabric: "",
              work: "",
              type: "",
              stock: 0,
              color: "",
              price: 0,
              originalPrice: 0,
              parentId: "",
            });
            queryClient.invalidateQueries({ queryKey: ['seller-product'] });
          },
          onError: (error: ApiError) => {
            toast.error(error?.response?.data?.message || "Failed to add product");
          }
        });
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl md:w-1/2 w-full max-h-[90vh] overflow-hidden overflow-y-scroll">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Enter product name"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.type ? 'border-red-300' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Type</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                {/* Work */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.work}
                    onChange={(e) => handleInputChange('work', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.work ? 'border-red-300' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Work</option>
                    {works.map((work) => (
                      <option key={work} value={work}>
                        {work}
                      </option>
                    ))}
                  </select>
                  {errors.work && (
                    <p className="mt-1 text-sm text-red-600">{errors.work}</p>
                  )}
                </div>

                {/* Fabric */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fabric <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.fabric}
                    onChange={(e) => handleInputChange('fabric', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.fabric ? 'border-red-300' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Fabric</option>
                    {fabrics.map((fabric) => (
                      <option key={fabric} value={fabric}>
                        {fabric}
                      </option>
                    ))}
                  </select>
                  {errors.fabric && (
                    <p className="mt-1 text-sm text-red-600">{errors.fabric}</p>
                  )}
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="10"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.originalPrice ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="0.00"
                  />
                  {errors.originalPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="10"
                    min={0}
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.price ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.color ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Enter color"
                  />
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.stock ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter product description (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isPending||isUpdatePending}
                  type="button"
                  onClick={handleSubmit}
                  className={`px-4 flex justify-center items-center gap-2 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${(isPending||isUpdatePending) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {mode === 'edit' ? 'Update Product' : 'Add Product'}
                  {(isPending || isUpdatePending) && <FormSubmissionLoader />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}