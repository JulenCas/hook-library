import { useEffect } from 'react';
import { useAsyncFn } from './useAsyncFn';

export function useAsync(asyncFunction, deps = [], initialData = null) {
  const state = useAsyncFn(asyncFunction, initialData);

  useEffect(() => {
    state.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    ...state,
    refetch: state.execute
  };
}
