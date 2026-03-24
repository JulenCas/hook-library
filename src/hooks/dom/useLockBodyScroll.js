import { useEffect } from 'react';

export function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (!locked) {
      return undefined;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
