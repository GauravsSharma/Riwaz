"use client"
import React, { useState } from 'react';
import { Plus, MapPin, Store, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import AddStoreModel from '@/components/models/AddStoreModel';
import { useSellerStore } from '@/stores/seller/store.store';
import DeleteStoreModel from '@/components/models/DeleteStore';
import AdminPageHeading from '@/components/headings/AdminPageHeading';
import { useGetAllStores } from '@/hooks/seller/useStore';
import StoreCardSkeleton from '@/components/loaders/StoreCardSkeleton';


const StoresPage = () => {
  const { isLoading, isError } = useGetAllStores()
  const stores = useSellerStore((s) => s.stores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | undefined>()
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)

  const handleEditStore = (store: Store) => {
    setSelectedStore(store)
    setIsDialogOpen(true)
    setOpenDropdownId(null);
  };

  const handleDeleteStore = (store: Store) => {
    setSelectedStore(store)
    setIsDeleteModelOpen(true)
    setOpenDropdownId(null);
  };

  const toggleDropdown = (storeId: string) => {
    setOpenDropdownId(openDropdownId === storeId ? null : storeId);
  };
  if (isLoading) {
    return <div className='px-8 py-12'>
      <div></div>
      <div className='flex justify-center items-center flex-wrap gap-3'>
        {
          [12, 2, 3, 4].map((i) => <StoreCardSkeleton key={i} />)
        }
      </div>
    </div>
  }
  if (isError) {
    return <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600 font-medium">Failed to load orders</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <AdminPageHeading
            title='Stores'
            desciption='Manage your stores effectively from this panel.'
          />
          <button
            onClick={() => { setSelectedStore(undefined); setIsDialogOpen(true) }}
            className="flex md:w-auto w-full justify-center cursor-pointer items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            <Plus size={20} />
            Add New Store
          </button>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores && stores.map((store: Store) => (
            <div
              key={store._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Store className="text-indigo-600" size={24} />
                  </div>

                  {/* Three Dot Menu */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(store._id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdownId === store._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => handleEditStore(store)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit Store
                        </button>
                        <button
                          onClick={() => handleDeleteStore(store)}
                          className="w-full flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete Store
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{store.description}</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span className="text-sm">{store.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!stores || stores.length ===0) && (
          <div className="text-center py-20">
            <Store className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No stores yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first store</p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Plus size={20} />
              Add New Store
            </button>
          </div>
        )}
      </div>

      {/* Dialog */}
      <AddStoreModel setIsDialogOpen={setIsDialogOpen} setSelectedStore = {setSelectedStore} isDialogOpen={isDialogOpen} storeData={selectedStore} />

      {/* Click outside to close dropdown */}
      {openDropdownId && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenDropdownId(null)}
        />
      )}
      {
        isDeleteModelOpen && selectedStore && <DeleteStoreModel setIsOpen={setIsDeleteModelOpen} isOpen={isDeleteModelOpen} storeId={selectedStore._id} />
      }
    </div>
  );
};

export default StoresPage;