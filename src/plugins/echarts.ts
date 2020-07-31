import constans from './constans';

let echarts: any = null;

const loadEchartsScript = () => {
  return new Promise(resolve => {
    let scpirt = document.createElement('script');
    scpirt.src = constans.BASE_URL + 'plugins/echarts.min.js';
    scpirt.onload = () => {
      let win: any = window;
      resolve(win.echarts);
    };
    document.body.appendChild(scpirt);
  });
};

export const getEcharts = async () => {
  if (echarts) return echarts;
  let res = await loadEchartsScript();
  echarts = res;
  return echarts;
};
