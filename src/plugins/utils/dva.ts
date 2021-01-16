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
  let dva = getDvaApp();
  if (!dva) return { error: '獲取dva失敗!', success: false, state: null };
  let state: T = dva._store.getState()[namespace];
  return { state, success: true, error: null };
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
