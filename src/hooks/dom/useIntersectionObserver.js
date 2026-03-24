import { useEffect, useState } from 'react';

export function useIntersectionObserver(ref, options = {}) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    if (!ref?.current || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options.root, options.rootMargin, options.threshold]);

  return {
    entry,
    isIntersecting: Boolean(entry?.isIntersecting)
  };
}
