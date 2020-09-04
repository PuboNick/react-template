import React, { FC } from 'react';
import {
  IndexModelState,
  ConnectProps,
  Loading,
  connect,
  UserAccessModelState,
  useSelector,
} from 'umi';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ index }) => {
  const { name } = index;
  const { access }: UserAccessModelState = useSelector(
    (state: any) => state.userAccess,
  );
  console.log(access);
  return <div>{name}</div>;
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(IndexPage);
