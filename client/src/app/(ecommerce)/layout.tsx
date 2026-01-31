"use client"
import FeaturesBanner from '@/components/shared/feature/FeatureBanner';
import NewsletterSubscription from '@/components/shared/feature/NewsletterSubscription';
import EcomFooter from '@/components/shared/footer/EcomFooter';
import EcomNav from '@/components/shared/header/EcomNav';
import { useMergeCart } from '@/hooks/buyer/useUserCart';
import { useCurrentUser } from '@/hooks/useUser';
import { useUserCart } from '@/stores/buyer/cart.user';
import { useUserStore } from '@/stores/user.store';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { isLoading } = useCurrentUser();
  const user = useUserStore((s) => s.user);
  const router = useRouter();
  const queryClient = useQueryClient();
  const setCount = useUserCart((s) => s.setCount);
  const { mutate: mergeCart } = useMergeCart();
  const hasMergedRef = useRef(false);

// console.log("User",user);

  useEffect(() => {
  
    
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading, router]);

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
    console.log("m aya tha.",hasMergedRef.current);
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
  }, [user, mergeCart, queryClient]);

  return (
    <>
      <EcomNav />
      {children}
      <FeaturesBanner />
      <NewsletterSubscription />
      <EcomFooter />
    </>
  );
}

export default Layout;