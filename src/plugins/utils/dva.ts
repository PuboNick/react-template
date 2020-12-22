import { getDvaApp } from 'umi';

interface StateSuccess<T> {
  success: true;
  error: null;
  state: T;
}
interface StateFalse<T> {
  success: false;
  error: string;
  state: null;
}

type StateRes<T> = StateSuccess<T> | StateFalse<T>;

/**
 * 獲取dva store 數據
 * @param namespace model 命名空間
 */
export const getState = <T>(namespace: string): StateRes<T> => {
  let store = getDvaApp();
  if (!store) return { error: '獲取dva失敗!', success: false, state: null };
  let state: T = store._store.getState()[namespace];
  return { state, success: true, error: null };
};
