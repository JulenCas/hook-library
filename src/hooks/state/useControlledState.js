import { useCallback, useMemo, useState } from 'react';

export function useControlledState({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === 'function' ? nextValue(currentValue) : nextValue;

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      if (onChange) {
        onChange(resolvedValue);
      }
    },
    [currentValue, isControlled, onChange]
  );

  return useMemo(
    () => ({ value: currentValue, setValue, isControlled }),
    [currentValue, setValue, isControlled]
  );
}
