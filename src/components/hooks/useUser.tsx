import { useModel, useSelector } from 'umi';

/**
 * 獲取當前用戶信息
 * @member access 當前地址的權限
 * @member deptNo 部門代碼
 * @member factory 廠區
 * @member childMenu 當前地址下的子菜單
 * @member name 用戶名
 * @member empNo 工號
 */
export default function useUser() {
  const { access, deptNo, factory, childMenu } = useSelector(
    (state: any) => state.userAccess,
  );
  const { initialState } = useModel('@@initialState');
  const { user }: any = initialState;
  return { ...user, access, deptNo, factory, childMenu };
}
