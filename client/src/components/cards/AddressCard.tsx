import { useState } from "react";
import EditAddressForm from "./EditAddressForm";

// Address Card Component
interface AddressCardProps {
  id: string;
  landmark: string;
  state: string;
  city: string;
  address1: string;
  pincode: string;
  isHome?: boolean;
  onRemove: (id: string) => void;
}

export default function AddressCard({
  id,
  landmark,
  state,
  city,
  address1,
  pincode,
  isHome = true,
  onRemove,
}: AddressCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const EditAddress = () => setIsOpen(true);

  const hasAddress = Boolean(address1 || landmark || city || state || pincode);

  if (!hasAddress) {
    return (
      <div className="bg-white border shadow-lg border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-500">Address not available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border shadow-lg border-gray-200 rounded-lg p-6 mb-4">
      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-medium text-gray-900">
            {isHome ? "HOME" : "ADDRESS"}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={EditAddress}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            EDIT
          </button>
          <button
            onClick={() => onRemove(id)}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Address Body */}
      <div className="space-y-1">
        <p className="text-gray-700 text-md leading-relaxed">
          {address1}, {landmark}, {city}, {state} - {pincode}
        </p>
      </div>

      <EditAddressForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={id}
        existingAddress={{
          postCode: pincode,
          state: state,
          cityTown: city,
          address1: address1,
          landmark: landmark,
        }}
      />
    </div>
  );
}
