import { useEventListener } from './useEventListener';

export function useOnClickOutside(ref, handler, eventName = 'mousedown') {
  useEventListener(eventName, (event) => {
    const element = ref?.current;

    if (!element || element.contains(event.target)) {
      return;
    }

    handler(event);
  });
}
