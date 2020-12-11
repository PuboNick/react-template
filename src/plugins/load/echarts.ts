import constants from '../constants';
import { loadScript } from '../utils/utils';

// 設置 echarts 變量
let echarts: any = null;

/**
 * 加載 echarts 腳本
 * @description 異步加載 echarts 腳本
 */
const loadEchartsScript = async () => {
  await loadScript(constants.BASE_URL + 'plugins/echarts.min.js');
  return (window as any).echarts;
};

/**
 * 獲取 echarts 對象
 * @description 如果能直接獲取到 echarts 則返回，否則進行異步加載
 */
export const getEcharts = async () => {
  if (echarts) return echarts;
  let res = await loadEchartsScript();
  echarts = res;
  return echarts;
};
