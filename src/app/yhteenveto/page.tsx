"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function YhteenvetoRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/summary');
  }, [router]);
  
  return null;
}