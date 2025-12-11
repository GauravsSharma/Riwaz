"use client";

import { useUpdateOrEditProfile } from "@/hooks/useUser";
import { useUserStore } from "@/stores/user.store";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  //alternatePhone: string;
  //dateOfBirth: string;
  //gender: string;
};

export default function ProfileEditForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "Barbara",
    lastName: "Millicent",
    email: "BarbaraMillicent23@gmail.com",
    //alternatePhone: "",
    //dateOfBirth: "",
    //gender: ""
  });

  
  const updateProfile = useUpdateOrEditProfile();
  const setUser = useUserStore((s) => s.setUser); // moved to top-level

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* const handleGenderChange = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  }; */

  // use of arrow function-call when save button is clicked
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Submitting form");
    console.log(formData.firstName);
    console.log(formData.lastName);
    console.log(formData.email);

    updateProfile.mutate(
      {
        name: formData.firstName + " " + formData.lastName, // added space between names
        email: formData.email,
      },
      {
        onSuccess: (data) => {
          console.log("Profile updated:", data);
          setUser(data.user); // update Zustand store
        },
        onError: (error) =>
          console.error(`Failed to update profile: ${error}`),
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
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
      className="px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
      onClick={handleSubmit}
    >
      SAVE
    </button>
  </div>
</div>

  );
}
