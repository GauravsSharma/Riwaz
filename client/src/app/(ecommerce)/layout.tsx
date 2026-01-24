import FeaturesBanner from '@/components/shared/feature/FeatureBanner';
import NewsletterSubscription from '@/components/shared/feature/NewsletterSubscription';
import EcomFooter from '@/components/shared/footer/EcomFooter';
import EcomNav from '@/components/shared/header/EcomNav';
import React from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <EcomNav />
      {children}
      <FeaturesBanner />
      <NewsletterSubscription />
      <EcomFooter />
    </>

  )
}

export default layout