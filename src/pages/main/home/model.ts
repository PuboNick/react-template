import constants from '@/plugins/constants';
import { Effect, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  pdfUrl: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    pdfUrl: constants.BASE_URL + 'documents/JavaScript高級程序設計4版.pdf',
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/home') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
