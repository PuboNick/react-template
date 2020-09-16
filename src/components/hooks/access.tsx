import { UserAccessModelState, useSelector } from 'umi';

export default function useAccess() {
  const { access }: UserAccessModelState = useSelector(
    (state: any) => state.userAccess,
  );
  return access;
}
