import { useState } from 'react';

/**
 * 去抖方法
 * @param callback 回調函數
 * @param timer 延遲時間
 */
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
