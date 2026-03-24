import { useCallback } from 'react';
import { useAsync } from './useAsync';

export function useFetch(url, options = {}, deps = []) {
  const fetcher = useCallback(async () => {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }, [url, options]);

  return useAsync(fetcher, [fetcher, ...deps]);
}
