import React, { useEffect } from 'react';
import { UserAccessModelState, useSelector, useModel } from 'umi';

/**
 * 獲取當前頁面的用戶權限
 */
export function useAccess() {
  const { access }: UserAccessModelState = useSelector(
    (state: any) => state.userAccess,
  );
  return access;
}

/**
 * 受廠區和部門影響的方法 類似 useEffect
 * @param callback 回調方法
 * @param effectValues 其他受影響的數據
 */
export function useFactory(
  callback: React.EffectCallback,
  effectValues?: React.DependencyList,
) {
  const userAccess = useSelector((state: any) => state.userAccess);
  if (!effectValues) effectValues = [];
  useEffect(callback, [...effectValues, userAccess.deptNo, userAccess.factory]);
}

/**
 * 獲取當前用戶信息
 * @member access 當前地址的權限
 * @member deptNo 部門代碼
 * @member factory 廠區
 * @member childMenu 當前地址下的子菜單
 * @member name 用戶名
 * @member empNo 工號
 */
export function useUser() {
  const { access, deptNo, factory, childMenu } = useSelector(
    (state: any) => state.userAccess,
  );
  const { initialState } = useModel('@@initialState');
  const { user }: any = initialState;
  return { ...user, access, deptNo, factory, childMenu };
}
