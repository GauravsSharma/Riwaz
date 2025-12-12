"use client"
import HeroCarousel from '@/components/carousels/HeroCarousel'
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
  const { isPending: isNormalSareesLoading, data: normalSarees } = useGetProducts("georgette saree");
  const { isPending: isBaluchariSareesLoading, data: baluchariSarees } = useGetProducts("baluchari saree");
  const { isPending: isSilkSareesLoading, data: silkSarees } = useGetProducts("silk woven sarees");
  const { isLoading: singleProductLoading, data } = useGetSingleProduct()
  // console.log(data?.variants);
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading]);

  if (isBaluchariSareesLoading) {
    return <div>Loading.....</div>
  }

  return (
    <div>
      <HeroCarousel />

      <SareeStoreSection />
      {!isNormalSareesLoading && normalSarees && <HomeSections products={normalSarees} title={"Georgette Sarees"} discription={"Best georgette sarees stock only at riwaz."} />}

      <SareeCategorySection />
      <div className='text-center my-15  fraunces font-semibold text-5xl'>
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

      {/* Correct props */}
      {!isSilkSareesLoading && silkSarees && <HomeSections products={silkSarees} title={"Silk Woven Sarees"} discription={"Best silk woven sarees stock only at riwaz."} />}
    </div>
  )
}

export default page
