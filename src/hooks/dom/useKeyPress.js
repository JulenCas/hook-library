import { useState } from 'react';
import { useEventListener } from './useEventListener';

export function useKeyPress(targetKey) {
  const [pressed, setPressed] = useState(false);

  useEventListener('keydown', (event) => {
    if (event.key === targetKey) {
      setPressed(true);
    }
  });

  useEventListener('keyup', (event) => {
    if (event.key === targetKey) {
      setPressed(false);
    }
  });

  return pressed;
}
