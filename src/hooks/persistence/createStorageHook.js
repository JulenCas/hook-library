import { useCallback, useEffect, useState } from 'react';

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function createStorageHook(storageType) {
  return function useStorage(key, initialValue) {
    const getStorage = () => {
      if (typeof window === 'undefined') {
        return null;
      }

      return storageType === 'local' ? window.localStorage : window.sessionStorage;
    };

    const [storedValue, setStoredValue] = useState(() => {
      const storage = getStorage();
      if (!storage) {
        return initialValue;
      }

      const item = storage.getItem(key);
      return item ? safeParse(item, initialValue) : initialValue;
    });

    const setValue = useCallback(
      (value) => {
        setStoredValue((current) => {
          const nextValue =
            typeof value === 'function' ? value(current) : value;

          const storage = getStorage();
          if (storage) {
            storage.setItem(key, JSON.stringify(nextValue));
          }

          return nextValue;
        });
      },
      [key]
    );

    const remove = useCallback(() => {
      const storage = getStorage();
      if (!storage) {
        return;
      }

      storage.removeItem(key);
      setStoredValue(initialValue);
    }, [initialValue, key]);

    useEffect(() => {
      const storage = getStorage();
      if (!storage) {
        return undefined;
      }

      const syncStorage = (event) => {
        if (event.key === key) {
          const nextValue = event.newValue
            ? safeParse(event.newValue, initialValue)
            : initialValue;
          setStoredValue(nextValue);
        }
      };

      window.addEventListener('storage', syncStorage);
      return () => window.removeEventListener('storage', syncStorage);
    }, [initialValue, key]);

    return [storedValue, setValue, remove];
  };
}
