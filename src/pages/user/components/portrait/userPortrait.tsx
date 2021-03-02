import React, { FC } from 'react';
import { Avatar } from 'antd';
import constants from '@/system/constants';
import { useModel } from 'umi';

interface UserPortraitProps {
  size?: number;
}

const UserPortrait: FC<UserPortraitProps> = ({ size = 40 }) => {
  const { initialState } = useModel('@@initialState');
  const { user }: any = initialState;
  return (
    <Avatar
      style={{ overflow: 'hidden' }}
      src={constants.PORTRAIT_URI + user.empNo}
      size={size}
    />
  );
};

export default UserPortrait;
