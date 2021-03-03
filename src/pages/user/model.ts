import { Effect } from './../../.umi/plugin-dva/connect';
import { Reducer, Subscription } from 'umi';

import bootstrap from '@/system/bootstrap';
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
  };
  effects: {
    setAccess: Effect;
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
  effects: {
    *setAccess({ payload }, { put, call }) {
      const { access, childMenu } = yield call(
        getAccessByPathName,
        payload.pathname,
      );
      yield put({ type: 'save', payload: { access, childMenu } });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'setAccess', payload: { pathname } });
        bootstrap.handle('historyChange', pathname);
      });
    },
  },
};

export default UserAccessModel;
