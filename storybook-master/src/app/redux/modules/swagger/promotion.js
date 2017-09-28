import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_ADMIN_BUILDING_GROUP = 'promotion/GET_ADMIN_BUILDING_GROUP';
export const POST_ADMIN_BUILDING_GROUP = 'promotion/POST_ADMIN_BUILDING_GROUP';
export const POST_ADMIN_BUILDING_GROUP_BUILDINGS = 'promotion/POST_ADMIN_BUILDING_GROUP_BUILDINGS';
export const DELETE_ADMIN_BUILDING_GROUP_BUILDINGS_ID = 'promotion/DELETE_ADMIN_BUILDING_GROUP_BUILDINGS_ID';
export const PUT_ADMIN_BUILDING_GROUP_BUILDINGS_ID = 'promotion/PUT_ADMIN_BUILDING_GROUP_BUILDINGS_ID';
export const POST_ADMIN_BUILDING_IMAGES = 'promotion/POST_ADMIN_BUILDING_IMAGES';
export const POST_ADMIN_BUILDING_GROUP_ID = 'promotion/POST_ADMIN_BUILDING_GROUP_ID';
export const GET_ADMIN_BUILDING_GROUP_ID = 'promotion/GET_ADMIN_BUILDING_GROUP_ID';
export const PUT_ADMIN_BUILDING_GROUP_ID = 'promotion/PUT_ADMIN_BUILDING_GROUP_ID';
export const GET_ADMIN_CREAMS_BUILDINGS_NAME = 'promotion/GET_ADMIN_CREAMS_BUILDINGS_NAME';

const initialState = {
  housesDetail: {},
  housesList: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_ADMIN_BUILDING_GROUP_ID, { housesDetail: {} }),
  buildAsyncState(GET_ADMIN_BUILDING_GROUP, { housesList: [] }),
  buildAsyncState(GET_ADMIN_CREAMS_BUILDINGS_NAME, { creamsName: [] }),

);
// cityId=${param.cityId}&areaId=${param.areaId}&keyword=${param.keyword}&
// 楼盘字典列表
export const getAdminBuildingGroup = makeActionCreator(query => ({
  type: GET_ADMIN_BUILDING_GROUP,
  method: 'GET',
  url: 'admin/building-groups',
  query,
}));
// 新建楼盘字典
export const postAdminBuildingGroup = makeActionCreator((body, success) => ({
  type: POST_ADMIN_BUILDING_GROUP,
  method: 'POST',
  url: 'admin/building-groups',
  body,
  success,
}));
// 新建楼宇
export const postAdminBuildingGroupBuildings = makeActionCreator(body => ({
  type: POST_ADMIN_BUILDING_GROUP_BUILDINGS,
  method: 'POST',
  url: 'admin/building-groups/buildings',
  body,
}));
// 删除/停用楼宇
export const deleteAdminBuildingGroupBuildingsId = makeActionCreator(id => ({
  type: DELETE_ADMIN_BUILDING_GROUP_BUILDINGS_ID,
  method: 'DELETE',
  url: `admin/building-groups/buildings/${id}`,
}));
// 修改楼宇
export const putAdminBuildingGroupBuildingsId = makeActionCreator((id, body) => ({
  type: PUT_ADMIN_BUILDING_GROUP_BUILDINGS_ID,
  method: 'PUT',
  url: `admin/building-groups/buildings/${id}`,
  body,
}));
// 编辑楼宇图片
export const postAdminBuildingGroupImages = makeActionCreator(body => ({
  type: POST_ADMIN_BUILDING_IMAGES,
  method: 'POST',
  url: 'admin/building-groups/images',
  body,
}));
// 删除/停用楼盘
export const postAdminBuildingGroupId = makeActionCreator((id, success, query) => ({
  type: POST_ADMIN_BUILDING_GROUP_ID,
  method: 'POST',
  url: `admin/building-groups/${id}`,
  success,
  query,
}));
// 获取楼盘详情
export const getAdminBuildingGroupId = makeActionCreator((id, success) => ({
  type: GET_ADMIN_BUILDING_GROUP_ID,
  method: 'GET',
  url: `admin/building-groups/${id}`,
  success,
}));
// 修改楼盘信息
export const putAdminBuildingGroupId = makeActionCreator((id, body, success) => ({
  type: PUT_ADMIN_BUILDING_GROUP_ID,
  method: 'PUT',
  url: `admin/building-groups/${id}`,
  body,
  success,
}));
// 查询楼宇名称在CREMAS中是否存在
export const getAdminCreamsBuildingsName = makeActionCreator((name, success) => ({
  type: GET_ADMIN_CREAMS_BUILDINGS_NAME,
  method: 'GET',
  url: `admin/creams/buildings/${name}`,
  success,
}));
