"use client";
import { useState } from "react";
import EditAddressForm from "./EditAddressForm";

interface AddressCardProps {
  id: string;
  landmark?: string;
  state?: string;
  cityTown?: string;
  address1?: string;
  postCode?: string;
  isHome?: boolean;
  onRemove: (id: string) => void;
}

export default function AddressCard({
  id,
  landmark = "-",
  state = "-",
  cityTown = "-",
  address1 = "-",
  postCode = "-",
  isHome = true,
  onRemove,
}: AddressCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 sm:p-6 mb-4">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">{isHome ? "HOME" : "ADDRESS"}</h3>
        <div className="flex gap-3">
          <button onClick={() => setIsOpen(true)} className="text-gray-600">
            EDIT
          </button>
          <button onClick={() => onRemove(id)} className="text-red-500">
            REMOVE
          </button>
        </div>
      </div>

      <p className="text-gray-700">
        {address1}, {landmark}, {cityTown}, {state} - {postCode}
      </p>

      <EditAddressForm
        id={id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        existingAddress={{
          postCode,
          state,
          cityTown,
          address1,
          landmark,
        }}
      />
    </div>
  );
}
