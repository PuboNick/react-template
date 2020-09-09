import { random } from './utils';

/**
 * base64 轉blob
 * @param dataURI base64 字符串
 */
export const dataURItoBlob = (dataURI: string) => {
  let mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  let byteString = atob(dataURI.split(',')[1]);
  let arrayBuffer = new ArrayBuffer(byteString.length);
  let intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
};
/**
 * @description blob轉base64
 */
export const blob2base64 = (blob: any): any => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    if (!blob) return reject('文件爲空!');
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onabort = () => reject();
    reader.readAsDataURL(blob);
  });
};
/**
 * @description blob轉file
 * @param {} data
 */
export const blob2file = (blob: any, name: string, type: string) => {
  return new File(blob, name, { type });
};
/**
 * @description base64轉file
 * @param {dataurl} dataURI base64數據
 * @param {string} name 文件名
 */
export const base642file = (dataURI: any, name: string) => {
  let { blob, type }: any = dataURItoBlob(dataURI);
  if (!name) name = `${random()}.${type.split('/')[1]}`;
  return blob2file([blob], name, type);
};
/**
 * @description 對象轉FormData
 */
export const obj2form = (data: any) => {
  let results = new FormData();
  for (const index of Object.keys(data)) {
    results.append(index, data[index]);
  }
  return results;
};
