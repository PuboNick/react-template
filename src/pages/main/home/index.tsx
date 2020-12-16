import React, { FC } from 'react';
import { IndexModelState, useSelector } from 'umi';

const IndexPage: FC = () => {
  const index: IndexModelState = useSelector((state: any) => state.index);
  return <div style={{ width: '100%', height: '100vh' }}>Home page</div>;
};

export default IndexPage;
