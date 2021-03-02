import { getDvaApp } from 'umi';

/**
 * 獲取dva store 數據
 * @param namespace model 命名空間
 */
export const getState = <T>(namespace: string): T => {
  let dva: any = getDvaApp();
  let state: T = dva?._store?.getState()[namespace];
  return state;
};

/**
 * 使用 dispatch
 * @param action
 */
export const dvaDispatch = (action: any) => {
  let dva = getDvaApp();
  if (!dva) return;
  dva._store.dispatch(action);
};
