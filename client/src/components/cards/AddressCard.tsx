import { useState } from "react";
import { Home, MapPin, Edit2, Trash2, MapPinned } from "lucide-react";
import EditAddressForm from "./EditAddressForm";

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
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <MapPinned className="text-gray-300 mb-2" size={32} />
        <p className="text-gray-500 font-medium">Address details are incomplete.</p>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 mb-4 transition-all duration-300 hover:shadow-md hover:border-indigo-200">
      {/* Top Section: Icon & Category */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            {isHome ? <Home size={18} /> : <MapPin size={18} />}
          </div>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {isHome ? "Home Address" : "Office Address"}
          </span>
        </div>

        {/* Action Buttons: Stylized like Myntra */}
        <div className="flex items-center gap-4">
          <button

            onClick={EditAddress}
            className="flex items-center cursor-pointer gap-1.5 text-xs font-bold text-purle-600 hover:text-purple-800 transition-colors uppercase tracking-wider"
          >
            <Edit2 size={13} />
            Edit
          </button>
          <div className="w-px h-3 bg-gray-200" />
          <button
            onClick={() => onRemove(id)}
            className="flex items-center cursor-pointer gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-wider"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      </div>

      {/* Address Content */}
      <div className="space-y-1.5">
        <p className="text-gray-800 font-medium text-[15px] leading-snug">
          {address1}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {landmark && `${landmark}, `}
          {city}, {state}
        </p>
        <p className="text-gray-900 font-semibold text-sm mt-2">
          PIN: {pincode}
        </p>
      </div>

      {/* Modern Interactive Hover Border (Optional) */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />

      {/* Your Form Component */}
      <EditAddressForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={id}
        existingAddress={{
          postCode: pincode,
          state: state,
          cityTown: city,
          address: address1,
          landmark: landmark,
        }}
      />
    </div>
  );
}