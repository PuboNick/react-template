import { loadScript } from './utils';
import constants from './constants';

let win: any = window;
// @ts-ignore
let UE = win.UE || null;

export const getUe = async () => {
  const ueServerUrl = constants.UE_SERVICE_URL;
  if (UE) return UE;
  await loadScript(constants.BASE_URL + 'ueditor/ueditor.config.js');
  win.UEDITOR_CONFIG.serverUrl = ueServerUrl;
  await loadScript(constants.BASE_URL + 'ueditor/ueditor.all.min.js');
  UE = win.UE;
  return UE;
};

export const EditorOptions = {
  autoHeightEnabled: false,
  zIndex: 600,
  autoTransWordToList: true,
  elementPathEnabled: false,
  enableAutoSave: false,
};
