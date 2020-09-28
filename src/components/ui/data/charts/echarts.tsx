import React, { FC, useRef, useState, useEffect } from 'react';

import { getEcharts } from '@/plugins/echarts';

interface EchartsProps {
  options: any;
  action?: any;
  onClick?: any;
}

const Echarts: FC<EchartsProps> = ({ options, action = {}, onClick }) => {
  const ref: any = useRef();
  const [chart, setChart]: any = useState(null);

  const init = async () => {
    let echarts = await getEcharts();
    let c = echarts.init(ref.current);
    if (onClick) c.on('click', onClick);
    setChart(c);
    return c;
  };

  useEffect(() => {
    let listener: any = null;
    init().then(c => {
      listener = () => c.resize();
      window.addEventListener('resize', listener);
    });
    return () => {
      window.removeEventListener('resize', listener);
      if (chart) chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chart) chart.setOption(options);
  }, [options, chart]);

  useEffect(() => {
    if (chart) chart.dispatchAction(action);
  }, [action, chart]);

  return <div ref={ref} style={styles.chart}></div>;
};

const styles = {
  chart: {
    width: '100%',
    height: '100%',
  },
};

export default Echarts;
