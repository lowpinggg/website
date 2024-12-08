// hooks/useScrollLock.ts
import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    // Save initial overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (lock) {
      // Prevent scroll
      document.body.style.overflow = 'hidden';
      // Prevent iOS Safari scrolling
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore scroll
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [lock]); // Only re-run when lock changes
};