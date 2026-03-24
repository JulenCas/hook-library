import { useMemo } from 'react';
import { useToggle } from './useToggle';

export function useBoolean(initialValue = false) {
  const [value, controls] = useToggle(initialValue);

  return useMemo(
    () => ({
      value,
      isTrue: value === true,
      isFalse: value === false,
      ...controls
    }),
    [value, controls]
  );
}
