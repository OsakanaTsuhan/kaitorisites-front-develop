// lib/useRouteReset.ts
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApplyForm } from '@/context/ApplyFormContext';

export const useRouteReset = () => {
  const pathname = usePathname();
  const { resetFormData } = useApplyForm();

  useEffect(() => {
    // Check if current path is NOT an apply page
    const isApplyPage = pathname.startsWith('/apply');
    
    if (!isApplyPage) {
      // Reset form data when navigating away from apply pages
      resetFormData();
    }
  }, [pathname, resetFormData]);
};
