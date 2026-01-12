import Image from 'next/image';
import React from 'react'
interface ExploreCategoryCardProps {
    url: string;
    title: string;
}
const ExploreCategoryCard = ({url,title}:ExploreCategoryCardProps) => {
  return (
    <div className='w-[10rem] h-[10rem] hover:scale-105 duration-500 relative overflow-hidden rounded-lg shadow-lg cursor-pointer'>
        <Image src={url} alt={title} className='w-full h-full hover:scale-105 duration-500 object-cover' height={200} width={200} />
        <div className='absolute top-0 h-full w-full bg-black/55 flex items-center justify-center'>
            <h2 className='text-white text-2xl font-bold'>{title}</h2>
        </div>
    </div>
  )
}

export default ExploreCategoryCard