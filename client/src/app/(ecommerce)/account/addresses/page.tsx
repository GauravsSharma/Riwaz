"use client";
import AddressCard from "@/components/cards/AddressCard";
import AddNewAddressForm from "@/components/models/AddAddresseModel";
import DeleteAddressDialog from "@/components/models/DeleteAddress";
import { useGetAddresses } from "@/hooks/buyer/useAddress";
import { useAddressStore } from "@/stores/buyer/address.user";
import { useUserStore } from "@/stores/user.store";
import { Plus } from "lucide-react";
import { useState } from "react";


export default function Page() {
  const { isLoading } = useGetAddresses();
  const addresses = useAddressStore(s=>s.addresses)
  const [isOpen, setIsOpen] = useState(false);
  const[isDeleteDialogOpen,setIsDeleteDialogOpen]=useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const handleAddNewAddress = () => setIsOpen(true);
 const user = useUserStore((s) => s.user);
  const handleRemove = (id:string) => {
    setSelectedAddressId(id)
     setIsDeleteDialogOpen(true)
  };
  if (isLoading) return <div className="flex justify-center items-center w-full">
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>

  return (
    <div className="w-[75%] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          My Addresses
        </h1>
      {user &&  <button
          onClick={handleAddNewAddress}
          className="flex items-center cursor-pointer space-x-2 text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm font-bold">ADD NEW ADDRESS</span>
        </button>}
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses &&
        addresses.length > 0 ? (
          addresses.map((add: Address) => (
            <AddressCard
              key={add._id}
              id={add._id}
              address1={add.address}
              landmark={add.landmark}
              city={add.city}
              state={add.state}
              pincode={add.pincode}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="p-6 rounded-md text-center">
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
     {isOpen && (
        <AddNewAddressForm isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
     {isDeleteDialogOpen && selectedAddressId&&(
        <DeleteAddressDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} addressId={selectedAddressId} />
      )}
    </div>
  );
}
