import FeaturesBanner from '@/components/shared/feature/FeatureBanner';
import NewsletterSubscription from '@/components/shared/feature/NewsletterSubscription';
import EcomFooter from '@/components/shared/footer/EcomFooter';
import EcomNav from '@/components/shared/header/EcomNav';
import React from 'react';
import QueryProvider from '../QueryProvider';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryProvider>
      <EcomNav />
      {children}
      <FeaturesBanner />
      <NewsletterSubscription />
      <EcomFooter />
    </QueryProvider>

  )
}

export default layout