import { useEffect, useState } from "react";

// Returns a debounced copy of `value` that only updates after `delay` ms
// of no further changes. Used for the doctors search input.
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
