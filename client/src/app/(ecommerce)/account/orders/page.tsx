
"use client";
import OrderCard from '@/components/cards/OrderCard'
import { useGetUSerOrders } from '@/hooks/buyer/useUserCart';
import React from 'react'

const Page = () => {
  const {data,isLoading} = useGetUSerOrders()
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="w-full sm:p-6">
      {/* Header */}
      <div className="w-full mb-8">
        <h1 className="text-2xl mb-5 font-semibold text-gray-900">
          My Orders
        </h1>
        <div className='flex justify-center flex-col w-full items-center gap-5'>
          {
            data && data.length > 0 ? data.map((order) => (
              <OrderCard key={order._id} order={order} />
            )) : <p className="text-gray-600">You have no orders yet.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Page