import React, { FC } from 'react';
import { connect, ConnectProps, useDispatch, UserAccessModelState } from 'umi';
import { Select } from 'antd';

const { Option } = Select;

interface UserDepartmentProps extends ConnectProps {
  userAccess: UserAccessModelState;
}

const UserDepartment: FC<UserDepartmentProps> = ({ userAccess }) => {
  let { deptList } = userAccess;
  const dispatch = useDispatch();

  const onDeptChange = (value: string) => {
    let res = deptList.find((item: any) => item.name === value);
    dispatch({ type: 'userAccess/save', payload: { deptNo: res.name } });
  };
  return (
    <Select
      value={userAccess.deptNo}
      style={{ width: 120 }}
      bordered={false}
      onChange={value => onDeptChange(value)}
    >
      {deptList.map((item: any) => (
        <Option key={item.id} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default connect(
  ({ userAccess }: { userAccess: UserAccessModelState }) => ({ userAccess }),
)(UserDepartment);
