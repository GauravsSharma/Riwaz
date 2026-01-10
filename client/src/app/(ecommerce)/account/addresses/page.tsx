"use client";

import AddressCard from "@/components/cards/AddressCard";
import Error from "@/components/error/Error";
import FormSubmissionLoader from "@/components/loaders/FormSubmissionLoader";
import AddNewAddressForm from "@/components/models/AddAddresseModel";
import { useDeleteAddress, useGetAddresses } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { data: address, isLoading, error } = useGetAddresses();
  const deleteAdd = useDeleteAddress();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNewAddress = () => setIsOpen(true);

  const handleRemove = (id: string) => {
    const confirmed = window.confirm("Do you want to delete this address?");
    if (confirmed) {
      deleteAdd.mutate(id);
      // toast handled in mutation onSuccess
    } else {
      toast("Delete canceled");
    }
  };

  if (isLoading) return <FormSubmissionLoader />;
  if (error) return <Error />;

  return (
    <div className="w-[75%] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          My Addresses
        </h1>
        <button
          onClick={handleAddNewAddress}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm font-bold">ADD NEW ADDRESS</span>
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {address &&
        Array.isArray(address.addresses) &&
        address.addresses.length > 0 ? (
          address.addresses.map((add: Address) => (
            <AddressCard
              key={add._id}
              id={add._id}
              address1={add.address}
              landmark={add.landmark}
              city={add.city}
              state={add.state}
              pincode={add.pincode}
              isHome={add.type === "Home"}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="p-6 border rounded-md text-center">
            <h2 className="text-xl font-semibold">
              No addresses yet
            </h2>
            <p className="text-gray-500 mt-2">
              Add a new address to get started.
            </p>
          </div>
        )}
      </div>

      {/* Add New Address Form */}
      <AddNewAddressForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}
