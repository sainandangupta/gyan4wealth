import { useState, useCallback, useRef } from 'react';
import { countUp } from '../utils/animations';

interface UseCountUpOptions {
  /** Final number to reach */
  target: number;
  /** Duration in ms (default 1200) */
  duration?: number;
  /** If true, prepend a "+" sign */
  showPlus?: boolean;
  /** Suffix string (e.g. "K", "%", "+") */
  suffix?: string;
  /** Prefix string (e.g. "₹") */
  prefix?: string;
}

interface UseCountUpReturn {
  /** Current display value (number) */
  value: number;
  /** Formatted display string */
  display: string;
  /** Ref callback — assign to `ref` on the element, then call `start()` */
  start: () => void;
  /** Whether the animation has completed */
  done: boolean;
}

/**
 * Hook that counts up from 0 → target using requestAnimationFrame.
 * Designed to be triggered once via `whileInView` or IntersectionObserver.
 */
export function useCountUp({
  target,
  duration = 1200,
  suffix = '',
  prefix = '',
}: UseCountUpOptions): UseCountUpReturn {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;

    const cancel = countUp(target, duration, (v) => {
      setValue(v);
      if (v >= target) setDone(true);
    });

    // cleanup not strictly needed since we only run once,
    // but save it just in case
    return cancel;
  }, [target, duration]);

  const display = `${prefix}${value.toLocaleString('en-IN')}${suffix}`;

  return { value, display, start, done };
}
