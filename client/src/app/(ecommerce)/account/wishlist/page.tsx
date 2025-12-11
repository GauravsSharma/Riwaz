"use client";
import WishlistCart from '@/components/cards/WishlistCart'
import React from 'react'

const page = () => {
  return (
    <div>
       <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Whishlist</h2>
      <div>
        <WishlistCart/>
      </div>
    </div>
  )
}

export default page