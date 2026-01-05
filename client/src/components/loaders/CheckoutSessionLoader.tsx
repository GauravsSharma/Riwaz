import React from 'react'
import Image from 'next/image'

const CheckoutSessionLoader = () => {
    
    return (
        <div className='h-screen w-full z-50 fixed top-0 left-0 bg-white flex justify-center items-center'>
            <div className='flex justify-center items-center flex-col'>
                <Image src="/loaders/paymentLoader.gif" alt="" width={200} height={200} className='rounded-xl mb-5'/>
                <div className='text-2xl'>
                    Creating checkout session...
                </div>
            </div>

        </div>
    )
}

export default CheckoutSessionLoader
