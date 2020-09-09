import constants from './constants';
import { loadScript } from './utils';

let echarts: any = null;

const loadEchartsScript = async () => {
  await loadScript(constants.BASE_URL + 'plugins/echarts.min.js');
  let win: any = window;
  return win.echarts;
};

export const getEcharts = async () => {
  if (echarts) return echarts;
  let res = await loadEchartsScript();
  echarts = res;
  return echarts;
};
