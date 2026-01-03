import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  if (value === '' && debounced !== '') {
    setDebounced('');
  }

  useEffect(() => {
    if (value === '') return;

    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};
