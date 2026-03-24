import { useEffect } from 'react';

export function usePageTitle(title, { preserveOnUnmount = false } = {}) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      if (!preserveOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, preserveOnUnmount]);
}
