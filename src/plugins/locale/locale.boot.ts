import { addLocale } from 'umi';
import zhTW from 'antd/es/locale/zh_TW';

import bootstrap from '../bootstrap';

const option: any = {
  momentLocale: 'zh-tw',
  antd: zhTW,
};

bootstrap.on('init', () => {
  addLocale('zh-TW', {}, option);
});
