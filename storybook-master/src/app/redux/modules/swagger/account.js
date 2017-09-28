import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_DEPARTMENTS = 'account/GET_DEPARTMENTS';
export const POST_DEPARTMENTS = 'account/POST_DEPARTMENTS';
export const GET_DEPARTMENTS_LOWER_LEVEL = 'account/GET_DEPARTMENTS_LOWER_LEVEL';
export const DELETE_DEPARTMENTS_BY_ID = 'account/DELETE_DEPARTMENTS_BY_ID';
export const PUT_DEPARTMENTS_BY_ID = 'account/PUT_DEPARTMENTS_BY_ID';
export const GET_DEPARTMENTS_BY_ID_MEMBER = 'account/GET_DEPARTMENTS_BY_ID_MEMBER';
export const POST_USERS = 'account/POST_USERS';
export const GET_USERS_BY_ID = 'account/GET_USERS_BY_ID';
export const PUT_USERS_BY_ID = 'account/PUT_USERS_BY_ID';
export const PUT_USERS_BY_ID_ACTIVE = 'account/PUT_USERS_BY_ID_ACTIVE';
export const DELETE_USERS_BY_ID = 'account/DELETE_USERS_BY_ID';
export const GET_USERS_FOLLOWS = 'account/GET_USERS_FOLLOWS';
export const POST_USERS_FORGET_PASSWORD = 'account/POST_USERS_FORGET_PASSWORD';
export const POST_USERS_MODIFY_PASSWORD = 'account/POST_USERS_MODIFY_PASSWORD';

const initialState = {
  departments: {},
  departmentsLowerLevel: {},
  member: {},
  userDetail: {},
  usersFollows: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_DEPARTMENTS, { departments: {} }),
  buildAsyncState(GET_DEPARTMENTS_LOWER_LEVEL, { departmentsLowerLevel: {} }),
  buildAsyncState(GET_DEPARTMENTS_BY_ID_MEMBER, { member: {} }),
  buildAsyncState(GET_USERS_BY_ID, { userDetail: {} }),
  buildAsyncState(GET_USERS_FOLLOWS, { usersFollows: {} }),
);

// 部门列表
export const getDepartments = makeActionCreator(() => ({
  type: GET_DEPARTMENTS,
  method: 'GET',
  url: 'departments',
}));

// 新建部门
export const postDepartments = makeActionCreator((body, success) => ({
  type: POST_DEPARTMENTS,
  method: 'POST',
  url: 'departments',
  body,
  success,
}));

// 获取下级部门，包括本部门
export const getDepartmentsLowerLevel = makeActionCreator(() => ({
  type: GET_DEPARTMENTS_LOWER_LEVEL,
  method: 'GET',
  url: 'departments/lower-level',
}));


// 删除部门
export const deleteDepartmentsById = makeActionCreator((id, success) => ({
  type: DELETE_DEPARTMENTS_BY_ID,
  method: 'DELETE',
  url: `departments/${id}`,
  success,
}));

// 更新部门名称
export const putDepartmentsById = makeActionCreator((id, body, success) => ({
  type: PUT_DEPARTMENTS_BY_ID,
  method: 'PUT',
  url: `departments/${id}`,
  body,
  success,
}));

// 通过部门id获取部门下所有用户
export const getDepartmentsByIdMember = makeActionCreator(id => ({
  type: GET_DEPARTMENTS_BY_ID_MEMBER,
  method: 'GET',
  url: `departments/${id}/member`,
}));

// 添加成员
export const postUsers = makeActionCreator((body, success) => ({
  type: POST_USERS,
  method: 'POST',
  url: 'users',
  body,
  success,
}));

// 用户详情
export const getUsersById = makeActionCreator(id => ({
  type: GET_USERS_BY_ID,
  method: 'GET',
  url: `users/${id}`,
}));

// 更新成员
export const putUsersById = makeActionCreator((id, body, success) => ({
  type: PUT_USERS_BY_ID,
  method: 'PUT',
  url: `users/${id}`,
  body,
  success,
}));

// 启用/禁用 用户
export const putUsersByIdActive = makeActionCreator((id, body, success) => ({
  type: PUT_USERS_BY_ID_ACTIVE,
  method: 'PUT',
  url: `users/${id}/active`,
  body,
  success,
}));

// 删除用户
export const deleteUsersById = makeActionCreator((id, success) => ({
  type: DELETE_USERS_BY_ID,
  method: 'DELETE',
  url: `users/${id}`,
  success,
}));

// 用户可管理部门中的所有人员,包括自己(跟进人列表,协助管理者列表)
export const getUsersFollows = makeActionCreator(() => ({
  type: GET_USERS_FOLLOWS,
  method: 'GET',
  url: 'users/follows',
}));

// 忘记密码
export const postUsersForgetPassword = makeActionCreator((body, success) => ({
  type: POST_USERS_FORGET_PASSWORD,
  method: 'POST',
  url: 'users/forget-password',
  body,
  success,
  nonuseToken: true,
}));

// 修改密码
export const postUsersModifyPassword = makeActionCreator((body, success) => ({
  type: POST_USERS_MODIFY_PASSWORD,
  method: 'POST',
  url: 'users/modify-password',
  body,
  success,
}));
