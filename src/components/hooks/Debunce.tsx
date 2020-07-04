import { useState } from 'react';

const useDebunce = (callback: any, timmer: number) => {
  const [timeout, setTime]: any = useState(null);
  const run = (...args: any) => {
    if (timeout) clearTimeout(timeout);
    let time = setTimeout(() => {
      callback(...args);
    }, timmer);
    setTime(time);
  };
  return {
    run,
  };
};

export default useDebunce;
