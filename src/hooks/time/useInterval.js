import { useEffect, useRef } from 'react';

export function useInterval(callback, delay, enabled = true) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || typeof delay !== 'number') {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(intervalId);
  }, [delay, enabled]);
}
