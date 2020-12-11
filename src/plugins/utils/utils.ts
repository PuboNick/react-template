import moment from 'moment';

import constants from '../constants';

/**
 * @description 生成一個長度爲8的隨機字符串
 */
export const random = (): string => {
  let arr = new Uint32Array(1);
  let number = window.crypto.getRandomValues(arr)[0];
  number = parseFloat('0.' + number.toString());
  return number.toString(32).slice(2, 10);
};
/**
 * @description 判斷時間是否在今天之前
 */
export const isExpire = (str: string): boolean => {
  return moment(new Date(str)).isBefore(moment());
};
/**
 * @description 獲取某個對象裡的幾個屬性並返回新的對象
 * @param {Object} obj 原始對象
 * @param {Array} keys 鍵名列表
 */
export const getItemsFormObj = (obj: any, keys: string[]): any => {
  let result: any = {};
  for (let key of keys) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
};
/**
 * 轉換日期
 * @param str 時間字符串
 */
export const parseDate = (str: string, format?: string): string => {
  if (!str) return '';
  if (!format) format = constants.DATE_FORMAT;
  return moment(new Date(str)).format(format);
};
/**
 * 轉換日期
 * @param str 時間字符串
 */
export const parseDaytime = (str: string, format?: string): string => {
  if (!str) return '';
  if (!format) format = constants.DATE_TIME_FORMAT;
  return moment(new Date(str)).format(format);
};
/**
 * 判斷一個值是否爲對象
 * @param obj 任意值
 */
export const isObj = (obj: any): boolean => {
  if (obj === null) return false;
  return typeof obj === 'object' || typeof obj === 'function';
};
/**
 * 複製一個普通對象
 * @param obj 對象
 */
export const clone = (obj: any): any => {
  let cloneObj;
  let Constructor = obj.constructor;
  if (Constructor === RegExp) {
    cloneObj = new Constructor(obj);
  } else if (Constructor === Date) {
    cloneObj = new Constructor(obj.getTime());
  } else {
    cloneObj = new Constructor();
  }
  for (let key in obj) {
    cloneObj[key] = isObj(obj[key]) ? clone(obj[key]) : obj[key];
  }
  return cloneObj;
};
/**
 * 異步加載script
 */
export const loadScript = (url: string) => {
  return new Promise(resolve => {
    let script: any = document.getElementById(url);
    if (!script) {
      script = document.createElement('script');
      script.id = url;
      document.body.appendChild(script);
    }
    script.src = url;
    script.addEventListener('load', () => resolve());
  });
};
/**
 * 去抖方法
 * @returns run 執行函數
 * @returns cancel 取消函數
 * @returns now 立刻執行函數
 */
export const setDebounce = (callback: any, time: number) => {
  let timeout: any = null;
  const cancel = () => {
    if (!timeout) return;
    clearTimeout(timeout);
    timeout = null;
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
    timeout = setTimeout(() => func(...args), time);
  };
  return { run, cancel, now };
};
/**
 * 設置循環執行
 * @returns 取消循序的方法
 */
export const makeInterval = (
  callback: any,
  time: number,
  shouldRunFirst?: boolean,
) => {
  const func = () => {
    if (typeof callback === 'function') {
      callback();
    }
  };
  if (shouldRunFirst) func();
  const interval = setInterval(func, time);
  return () => clearInterval(interval);
};
