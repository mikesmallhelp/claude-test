"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OsoitetiedotRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/address_info');
  }, [router]);
  
  return null;
}