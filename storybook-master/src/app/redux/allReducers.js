import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ReducerForForm } from '../baseComponents/Form/actions/action';
import buildings from './modules/swagger/buildings';
import common from './modules/swagger/common';
import users from './modules/swagger/users';
import promotion from './modules/swagger/promotion';
// import dialog from 'app/redux/modules/global/dialog';
// import snackbar from 'app/redux/modules/global/snackbar';
import global from './modules/global/global';
import jwtInfo from './modules/global/jwtInfo';
import account from './modules/swagger/account';
import customers from './modules/swagger/customers';

import demands from './modules/swagger/demands';
import operations from './modules/swagger/operations';
import operation from './modules/swagger/operation';
import statistics from './modules/swagger/statistics';

export default combineReducers({
  router: routerReducer,
  ReducerForForm,
  buildings,
  common,
  users,
  promotion,
  demands,
  operations,
  operation,
  global,
  jwtInfo,
  account,
  customers,
  statistics,
});
