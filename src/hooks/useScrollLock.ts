// hooks/useScrollLock.ts
import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      // Store current scroll position
      const scrollPosition = window.scrollY;
      
      // Just prevent scrolling without fixed positioning
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      
      // Maintain scroll position
      window.scrollTo(0, scrollPosition);
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [lock]);
};