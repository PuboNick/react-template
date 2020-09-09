import { loadScript } from './utils';
import constants from './constants';

let win: any = window;
// @ts-ignore
let UE = win.UE || null;

export const getUe = async () => {
  if (UE) return UE;
  await loadScript(constants.BASE_URL + 'ueditor/ueditor.config.js');
  win.UEDITOR_CONFIG.serverUrl =
    'http://10.244.233.14:8080/ueditor/jsp/controller.jsp';
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
