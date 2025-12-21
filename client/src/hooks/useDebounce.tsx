"use client"


import { useEffect, useState } from 'react';

const useDebounce = (value:string, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the value changes again
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
};

export default useDebounce;
