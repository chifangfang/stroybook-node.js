import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_FILTER = 'operations/GET_FILTER';

const initialState = {
  filters: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_FILTER, { filters: {} }),
);

// 需求列表
export const getFilter = makeActionCreator((query, success) => ({
  type: GET_FILTER,
  method: 'GET',
  url: 'filter',
  success,
  query,
}));
