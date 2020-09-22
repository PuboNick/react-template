import React, { useEffect } from 'react';
import { useSelector } from 'umi';

export default function useFac(
  callback: React.EffectCallback,
  effectValues?: React.DependencyList,
) {
  const userAccess = useSelector((state: any) => state.userAccess);
  if (!effectValues) effectValues = [];
  useEffect(callback, [...effectValues, userAccess.deptNo, userAccess.factory]);
}
