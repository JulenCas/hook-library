import { useCallback, useState } from 'react';
import { useMounted } from '../state/useMounted';

export function useAsyncFn(asyncFunction, initialData = null) {
  const mountedRef = useMounted();
  const [state, setState] = useState({
    data: initialData,
    error: null,
    loading: false
  });

  const execute = useCallback(
    async (...args) => {
      setState((current) => ({ ...current, loading: true, error: null }));

      try {
        const result = await asyncFunction(...args);

        if (mountedRef.current) {
          setState({ data: result, error: null, loading: false });
        }

        return result;
      } catch (error) {
        if (mountedRef.current) {
          setState((current) => ({ ...current, error, loading: false }));
        }

        throw error;
      }
    },
    [asyncFunction, mountedRef]
  );

  return { ...state, execute };
}
