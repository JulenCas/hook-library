import { useEffect, useRef, useState } from 'react';

export function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRunRef = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remainingTime = delay - (now - lastRunRef.current);

    if (remainingTime <= 0) {
      setThrottledValue(value);
      lastRunRef.current = now;
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setThrottledValue(value);
      lastRunRef.current = Date.now();
    }, remainingTime);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}
