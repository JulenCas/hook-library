import { useCallback, useMemo, useState } from 'react';

export function useCounter(initialValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity, step = 1 } = options;

  const clamp = useCallback(
    (next) => Math.min(max, Math.max(min, next)),
    [max, min]
  );

  const [count, setCount] = useState(() => clamp(initialValue));

  const increment = useCallback(
    (amount = step) => {
      setCount((current) => clamp(current + amount));
    },
    [clamp, step]
  );

  const decrement = useCallback(
    (amount = step) => {
      setCount((current) => clamp(current - amount));
    },
    [clamp, step]
  );

  const reset = useCallback(() => {
    setCount(clamp(initialValue));
  }, [clamp, initialValue]);

  const set = useCallback((value) => {
    setCount(clamp(value));
  }, [clamp]);

  return useMemo(
    () => ({ count, increment, decrement, reset, set }),
    [count, increment, decrement, reset, set]
  );
}
