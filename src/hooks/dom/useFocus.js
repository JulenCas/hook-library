import { useCallback, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useFocus() {
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEventListener('focus', () => setIsFocused(true), ref);
  useEventListener('blur', () => setIsFocused(false), ref);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  return { ref, isFocused, focus };
}
