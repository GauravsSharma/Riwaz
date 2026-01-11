"use client";

import AddressCard from "@/components/cards/AddressCard";
import AddNewAddressForm from "@/components/models/AddAddresseModel";
import { useDeleteAddress, useGetAddresses } from "@/hooks/buyer/useAddress";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data: addresses, isLoading } = useGetAddresses();
  const deleteAddress = useDeleteAddress();
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = (id: string) => {
    if (window.confirm("Delete this address?")) {
      deleteAddress.mutate(id);
    }
  };

  if (isLoading)
    return <p className="text-center mt-6 text-gray-600">Loading addresses...</p>;

  return (
    <div className="w-full sm:w-[75%] p-4 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {addresses && addresses.length > 0 ? (
        <div className="flex flex-col gap-4">
          {addresses.map((add) => (
            <AddressCard
              key={add._id}
              id={add._id}
              address1={add.address1}
              landmark={add.landmark}
              city={add.city}
              state={add.state}
              pincode={add.pincode}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No address found.</p>
      )}

      <AddNewAddressForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
