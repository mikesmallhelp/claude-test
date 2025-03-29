"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LuottokorttitiedotRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/credit_card_info');
  }, [router]);
  
  return null;
}