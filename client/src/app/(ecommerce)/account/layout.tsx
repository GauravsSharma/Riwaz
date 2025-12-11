import ProfileSidebar from '@/components/account/Sidebar';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='p-20 w-full flex gap-5 '>
    <ProfileSidebar/>
    {children}
    </div>
  )
}

export default layout