"use client";

import { useEditAddress } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  pincode: z.string().min(1, "Pincode is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City/Town is required"),
  address1: z.string().min(1, "Address is required"),
  landmark: z.string().min(1, "Landmark is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface Props {
  id: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  existingAddress: AddressFormData;
}

export default function EditAddressForm({
  id,
  isOpen,
  setIsOpen,
  existingAddress,
}: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: existingAddress,
  });

  useEffect(() => {
    if (existingAddress) reset(existingAddress);
  }, [existingAddress, reset]);

  const address = useEditAddress();

  const onSubmit = (data: AddressFormData) => {
    address.mutate(
      {
        id,
        landmark: data.landmark,
        state: data.state,
        city: data.city,
        address1: data.address1,
        pincode: data.pincode,
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Address</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <input
              {...register("pincode")}
              placeholder="Pincode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode.message}</p>
            )}

            <input
              {...register("state")}
              placeholder="State"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}

            <input
              {...register("city")}
              placeholder="City/Town"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}

            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                onClick={async () => {
                  const valid = await trigger(["pincode", "state", "city"]);
                  if (valid) setCurrentStep(2);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <input
              {...register("address1")}
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm">{errors.address1.message}</p>
            )}

            <input
              {...register("landmark")}
              placeholder="Landmark"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.landmark && (
              <p className="text-red-500 text-sm">{errors.landmark.message}</p>
            )}

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                onClick={handleSubmit(onSubmit)}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
