import { useState } from 'react';

const useDebounce = (callback: any, timer: number) => {
  const [timeout, setTime]: any = useState(null);
  const run = (...args: any) => {
    if (timeout) clearTimeout(timeout);
    let time = setTimeout(() => {
      callback(...args);
    }, timer);
    setTime(time);
  };
  return {
    run,
  };
};

export default useDebounce;
