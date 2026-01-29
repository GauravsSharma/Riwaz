"use client"
import HeroCarousel from '@/components/carousels/HeroCarousel'
import ProductCardSkeleton from '@/components/loaders/ProductCardLoader'
import HomeSections from '@/components/sections/HomeSection'
import ProductDetailed from '@/components/sections/ProductDetailed'
import SareeCategorySection from '@/components/sections/SareeCategorySection'
import SareeStoreSection from '@/components/sections/SareeStoreSection'
import { useGetProductByType, useGetSingleProduct } from '@/hooks/buyer/useProducts'
import { useGetCartSummary, useMergeCart } from '@/hooks/buyer/useUserCart'
import { useUserCart } from '@/stores/buyer/cart.user'
import { useUserStore } from '@/stores/user.store'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

const Page = () => {
  
  const { isPending: isNormalSareesLoading, data: normalSarees } = useGetProductByType(`Banarasi`);
  const { isPending: isBaluchariSareesLoading, data: baluchariSarees } = useGetProductByType("Baluchari");
  const { isPending: isSilkSareesLoading, data: silkSarees } = useGetProductByType("Bandhani");
  const { isLoading: singleProductLoading, data } = useGetSingleProduct()
  // console.log(data?.variants);
  const user = useUserStore((s) => s.user);
  const { mutate: mergeCart } = useMergeCart();
  const queryClient = useQueryClient();
  useGetCartSummary()
  const setCount = useUserCart((s) => s.setCount);

  const hasMergedRef = useRef(false);
 useEffect(() => {
  if (!user) {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      const parsedCart = JSON.parse(guestCart);
      setCount(parsedCart.length);
    } else {
      setCount(0);
    }
  }
}, [user, setCount]);

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
  }, [user,mergeCart, queryClient]);




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
      {!isSilkSareesLoading && silkSarees && <HomeSections products={silkSarees} title={"Bandhani Sarees"} discription={"Best bandhani sarees stock only at riwaz."} />}
      {isSilkSareesLoading && <div className="flex justify-center flex-wrap gap-2 gap-y-2 mt-20 md:mt-34">
        {
          [1, 2, 3, 4].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        }
      </div>}
      
    </div>
  )
}

export default Page
