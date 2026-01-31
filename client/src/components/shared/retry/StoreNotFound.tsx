import Link from 'next/link'
import React from 'react'
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react'

const StoreNotFound = () => {
  return (
    <div className='min-h-screen  w-full flex justify-center items-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4'>
      <div className=' w-full mx-auto px-4 sm:px-6 text-center'>
        {/* Icon/Illustration */}
        <div className='mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'>
          <ShoppingBag className='w-12 h-12 text-white' strokeWidth={2} />
        </div>

        {/* Heading */}
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight'>
          Ready to Start Selling?
        </h1>
        
        {/* Description */}
        <p className='text-base sm:text-lg text-gray-600 mb-8 leading-relaxed'>
          Create your store and start showcasing your products to thousands of customers today.
        </p>

        {/* CTA Button */}
        <Link 
          href='/admin/stores'
          className='inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 text-base w-full sm:w-auto group'
        >
          Create Your Store
          <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
        </Link>

        {/* Additional Info - Always in a row */}
        <div className='mt-10 flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-700 flex-wrap'>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0' />
            <span className='whitespace-nowrap'>Easy Setup</span>
          </div>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0' />
            <span className='whitespace-nowrap'>No Hidden Fees</span>
          </div>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0' />
            <span className='whitespace-nowrap'>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreNotFound