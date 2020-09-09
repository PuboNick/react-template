// @ts-ignore
import html2pdf from 'html2pdf.js';
import { dataURItoBlob } from './file';
import { loadScript } from './utils';
import constants from './constants';

const win: any = window;

/**
 * html2pdf 配置
 */
export const html2pdfOption = {
  margin: 0.5,
  filename: 'download.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 1.5 },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: { mode: ['avoid-all'] },
};

/**
 * HTML 轉 dataurl
 * @param target 目標HTML節點
 */
export const html2dataUrl = (target: any) => {
  return html2pdf()
    .from(target)
    .outputPdf('dataurlstring');
};

/**
 * HTML 轉 image dataurl
 * @param target 目標HTML節點
 */
export const html2image = (target: any) => {
  return html2pdf()
    .set(html2pdfOption)
    .from(target)
    .outputImg('dataurlstring');
};

/**
 * 渲染pdf
 * @param url pdf地址 可以為base64
 * @param target 目標節點
 */
export const getEmbedPdfUrl = (url: string) => {
  if (url.indexOf('base64') < 0) return url;
  let blob = dataURItoBlob(url);
  return URL.createObjectURL(blob);
};

let pdfjsLib = win.pdfjsLib || null;

/**
 * 獲取pdfjs
 */
export const getPdfJs = async () => {
  if (pdfjsLib) return pdfjsLib;
  await loadScript(constants.BASE_URL + 'pdfjs/build/pdf.js');
  return win.pdfjsLib;
};
