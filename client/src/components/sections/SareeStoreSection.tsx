// components/SareeStoreSection.tsx
import Image from 'next/image';

export default function SareeStoreSection() {
  return (
    <div className='min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-rose-50/30 to-white'>
      {/* Header Section */}
      <div className='text-center max-w-4xl mx-auto mb-6  md:mb-16 lg:mb-10'>
        <h1 className='text-4xl fraunces sm:text-5xl font-medium text-rose-900 mb-2 tracking-tight'>
          The Saree Store
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed'>
          Affordable elegance at unbeatable prices. Discover timeless drapes that celebrate heritage.
        </p>
        {/* <div className='w-20 h-px bg-rose-400 mx-auto mt-2'></div> */}
      </div>
      
      
      {/* Gallery Section */}
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8'>
          
          {/* Left Column - Hidden on mobile */}
          <div className='hidden md:block md:col-span-4'>
            <div className='group relative overflow-hidden rounded-sm h-[70vh] cursor-pointer'>
              <Image 
                src='/images/sar1.jpg'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'
                alt='Gold Collection Saree' 
                className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                <h3 className='text-2xl md:text-3xl font-light mb-2 tracking-wide'>Gold Collection</h3>
                <p className='text-sm text-white/80 font-light tracking-wider uppercase'>Timeless Elegance</p>
              </div>
            </div>
          </div>

          {/* Center Column - Main content */}
          <div className='md:col-span-4 flex flex-col gap-4 md:gap-6 lg:gap-8'>
            <div className='group relative overflow-hidden rounded-sm h-[45vh] md:h-[33vh] cursor-pointer'>
              <Image 
                src='/images/sar2.jpg'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
                alt='Essential Collection' 
                className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                <h3 className='text-2xl md:text-3xl font-light mb-2 tracking-wide'>Essential Collection</h3>
                <p className='text-sm text-white/80 font-light tracking-wider uppercase'>Everyday Grace</p>
              </div>
            </div>
            
            <div className='group relative overflow-hidden rounded-sm h-[45vh] md:h-[33vh] cursor-pointer'>
              <Image 
                src='/images/sar3.jpg'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
                alt='Premium Collection' 
                className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                <h3 className='text-2xl md:text-3xl font-light mb-2 tracking-wide'>Premium Collection</h3>
                <p className='text-sm text-white/80 font-light tracking-wider uppercase'>Luxurious Drapes</p>
              </div>
            </div>
          </div>

          {/* Right Column - Hidden on mobile & tablet */}
          <div className='hidden md:block md:col-span-4'>
            <div className='group relative overflow-hidden rounded-sm h-[70vh] cursor-pointer'>
              <Image 
                src='/images/car4.webp'
                fill
                sizes='(max-width: 1200px) 100vw, 25vw'
                alt='Designer Saree' 
                className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                <h3 className='text-2xl md:text-3xl font-light mb-2 tracking-wide'>Designer Range</h3>
                <p className='text-sm text-white/80 font-light tracking-wider uppercase'>Curated Perfection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}