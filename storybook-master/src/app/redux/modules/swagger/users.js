import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_USERS_APPLICATION = 'users/GET_USERS_APPLICATION';
export const POST_USERS_LOGIN_REFRESH = 'users/POST_USERS_LOGIN_REFRESH';
export const POST_USERS_LOGIN = 'users/POST_USERS_LOGIN';
export const GET_USERS_PRE_ORDER = 'users/GET_USERS_PRE_ORDER';
export const POST_USERS_PRE_ORDER = 'users/POST_USERS_PRE_ORDER';
export const PUT_USERS_BY_ID_PRE_ORDER = 'users/PUT_USERS_BY_ID_PRE_ORDER';

const initialState = {
  isTelApply: false,
  usersPreOrder: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_USERS_APPLICATION, { isTelApply: false }),
  buildAsyncState(GET_USERS_PRE_ORDER, { usersPreOrder: {} }),
);

// 查询用户是否申请过使用
export const getUsersApplication = makeActionCreator(tel => ({
  type: GET_USERS_APPLICATION,
  method: 'GET',
  url: 'users/application',
  query: {
    tel,
  },
}));

// 联系我们

// 登录
export const postUsersLogin = makeActionCreator((body, success) => ({
  type: POST_USERS_LOGIN,
  method: 'POST',
  url: 'users/login',
  body,
  success,
  nonuseToken: true,
}));

// 刷新token
export const postUsersLoginRefresh = makeActionCreator(body => ({
  type: POST_USERS_LOGIN_REFRESH,
  method: 'POST',
  url: 'users/login/refresh',
  body,
}));

// 申请试用用户列表
export const getUsersPreOrder = makeActionCreator(query => ({
  type: GET_USERS_PRE_ORDER,
  method: 'GET',
  url: 'users/pre-order',
  query,
}));
// 创建注册客户
export const postUsersPreOrder = makeActionCreator((body, success) => ({
  type: POST_USERS_PRE_ORDER,
  method: 'POST',
  url: 'users/pre-order',
  body,
  success,
}));
// 修改注册客户
export const putUsersByIdPreOrder = makeActionCreator((id, body, success) => ({
  type: PUT_USERS_BY_ID_PRE_ORDER,
  method: 'PUT',
  url: `users/${id}/pre-order`,
  body,
  success,
}));
