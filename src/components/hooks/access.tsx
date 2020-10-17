import { UserAccessModelState, useSelector } from 'umi';

/**
 * 獲取當前頁面的用戶權限
 */
export default function useAccess() {
  const { access }: UserAccessModelState = useSelector(
    (state: any) => state.userAccess,
  );
  return access;
}
