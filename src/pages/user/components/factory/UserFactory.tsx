import React, { FC, useEffect } from 'react';
import {
  connect,
  ConnectProps,
  useDispatch,
  useModel,
  UserAccessModelState,
} from 'umi';
import { Select } from 'antd';

const { Option } = Select;

export interface UserFactoryProps extends ConnectProps {
  userAccess: UserAccessModelState;
}

const UserFactory: FC<UserFactoryProps> = ({ userAccess }) => {
  const { initialState } = useModel('@@initialState');
  const { factoryList }: any = initialState;
  const dispatch = useDispatch();

  const getDefaultDept = (data: any) => {
    let factory = data.name;
    let deptList = data.deptList;
    let deptNo = deptList[0].name;
    return { factory, deptList, deptNo };
  };

  const onFactoryChange = (value: string) => {
    let res = factoryList.find((item: any) => item.name === value);
    let { factory, deptList, deptNo } = getDefaultDept(res);
    dispatch({
      type: 'userAccess/save',
      payload: { factory, deptList, deptNo },
    });
  };

  useEffect(() => {
    let { factory, deptList, deptNo } = getDefaultDept(factoryList[0]);
    dispatch({
      type: 'userAccess/save',
      payload: { factory, deptList, deptNo },
    });
  }, []);
  return (
    <Select
      value={userAccess.factory}
      style={{ width: 120 }}
      bordered={false}
      onChange={value => onFactoryChange(value)}
    >
      {factoryList.map((item: any) => (
        <Option key={item.id} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default connect(
  ({ userAccess }: { userAccess: UserAccessModelState }) => ({ userAccess }),
)(UserFactory);
