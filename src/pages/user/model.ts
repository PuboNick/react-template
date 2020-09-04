import { Reducer, Subscription } from 'umi';
import { getAccessById } from './userService';

export interface UserAccessModelState {
  access: any;
  factory: string;
  deptNo: string;
  deptList: any;
}

export interface UserAccessModelType {
  namespace: 'userAccess';
  state: UserAccessModelState;
  reducers: {
    save: Reducer<UserAccessModelState>;
    setAccess: Reducer<UserAccessModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserAccessModel: UserAccessModelType = {
  namespace: 'userAccess',
  state: {
    access: {},
    deptList: [],
    factory: '',
    deptNo: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setAccess(state: any, action) {
      let access = getAccessById(action.payload.pathname);
      return { ...state, access };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'setAccess', payload: { pathname } });
      });
    },
  },
};

export default UserAccessModel;
