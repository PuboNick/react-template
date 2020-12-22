import bootstrap from '@/plugins/bootstrap';
import { Reducer, Subscription } from 'umi';
import { getAccessByPathName } from './userService';

export interface UserAccessModelState {
  access: any;
  childMenu: any[];
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
    childMenu: [],
    deptList: [],
    factory: '',
    deptNo: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setAccess(state: any, action) {
      let { access, childMenu } = getAccessByPathName(action.payload.pathname);
      return { ...state, access, childMenu };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'setAccess', payload: { pathname } });
        bootstrap.historyChange(pathname);
      });
    },
  },
};

export default UserAccessModel;
