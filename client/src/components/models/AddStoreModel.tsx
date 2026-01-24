import { useCreateStore, useUpdateStore } from '@/hooks/seller/useStore';
import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
interface FormData {
  name: string;
  description: string;
  address: string;
}
const AddStoreModel = ({
  storeData,
  isDialogOpen,
  setIsDialogOpen,

}: {
  storeData?: Store,
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const [formData, setFormData] = React.useState<FormData>({
    name: storeData ? storeData.name : "",
    description: storeData ? storeData.description : "",
    address: storeData ? storeData.address : ""
  });
  const {mutate:createStoreMutation,isPending:isAddPending} = useCreateStore()
  const {mutate:updateStore,isPending:isUpdatPending} = useUpdateStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const isPending = storeData?isUpdatPending:isAddPending;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.address) {
      toast.error("Please fill all the fields");
      return;
    }
    if (storeData) {
      updateStore({ data: formData, id: storeData._id }, {
        onSuccess: () => {
          toast.success("Store updated successfully");
          setIsDialogOpen(false);
        },
        onError: (error: ApiError) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      })
    } else {
      createStoreMutation(formData, {
        onSuccess: () => {
          toast.success("Store created successfully");
          setIsDialogOpen(false);
        },
        onError: (error: ApiError) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      });
    }
  };
  useEffect(()=>{
    if(storeData){
      const data = {
        name:storeData.name,
        address:storeData.address,
        description:storeData.description
      }
      setFormData(data)
    }
  },[storeData])
  
  return (
    <div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{storeData?"Update Store":"Add new store"}</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"

                  placeholder="Enter store name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Describe your store"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="City, State"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  disabled={isPending}
                  onClick={handleSubmit}
                  className={`px-4 py-2 cursor-pointer w-1/2 flex justify-center items-center gap-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {storeData?"Update":"Add Store"}
                  {isPending && <FormSubmissionLoader />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddStoreModel