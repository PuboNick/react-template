/**
 * 自動加載 .boot.ts 結尾的組件
 */
import '@/assets/style.less';

const requireComponent = require.context('../', true, /\.boot\.ts$/);

requireComponent.keys().forEach(fileName => {
  requireComponent(fileName);
});
