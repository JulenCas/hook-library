import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  const start = useCallback(() => {
    if (typeof delay !== 'number') {
      return;
    }

    clear();
    timeoutRef.current = window.setTimeout(() => {
      savedCallback.current();
    }, delay);
  }, [clear, delay]);

  useEffect(() => {
    start();
    return clear;
  }, [start, clear]);

  return { start, clear };
}
