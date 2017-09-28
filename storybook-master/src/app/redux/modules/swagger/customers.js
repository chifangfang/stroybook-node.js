
import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
export const POST_CUSTOMERS = 'customers/POST_CUSTOMERS';
export const GET_CUSTOMERS_FOLLOWS = 'customers/GET_CUSTOMERS_FOLLOWS';
export const GET_CUSTOMERS_BY_ID = 'customers/GET_CUSTOMERS_BY_ID';
export const GET_CUSTOMERS_EXPORT = 'customers/GET_CUSTOMERS_EXPORT';
export const GET_CUSTOMERS_STATISTICS = 'customers/GET_CUSTOMERS_STATISTICS';
export const PUT_CUSTOMERS_BY_ID = 'customers/PUT_CUSTOMERS_BY_ID';
export const GET_CUSTOMERS_BY_ID_STATISTICS = 'customers/GET_CUSTOMERS_BY_ID_STATISTICS';
export const PUT_CUSTOMERS_BY_ID_ACTIVE = 'customers/PUT_CUSTOMERS_BY_ID_ACTIVE';
export const GET_CUSTOMERS_BY_ID_LOGIN_STATISTICS = 'customers/GET_CUSTOMERS_BY_ID_LOGIN_STATISTICS';
export const GET_CUSTOMERS_USER_MANAGE = 'customers/GET_CUSTOMERS_USER_MANAGE';
export const GET_CUSTOMERS_BY_ID_SUB_ACCOUNTS = 'customers/GET_CUSTOMERS_BY_ID_SUB_ACCOUNTS';

const initialState = {
  customers: {},
  follows: {},
  customerDetail: {},
  statistics: {},
  export: {},
  customerStatistics: {},
  loginStatistics: {},
  userManage: {},
  subAccounts: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_CUSTOMERS, { customers: {} }),
  buildAsyncState(GET_CUSTOMERS_FOLLOWS, { follows: {} }),
  buildAsyncState(GET_CUSTOMERS_BY_ID, { customerDetail: {} }),
  buildAsyncState(GET_CUSTOMERS_EXPORT, { export: {} }),
  buildAsyncState(GET_CUSTOMERS_STATISTICS, { statistics: {} }),
  buildAsyncState(GET_CUSTOMERS_BY_ID_STATISTICS, { customerStatistics: {} }),
  buildAsyncState(GET_CUSTOMERS_BY_ID_LOGIN_STATISTICS, { loginStatistics: {} }),
  buildAsyncState(GET_CUSTOMERS_USER_MANAGE, { userManage: {} }),
  buildAsyncState(GET_CUSTOMERS_BY_ID_SUB_ACCOUNTS, { subAccounts: {} }),

);

// 正式客户列表
export const getCustomers = makeActionCreator(query => ({
  type: GET_CUSTOMERS,
  method: 'GET',
  url: 'customers',
  query,
}));

// 创建正式客户
export const postCustomers = makeActionCreator((body, success) => ({
  type: POST_CUSTOMERS,
  method: 'POST',
  url: 'customers',
  body,
  success,
}));

// 跟进人列表(用户可管理部门中的所有人员,包括自己)
export const getCustomersFollows = makeActionCreator(query => ({
  type: GET_CUSTOMERS_FOLLOWS,
  method: 'GET',
  url: 'users/follows',
  query,
}));

// 客户详情
export const getCustomersById = makeActionCreator(id => ({
  type: GET_CUSTOMERS_BY_ID,
  method: 'GET',
  url: `customers/${id}`,
}));

// 导出正式客户excel
export const getCustomersExport = makeActionCreator((query, success) => ({
  type: GET_CUSTOMERS_EXPORT,
  method: 'GET',
  url: 'customers/export',
  query,
  success,
}));

// 正式客户头部数据
export const getCustomersStatistics = makeActionCreator(() => ({
  type: GET_CUSTOMERS_STATISTICS,
  method: 'GET',
  url: 'customers/statistics',
}));

// 修改客户
export const putCustomersById = makeActionCreator((id, body, success) => ({
  type: PUT_CUSTOMERS_BY_ID,
  method: 'PUT',
  url: `customers/${id}`,
  body,
  success,
}));

// 客户详情统计数据
export const getCustomersByIdStatistics = makeActionCreator(id => ({
  type: GET_CUSTOMERS_BY_ID_STATISTICS,
  method: 'GET',
  url: `customers/${id}/statistics`,
}));


// 禁用/启用客户
export const putCustomersByIdActive = makeActionCreator((id, body, success) => ({
  type: PUT_CUSTOMERS_BY_ID_ACTIVE,
  method: 'PUT',
  url: `customers/${id}/active`,
  body,
  success,
}));

// 用户登录统计
export const getCustomerByIdLoginStatistics = makeActionCreator((id, query) => ({
  type: GET_CUSTOMERS_BY_ID_LOGIN_STATISTICS,
  method: 'GET',
  url: `customers/${id}/login-statistics`,
  query,
}));

// 可管理客户列表
export const getCustomerUserManage = makeActionCreator(() => ({
  type: GET_CUSTOMERS_USER_MANAGE,
  method: 'GET',
  url: 'customers/user-manage',
}));

// 客户子账号列表
export const getCustomersByIdSubAccounts = makeActionCreator(id => ({
  type: GET_CUSTOMERS_BY_ID_SUB_ACCOUNTS,
  method: 'GET',
  url: `customers/${id}/sub-accounts`,
}));
