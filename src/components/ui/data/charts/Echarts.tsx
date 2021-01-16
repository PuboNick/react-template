import React, { FC, useRef, useState, useEffect } from 'react';
import * as echarts from 'echarts';

import styles from './echartsStyle.less';

interface EchartsProps {
  options: any;
  action?: any;
  onClick?: any;
  loading?: any;
}

const defaultLoading = {
  text: '加載中···',
  maskColor: 'rgba(255, 255, 255, 0.8)',
};

const Echarts: FC<EchartsProps> = ({
  options = {},
  action = {},
  onClick,
  loading = false,
}) => {
  const ref: any = useRef();
  const [chart, setChart]: any = useState(null);

  const init = () => {
    const c = echarts.init(ref.current);
    if (onClick) c.on('click', onClick);
    setChart(c);
    return c;
  };

  useEffect(() => {
    let listener: any = null;
    const c = init();
    listener = () => c.resize();
    window.addEventListener('resize', listener);
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

  useEffect(() => {
    if (!chart) return;
    if (typeof loading === 'object') {
      chart.showLoading({ ...defaultLoading, ...loading });
    } else if (loading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
  }, [loading, chart]);

  return <div ref={ref} className={styles.chart}></div>;
};

export default Echarts;
