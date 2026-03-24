import { useState } from 'react';
import { useEventListener } from './useEventListener';

function getScrollPosition() {
  return {
    x: window.scrollX,
    y: window.scrollY
  };
}

export function useScrollPosition() {
  const [position, setPosition] = useState(() =>
    typeof window === 'undefined' ? { x: 0, y: 0 } : getScrollPosition()
  );

  useEventListener('scroll', () => {
    setPosition(getScrollPosition());
  }, window, { passive: true });

  return position;
}
