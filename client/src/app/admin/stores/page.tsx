"use client"
import React, { useState } from 'react';
import { Plus, X, MapPin, Store } from 'lucide-react';
import AddStoreModel from '@/components/models/AddStoreModel';
import { useGetAllStores } from '@/hooks/seller/useStore';
import { useSellerStore } from '@/stores/seller/store.store';


const StoresPage = () => {
  // const [stores, setStores] = useState<Store[]>([
  //   {
  //     _id: '1',
  //     name: 'Downtown Boutique',
  //     description: 'Premium fashion and accessories in the heart of the city',
  //     location: 'New York, NY'
  //   },
  //   {
  //     _id: '2',
  //     name: 'Riverside Market',
  //     description: 'Fresh organic produce and artisanal goods',
  //     location: 'Portland, OR'
  //   },
  //   {
  //     _id: '3',
  //     name: 'Tech Hub Store',
  //     description: 'Latest electronics and smart home devices',
  //     location: 'San Francisco, CA'
  //   }
  // ]);
  
  const stores = useSellerStore((s) => s.stores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(stores);
  // if(isLoading){
  //   return <div>Loading...</div>
  // }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Stores</h1>
            <p className="text-gray-600">Manage and view all your store locations</p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            <Plus size={20} />
            Add New Store
          </button>
        </div>

        {/* Stores Gr_id*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores && stores.map((store:Store) => (
            <div
              key={store._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Store className="text-indigo-600" size={24} />
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
        {!stores && (
          <div className="text-center py-20">
            <Store className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No stores yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first store</p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Plus size={20} />
              Add New Store
            </button>
          </div>
        )}
      </div>

      {/* Dialog */}
     <AddStoreModel setIsDialogOpen={setIsDialogOpen} isDialogOpen={isDialogOpen}/>
    </div>
  );
};

export default StoresPage;
