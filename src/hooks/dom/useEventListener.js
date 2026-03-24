import { useEffect, useRef } from 'react';

export function useEventListener(eventName, handler, element, options) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement =
      element?.current ?? element ?? (typeof window !== 'undefined' ? window : null);

    if (!targetElement?.addEventListener) {
      return undefined;
    }

    const listener = (event) => {
      savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener, options);
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
