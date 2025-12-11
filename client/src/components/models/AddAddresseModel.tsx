import { addAddress } from '@/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addressSchema = z.object({
 

  postCode: z.string().min(1, 'Post code is required'),
  state: z.string().min(1, 'State is required'),
  cityTown: z.string().min(1, 'City/Town is required'),
  address1: z.string().min(1, 'Address is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  makeDefault: z.boolean().optional()
});

type AddressFormData = z.infer<typeof addressSchema>;


export default function AddNewAddressForm({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (open: boolean) => void   }) {
  const [currentStep, setCurrentStep] = useState(1);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {

      makeDefault: false
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof AddressFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = [ 'postCode', 'state', 'cityTown'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };



  const address= addAddress();



  const onSubmit = (data: AddressFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
      

 
      address.mutate(
      {

             landmark:data.landmark,
             state:data.state,
             city:data.cityTown,
             address1:data.address1,
             pincode:data.postCode,
             
          


      },
      {
        onSuccess: (data) => {
          console.log("Address added", data);
         // setUser(data.user); // update Zustand store
        },
        onError: (error) =>
          console.error(`Failed to address: ${error}`),
      }
    );





    setIsOpen(false);
  };

  return (
    <>
   {isOpen&&<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
              {/* First Name 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FIRST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="Enter name here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>*/}

              {/* Last Name 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LAST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Enter name here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>*/}

              {/* Mobile Number and Post Code 
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MOBILE NUMBER <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-600">+91</span>
                    <input
                      {...register('mobileNumber')}
                      type="tel"
                      placeholder="Enter mobile number here"
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
                </div>
                <div>*/}
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
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
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
                  {...register('address1')}
                  type="text"
                  placeholder="Enter delivery address here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.address1 && (
                  <p className="text-red-500 text-xs mt-1">{errors.address1.message}</p>
                )}
              </div>

              {/* Address 2 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ADDRESS 2 (AREA, COLONY, STREET, SECTOR, VILLAGE) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('address2')}
                  type="text"
                  placeholder="Enter delivery area, colony, street, sector, village"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.address2 && (
                  <p className="text-red-500 text-xs mt-1">{errors.address2.message}</p>
                )}
              </div>*}

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

              {/* Instructions 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions (Optional)
                </label>
                <textarea
                  {...register('instructions')}
                  placeholder="Any instruction please add here"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>*}

              {/* Address Type 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ADDRESS TYPE
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      {...register('addressType')}
                      type="radio"
                      value="home"
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Home</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('addressType')}
                      type="radio"
                      value="office"
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Office/Commercial</span>
                  </label>
                </div>
              </div>*}

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
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-red-600 px-6 py-2 hover:bg-gray-50 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    SUBMIT
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