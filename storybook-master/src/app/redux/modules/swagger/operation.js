import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_OPERATION_CITIES_AREAS = 'operation/GET_OPERATION_CITIES_AREAS';

const initialState = {
  cityAndArea: [],
};

export default createReducer(initialState,
  buildAsyncState(GET_OPERATION_CITIES_AREAS, { cityAndArea: [] }),
);

// 需求列表
export const getOptionCitiesAreas = makeActionCreator(success => ({
  type: GET_OPERATION_CITIES_AREAS,
  method: 'GET',
  url: 'operation/cities-areas',
  success,
}));
