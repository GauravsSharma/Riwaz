"use client"
import FeaturesBanner from '@/components/shared/feature/FeatureBanner';
import NewsletterSubscription from '@/components/shared/feature/NewsletterSubscription';
import EcomFooter from '@/components/shared/footer/EcomFooter';
import EcomNav from '@/components/shared/header/EcomNav';
import { useCurrentUser } from '@/hooks/useUser';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading } = useCurrentUser();
  const user = useUserStore((s) => s.user);
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && user?.userType === "seller") {
      router.push("/admin/dashboard");
    }
  }, [user, isLoading, router]);

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