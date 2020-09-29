import { loadScript } from './utils';
import constants from './constants';

// UE 編輯器對象
let UE = (window as any).UE || null;

/**
 * 獲取編輯器對象
 * @description 如果已經加載了 UE 就直接返回 UE 對象，否則異步加載
 */
export const getUe = async () => {
  const ueServerUrl = constants.UE_SERVICE_URL;
  if (UE) return UE;
  await loadScript(constants.BASE_URL + 'ueditor/ueditor.config.js');
  (window as any).UEDITOR_CONFIG.serverUrl = ueServerUrl;
  await loadScript(constants.BASE_URL + 'ueditor/ueditor.all.min.js');
  UE = (window as any).UE;
  return UE;
};

/**
 * UE 的配置項
 * @description 詳情見官方文檔 https://fex.baidu.com/ueditor/#start-config
 */
export const EditorOptions = {
  autoHeightEnabled: false,
  zIndex: 600,
  autoTransWordToList: true,
  elementPathEnabled: false,
  enableAutoSave: false,
};
