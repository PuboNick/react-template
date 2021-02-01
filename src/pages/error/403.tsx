import React from 'react';

import { Result, Button } from 'antd';
import bootstrap from '@/plugins/bootstrap';

const ErrorPage403 = () => {
  return (
    <Result
      status="403"
      title="403,無權訪問"
      subTitle={
        <div>
          對不起你沒有權限訪問該頁面，請聯繫管理員。
          <br />
          <Button type="primary" onClick={() => bootstrap.handle('loginOut')}>
            切換賬號
          </Button>
        </div>
      }
    ></Result>
  );
};

export default ErrorPage403;
