import { useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useHover() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEventListener('mouseenter', () => setIsHovered(true), ref);
  useEventListener('mouseleave', () => setIsHovered(false), ref);

  return [ref, isHovered];
}
