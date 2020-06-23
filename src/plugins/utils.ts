import moment from 'moment';

import constans from './constans';

/**
 * @description 生成一個長度爲8的隨機數
 */
export const random = (): string =>
  Math.random()
    .toString(32)
    .slice(2, 10);
/**
 * @description 下载文件
 * @param {string} uri 文件地址
 * @param {string} name 文件名
 */
export const downloadFile = (uri: string, name: string) => {
  let a = document.createElement('a');
  a.href = uri;
  a.download = name;
  a.style.position = 'fixed';
  a.style.visibility = 'hidden';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
/**
 * @description 判斷時間是否在今天之前
 */
export const isExpire = (str: string) => {
  return moment(new Date(str)).isBefore(moment());
};
/**
 * @description 獲取某個對象裡的幾個屬性並返回新的對象
 * @param {Object} obj 原始對象
 * @param {Array} keys 鍵名列表
 */
export const getItemsFormObj = (obj: any, keys: string[]) => {
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
  return moment(new Date(str)).format(constans.DATE_FORMAT);
};
/**
 * 轉換日期
 * @param str 時間字符串
 */
export const parseDatetime = (str: string): string => {
  if (!str) return '';
  return moment(new Date(str)).format(constans.DATE_TIME_FORMAT);
};
