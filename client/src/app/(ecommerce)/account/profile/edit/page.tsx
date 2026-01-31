"use client";

import FormSubmissionLoader from "@/components/loaders/FormSubmissionLoader";
import { useUpdateOrEditProfile } from "@/hooks/useUser";
import { useUserStore } from "@/stores/user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfileEditForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    //alternatePhone: "",
    //dateOfBirth: "",
    //gender: ""
  });


  const {mutate,isPending} = useUpdateOrEditProfile();
  const setUser = useUserStore((s) => s.setUser); // moved to top-level
 const router = useRouter()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

   mutate(
      {
        name: formData.firstName + " " + formData.lastName, // added space between names
        email: formData.email,
      },
      {
        onSuccess: (data) => {
          toast.success("Profile updated.")
          setUser(data.user); 
          router.push("/account ")// update Zustand store
        },
        onError: () =>{
          toast.error("Something went wrong")
        } 
        
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto sm:p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          General Information
        </h2>

        <div className="space-y-6">

          {/* FULL NAME */}
          <div className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-600">
              FULL NAME
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* LAST NAME */}
          <div className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-600">
              LAST NAME
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-600">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          href={"/account"}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          CANCEL
        </Link>

        <button
                  disabled={isPending}
                  type="button"
                  onClick={handleSubmit}
                  className={`px-4 flex justify-center items-center gap-2 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${(isPending) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  Save
                  {(isPending) && <FormSubmissionLoader />}
                </button>
      </div>
    </div>

  );
}
