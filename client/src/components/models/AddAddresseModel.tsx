
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateAddress } from '@/hooks/buyer/useAddress';

const addressSchema = z.object({


  postCode: z.string().min(1, 'Post code is required'),
  state: z.string().min(1, 'State is required'),
  cityTown: z.string().min(1, 'City/Town is required'),
  address: z.string().min(1, 'Address is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  makeDefault: z.boolean().optional()
});

type AddressFormData = z.infer<typeof addressSchema>;


export default function AddNewAddressForm({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateAddress();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      makeDefault: false
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof AddressFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['postCode', 'state', 'cityTown'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };


  const onSubmit = (data: AddressFormData) => {
    mutate(
      {
        type: "home",
        landmark: data.landmark,
        state: data.state,
        city: data.cityTown,
        address: data.address,
        pincode: data.postCode,
        country: "India",
        isDefault: data.makeDefault || false,
      },
      {
        onSuccess: (data) => {
         toast.success("Address added successfully");
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["Address"] });
        },
        onError: (error) =>
          toast.error("Failed to add address. Please try again."),
      }
    );
    
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      POST CODE <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('postCode')}
                      type="text"
                      placeholder="Enter postcode here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.postCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postCode.message}</p>
                    )}
                  </div>
                </div>

                {/* State and City/Town */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      STATE <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('state')}
                      type="text"
                      placeholder="Delivery State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CITY/TOWN <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('cityTown')}
                      type="text"
                      placeholder="Delivery city/town"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {errors.cityTown && (
                      <p className="text-red-500 text-xs mt-1">{errors.cityTown.message}</p>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                {/* Address 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ADDRESS 1 (FLAT, HOUSE NO., BUILDING, COMPANY, APARTMENT) <span className="text-red-500">*</span>
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
                    className="text-red-600 cursor-pointer px-6 py-2 border border-red-600 rounded hover:bg-red-50 transition-colors"
                  >
                    Back
                  </button>
                  <div className="space-x-3 flex">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-red-600 px-6 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      CANCEL
                    </button>
                    <button
                      disabled={isPending}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className={` ${isPending ? "cursor-not-allowed bg-red-400":"cursor-pointer bg-red-600"} text-white px-6 py-2 rounded hover:bg-red-500 flex justify-center items-center gap-2 transition-colors`}
                    >
                      SUBMIT
                      {
                        isPending && <FormSubmissionLoader />
                      }
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>}
    </>
  );
}