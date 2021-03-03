import { useState } from 'react';

export const useDebounce = (callback: any, time: number) => {
  const [state, setState]: any = useState(null);
  const cancel = () => {
    if (!state) return;
    clearTimeout(state);
    setState(null);
  };
  const func = (...args: any[]) => {
    if (typeof callback === 'function') {
      callback(...args);
      cancel();
    }
  };
  const now = (...args: any[]) => {
    func(...args);
    cancel();
  };
  const run = (...args: any[]) => {
    cancel();
    const timeout = setTimeout(() => func(...args), time);
    setState(timeout);
  };
  return { run, cancel, now };
};
