import { getDvaApp } from 'umi';

interface StateRes<T> {
  error?: string;
  state?: T;
  success: boolean;
}

/**
 * 獲取dva store 數據
 * @param namespace model 命名空間
 */
export const getState = <T>(namespace: string): StateRes<T> => {
  let store = getDvaApp();
  if (!store) return { error: '獲取dva失敗!', success: false };
  let state: T = store._store.getState()[namespace];
  return { state, success: true };
};
