import { useState } from 'react';

const useDebunce = (callback: any, timmer: number) => {
  const [timeout, setTime]: any = useState(null);
  const run = (...args: any) => {
    if (timeout) clearTimeout(timeout);
    setTime(
      setTimeout(() => {
        callback(...args);
      }, timmer),
    );
  };
  return {
    run,
  };
};

export default useDebunce;
