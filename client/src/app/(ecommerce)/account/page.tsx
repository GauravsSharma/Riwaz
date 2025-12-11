
"use client"


import { useCurrentUser } from "@/hooks/useUser";
import Link from "next/link";

export default function page() {
  
  
   // in this basically we have to show logged-user details...
  
  
     
     const{data:user,isLoading,error}=useCurrentUser();
     

      // if user loads
     if(isLoading)
      return <p>Loading.....</p>
  
     // if user is null.......
     if(error)
      return <p>Something went wrong.....</p>
  
   return (
    <div className=" p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500 text-sm">
          You can edit/update your profile information by click on edit profile button.
        </p>
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            FULL NAME
          </label>
          <div className="text-lg font-medium text-gray-900">
             {user?.fullName}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            EMAIL
          </label>
          <div className="text-lg font-medium text-gray-900">
             {user?.email}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            PHONE NUMBER
          </label>
          <div className="text-lg font-medium text-gray-900">
            {user?.phone}
          </div>
        </div>

        {/* Alternate Phone Number */}
      {/* <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            ALTERNATE PHONE NUMBER
          </label>
          <div className="text-lg font-medium text-gray-900">
           
          </div>
        </div>*/}

        {/* Date of Birth 
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            DATE OF BIRTH
          </label>
          <div className="text-lg font-medium text-gray-900">
         
          </div>
        </div>*/}

        {/* Gender */}
        {/*<div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            GENDER
          </label>
          <div className="text-lg font-medium text-gray-900">
          </div>
        </div>*/}
      </div>

      {/* Edit Profile Button */}
      <Link href={"/account/profile/edit"} className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded transition-colors">
        EDIT PROFILE
      </Link>
    </div>
  );
}