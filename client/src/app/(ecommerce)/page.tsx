"use client"
import HeroCarousel from '@/components/carousels/HeroCarousel'
import ProductCardSkeleton from '@/components/loaders/ProductCardLoader'
import CustomerReviews from '@/components/sections/CustomerReviews'
import HomeSections from '@/components/sections/HomeSection'
import ProductDetailed from '@/components/sections/ProductDetailed'
import SareeCategorySection from '@/components/sections/SareeCategorySection'
import SareeStoreSection from '@/components/sections/SareeStoreSection'
import { useGetProducts, useGetSingleProduct } from '@/hooks/buyer/useProducts'
import {  useMergeCart } from '@/hooks/buyer/useUserCart'
import { useCurrentUser } from '@/hooks/useUser'
import { useUserStore } from '@/stores/user.store'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

const Page = () => {
  const { isLoading } = useCurrentUser();
  const { isPending: isNormalSareesLoading, data: normalSarees } = useGetProducts(`?search=georgette%2Csarees&limit=4`);
  const { isPending: isBaluchariSareesLoading, data: baluchariSarees } = useGetProducts("?search=baluchari%2Csarees&limit=4");
  const { isPending: isSilkSareesLoading, data: silkSarees } = useGetProducts("?search=silk%2Csarees&limit=4");
  const { isLoading: singleProductLoading, data } = useGetSingleProduct()
  // console.log(data?.variants);
  const user = useUserStore((s) => s.user);
  const { mutate: mergeCart } = useMergeCart();
  const queryClient = useQueryClient();

  const router = useRouter();
  const hasMergedRef = useRef(false);

  useEffect(() => {
    
    if (!user || user.userType !== "customer" || hasMergedRef.current) return;
    const guestCart = localStorage.getItem("guest-cart");
    if (!guestCart) return;
    const parsedCart = JSON.parse(guestCart);
    if (!parsedCart.length) return;
    hasMergedRef.current = true;
    mergeCart(parsedCart, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart-summary-store'] });
        localStorage.removeItem("guest-cart");
      },
    });
  }, [user,mergeCart,queryClient]);

  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }

  }, [user, isLoading,router]);


  return (
    <div>
      <HeroCarousel />
      <SareeStoreSection />
      {isNormalSareesLoading && <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1, 2, 3, 4].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        }
      </div>}
      {!isNormalSareesLoading && normalSarees && <HomeSections products={normalSarees} title={"Georgette Sarees"} discription={"Best georgette sarees stock only at riwaz."} />}
      <SareeCategorySection />
      <div className='text-center my-8  sm:my-15  '>
        <h3 className='font-semibold fraunces text-3xl sm:text-5xl'>Featured Product</h3>
        <p className='text-md text-gray-600 mt-1 sm:mt-2'>A perfect blend of tradition, luxury, and grace.</p>
      </div>
      
      {!singleProductLoading && data && <ProductDetailed
        product={data.product}
        variants={data.variants}
        isFromHome={true}
        rating={4.5}
        reviewsLen={5}
        productImages={data.product.images}

      />}

      {!isBaluchariSareesLoading && baluchariSarees && <HomeSections products={baluchariSarees} title={"Baluchari Sarees"} discription={"Best baluchari sarees stock only at riwaz."} />}
      {isBaluchariSareesLoading && <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1, 2, 3, 4].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        }
      </div>}
      {!isSilkSareesLoading && silkSarees && <HomeSections products={silkSarees} title={"Silk Woven Sarees"} discription={"Best silk woven sarees stock only at riwaz."} />}
      {isSilkSareesLoading && <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1, 2, 3, 4].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        }
      </div>}
      <CustomerReviews/>
    </div>
  )
}

export default Page
