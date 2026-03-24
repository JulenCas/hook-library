import { useMemo, useState } from 'react';
import { useEventListener } from '../dom/useEventListener';

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function useWindowSize() {
  const [size, setSize] = useState(getWindowSize);

  useEventListener('resize', () => {
    setSize(getWindowSize());
  });

  return useMemo(() => size, [size]);
}
