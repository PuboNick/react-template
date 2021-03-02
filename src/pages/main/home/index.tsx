import React, { FC } from 'react';

import bootstrap from '@/system/bootstrap';

const IndexPage: FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={() => bootstrap.handle('loginOut')}>login out</button>
    </div>
  );
};

export default IndexPage;
