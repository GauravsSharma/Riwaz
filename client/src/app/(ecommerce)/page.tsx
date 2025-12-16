"use client"
import HeroCarousel from '@/components/carousels/HeroCarousel'
import ProductCardSkeleton from '@/components/loaders/ProductCardLoader'
import EmbroideredSareeSection from '@/components/sections/EmbroideredSareeSection'
import HomeSections from '@/components/sections/HomeSection'
import ProductDetailed from '@/components/sections/ProductDetailed'
import SareeCategorySection from '@/components/sections/SareeCategorySection'
import SareeStoreSection from '@/components/sections/SareeStoreSection'
import { useGetProducts, useGetSingleProduct } from '@/hooks/buyer/useProducts'
import { useGetCartSummary } from '@/hooks/buyer/useUserCart'
import { useCurrentUser } from '@/hooks/useUser'
import { useProductStore } from '@/stores/buyer/products.store'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'


const page = () => {
  const { isLoading } = useCurrentUser();
  const { isPending: isNormalSareesLoading, data: normalSarees } = useGetProducts(`?search=georgette%2Csarees&limit=4`);
  const { isPending: isBaluchariSareesLoading, data: baluchariSarees } = useGetProducts("?search=baluchari%2Csarees&limit=4");
  const { isPending: isSilkSareesLoading, data: silkSarees } = useGetProducts("?search=silk%2Csarees&limit=4");
  const { isLoading: singleProductLoading, data } = useGetSingleProduct()
  // console.log(data?.variants);
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading]);


  return (
    <div>
      <HeroCarousel />

      <SareeStoreSection />
      {isNormalSareesLoading&& <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1,2,3,4].map((_,i)=>(
            <ProductCardSkeleton key={i}/>
          ))
        }
       </div>}
      {!isNormalSareesLoading && normalSarees && <HomeSections products={normalSarees} title={"Georgette Sarees"} discription={"Best georgette sarees stock only at riwaz."} />}

      <SareeCategorySection />
      <div className='text-center my-15 fraunces font-semibold text-3xl sm:text-5xl'>
        Featured Product
      </div>
      {!singleProductLoading && data && <ProductDetailed
        product={data.product}
        variants={data.variants}
        isFromHome={true}
        rating={4.5}
        reviewsLen={5}
        productImages={data.product.images}

      />}

      {/* Correct props */}
      {!isBaluchariSareesLoading && baluchariSarees && <HomeSections products={baluchariSarees} title={"Baluchari Sarees"} discription={"Best baluchari sarees stock only at riwaz."} />}
        {isBaluchariSareesLoading&& <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1,2,3,4].map((_,i)=>(
            <ProductCardSkeleton key={i}/>
          ))
        }
       </div>}
      {/* Correct props */}
      {!isSilkSareesLoading && silkSarees && <HomeSections products={silkSarees} title={"Silk Woven Sarees"} discription={"Best silk woven sarees stock only at riwaz."} />}
       {isSilkSareesLoading&& <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1,2,3,4].map((_,i)=>(
            <ProductCardSkeleton key={i}/>
          ))
        }
       </div>}
    </div>
  )
}

export default page
