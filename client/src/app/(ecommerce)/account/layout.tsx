import ProfileSidebar from '@/components/account/Sidebar';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=' sm:p-8 md:p-15 lg:p-20  sm:flex gap-5 mt-30 p-5 sm:mt-20 w-full'>
    <ProfileSidebar/>
    {children}
    </div>
  )
}

export default layout