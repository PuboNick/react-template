import React, { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
import { DatePicker } from 'antd';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const { name } = index;
  return (
    <div>
      <DatePicker /> {name}
    </div>
  );
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(IndexPage);
