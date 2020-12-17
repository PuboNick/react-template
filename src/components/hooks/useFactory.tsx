import React, { useEffect } from 'react';
import { useSelector } from 'umi';

/**
 * 受廠區和部門影響的方法 類似 useEffect
 * @param callback 回調方法
 * @param effectValues 其他受影響的數據
 */
export default function useFactory(
  callback: React.EffectCallback,
  effectValues?: React.DependencyList,
) {
  const userAccess = useSelector((state: any) => state.userAccess);
  if (!effectValues) effectValues = [];
  useEffect(callback, [...effectValues, userAccess.deptNo, userAccess.factory]);
}
