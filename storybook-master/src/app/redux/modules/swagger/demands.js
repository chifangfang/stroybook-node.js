import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_DEMANDS = 'demands/GET_DEMANDS';
export const GET_DEMANDS_ID_INVALID = 'demands/GET_DEMANDS_ID_INVALID';

const initialState = {
  demandList: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_DEMANDS, { demandList: {} }),
);

// 需求列表
export const getDemands = makeActionCreator((query, success) => ({
  type: GET_DEMANDS,
  method: 'GET',
  url: 'demands',
  success,
  query,
}));

// 需求列表
export const getDemandsIdInvalid = makeActionCreator((id, success) => ({
  type: GET_DEMANDS_ID_INVALID,
  method: 'POST',
  url: `demands/${id}/invalid`,
  success,
}));
