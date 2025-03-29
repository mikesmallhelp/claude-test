"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HenkilotiedotRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/personal_info');
  }, [router]);
  
  return null;
}