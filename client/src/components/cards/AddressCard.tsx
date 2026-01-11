"use client";
import { Edit2, Home, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import EditAddressForm from "./EditAddressForm";

interface AddressCardProps {
  id: string;
  landmark?: string;
  state?: string;
  city?: string;
  address1?: string;
  pincode?: string;
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

  const fullAddress = [
    address1,
    landmark,
    city,
    state,
    pincode && `- ${pincode}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-red-500 font-semibold">
          <Home size={18} />
          <span>{isHome ? "HOME ADDRESS" : "ADDRESS"}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
          >
            <Edit2 size={16} /> Edit
          </button>
          <button
            onClick={() => onRemove(id)}
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition"
          >
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>

      {/* Address Body */}
      <div className="flex gap-2 items-start text-gray-700">
        <MapPin className="text-red-400 mt-1" size={18} />
        <p className="text-sm sm:text-base leading-relaxed break-words">
          {fullAddress || "Address not available"}
        </p>
      </div>

      {/* Edit Modal */}
      <EditAddressForm
        id={id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        existingAddress={{
          pincode: pincode || "",
          state: state || "",
          city: city || "",
          address1: address1 || "",
          landmark: landmark || "",
        }}
      />
    </div>
  );
}
