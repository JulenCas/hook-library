import { useCallback, useMemo, useState } from 'react';
import { useInterval } from './useInterval';

export function useCountdown(initialSeconds = 10) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    },
    1000,
    isRunning
  );

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback((nextValue = initialSeconds) => {
    setSecondsLeft(nextValue);
    setIsRunning(false);
  }, [initialSeconds]);

  return useMemo(
    () => ({ secondsLeft, isRunning, start, stop, reset }),
    [secondsLeft, isRunning, start, stop, reset]
  );
}
