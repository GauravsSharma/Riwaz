"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the current path is /admin
    if (window.location.pathname === '/admin') {
      router.push('/admin/dashboard');
    }
  }, [router]);
  return (
    <div>
      hello admin page
    </div>
  )
}

export default page
