"use client";

import { useEditAddress } from '@/hooks/buyer/useAddress';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';

const addressSchema = z.object({
  postCode: z.string().min(1, 'Post code is required'),
  state: z.string().min(1, 'State is required'),
  cityTown: z.string().min(1, 'City/Town is required'),
  address: z.string().min(1, 'Address is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  makeDefault: z.boolean().optional()
});

type AddressFormData = z.infer<typeof addressSchema>;

interface EditAddressFormProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  existingAddress?: {
    postCode: string|undefined;
    state: string|undefined;
    cityTown: string|undefined;
    address: string|undefined;
    landmark: string|undefined;
  };
}

export default function EditAddressForm({
  id,
  isOpen,
  setIsOpen,
  existingAddress
}: EditAddressFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      postCode: '',
      state: '',
      cityTown: '',
      address: '',
      landmark: '',
      makeDefault: false
    }
  });

  useEffect(() => {
    if (existingAddress) reset(existingAddress);
  }, [existingAddress, reset]);

  const { mutate, isPending } = useEditAddress();

  const nextStep = async () => {
    const valid = await trigger(["postCode", "state", "cityTown"]);
    if (valid) setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = (data: AddressFormData) => {
    console.log('Form submitted:', data);
    mutate(
      {
        id: id,
        data: {
          id,
          landmark: data.landmark,
          state: data.state,
          city: data.cityTown,
          address: data.address,
          pincode: data.postCode,
        }
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setCurrentStep(1);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Address</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setCurrentStep(1);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Post Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  POST CODE <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("postCode")}
                  type="text"
                  placeholder="Enter post code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.postCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postCode.message}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STATE <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("state")}
                  type="text"
                  placeholder="Enter state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                )}
              </div>

              {/* City/Town */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CITY/TOWN <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("cityTown")}
                  type="text"
                  placeholder="Enter city/town"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.cityTown && (
                  <p className="text-red-500 text-xs mt-1">{errors.cityTown.message}</p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ADDRESS 1 (FLAT, HOUSE NO., BUILDING, COMPANY, APARTMENT){' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Enter delivery address here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LANDMARK <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('landmark')}
                  type="text"
                  placeholder="Eg. Behind the park"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.landmark && (
                  <p className="text-red-500 text-xs mt-1">{errors.landmark.message}</p>
                )}
              </div>

              {/* Make Default */}
              <div className="flex items-center">
                <input
                  {...register('makeDefault')}
                  type="checkbox"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Make this my default address
                </label>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-red-600 px-6 py-2 border border-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  Back
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentStep(1);
                    }}
                    className="text-red-600 px-6 py-2 hover:bg-gray-50 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    disabled={isPending}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className={`${isPending ? "cursor-not-allowed bg-red-400" : "cursor-pointer bg-red-600"} text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2 transition-colors`}
                  >
                    UPDATE
                    {isPending && <FormSubmissionLoader />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}