import moment from 'moment';

import constants from './constants';

/**
 * @description 生成一個長度爲8的隨機數
 */
export const random = (): string =>
  Math.random()
    .toString(32)
    .slice(2, 10);
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
export const parseDate = (str: string): string => {
  if (!str) return '';
  return moment(new Date(str)).format(constants.DATE_FORMAT);
};
/**
 * 轉換日期
 * @param str 時間字符串
 */
export const parseDaytime = (str: string): string => {
  if (!str) return '';
  return moment(new Date(str)).format(constants.DATE_TIME_FORMAT);
};
/**
 * 判斷一個值是否爲對象
 * @param obj 任意值
 */
export const isObj = (obj: any): boolean => {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
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
