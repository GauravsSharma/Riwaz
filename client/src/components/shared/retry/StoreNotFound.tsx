import Link from 'next/link'
import React from 'react'

const StoreNotFound = () => {
  return (
    <div className='h-screen flex justify-center w-full items-center bg-gradient-to-br from-purple-50 via-white to-pink-50'>
      <div className=' mx-auto px-6 text-center'>
        {/* Icon/Illustration */}
        <div className='mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100'>
          <svg 
            className='w-10 h-10 text-purple-600' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path 
              strokeLinecap='round' 
              strokeLinejoin='round' 
              strokeWidth={2} 
              d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' 
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Ready to Start Selling?
        </h1>
        
        {/* Description */}
        <p className='text-lg text-gray-600 mb-8 max-w-md mx-auto'>
          Create your store and start showcasing your products to thousands of customers today.
        </p>

        {/* CTA Button */}
        <Link 
          href='/admin/stores'
          className='inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        >
          Create Your Store
          <svg 
            className='w-5 h-5' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path 
              strokeLinecap='round' 
              strokeLinejoin='round' 
              strokeWidth={2} 
              d='M13 7l5 5m0 0l-5 5m5-5H6' 
            />
          </svg>
        </Link>

        {/* Additional Info */}
        <div className='mt-12 flex items-center justify-center gap-8 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
            </svg>
            <span>Easy Setup</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
            </svg>
            <span>No Hidden Fees</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreNotFound
