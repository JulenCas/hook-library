import { useEffect } from 'react';
import { useAsyncFn } from './useAsyncFn';

export function usePolling(asyncFunction, intervalMs = 5000, enabled = true) {
  const state = useAsyncFn(asyncFunction);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    state.execute();

    const intervalId = window.setInterval(() => {
      state.execute();
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [enabled, intervalMs, state.execute]);

  return {
    ...state,
    refetch: state.execute
  };
}
