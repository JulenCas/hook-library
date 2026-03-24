import { useMemo } from 'react';
import { useWindowSize } from './useWindowSize';

const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

export function useBreakpoint(breakpoints = DEFAULT_BREAKPOINTS) {
  const { width } = useWindowSize();

  return useMemo(() => {
    const entries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);
    const active = entries.reduce((acc, [key, minWidth]) => {
      if (width >= minWidth) {
        return key;
      }
      return acc;
    }, 'base');

    return {
      current: active,
      width,
      isAbove: (key) => width >= (breakpoints[key] ?? Number.POSITIVE_INFINITY)
    };
  }, [breakpoints, width]);
}
