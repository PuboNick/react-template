import React, { FC } from 'react';
import { useDispatch, UserAccessModelState, useSelector } from 'umi';
import { Select } from 'antd';

const { Option } = Select;

const UserDepartment = () => {
  const userAccess: UserAccessModelState = useSelector(
    (dva: any) => dva.userAccess,
  );
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

export default UserDepartment;
