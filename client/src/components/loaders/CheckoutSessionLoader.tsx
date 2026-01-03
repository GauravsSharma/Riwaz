import React from 'react'
import Image from 'next/image'

const CheckoutSessionLoader = () => {
    
    return (
        <div className='h-screen w-full z-50 fixed top-0 left-0 bg-black/85 flex justify-center items-center'>
            <div className='flex justify-center items-center flex-col text-white'>
                <Image src="/loaders/form_loader.gif" alt="" width={150} height={150} />
                <div className='text-2xl'>
                    Creating checkout session...
                </div>
            </div>

        </div>
    )
}

export default CheckoutSessionLoader
