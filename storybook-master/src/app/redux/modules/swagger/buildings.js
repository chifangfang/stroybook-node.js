import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_BUIDLING_BUILDINGID_DETAIL = 'buildings/GET_BUIDLING_BUILDINGID_DETAIL';
export const GET_BUILDING_GROUPS_FEEDBACK = 'buildings/GET_BUILDING_GROUPS_FEEDBACK';
export const PUT_BUILDING_GROUPS_FEEDBACK_ID = 'buildings/PUT_BUILDING_GROUPS_FEEDBACK_ID';
export const GET_BUILDINGS_APPLY = 'buildings/GET_BUILDINGS_APPLY';
export const DELETE_BUILDINGS_APPLY = 'buildings/DELETE_BUILDINGS_APPLY';

export const GET_BUILDINGS = 'buildings/GET_BUILDINGS';
export const POST_BUILDINGS = 'buildings/POST_BUILDINGS';
export const GET_BUILDINGS_EXPORT = 'buildings/GET_BUILDINGS_EXPORT';
export const DELETE_BUILDINGS_BY_ID_ROOM = 'buildings/DELETE_BUILDINGS_BY_ID_ROOM';
export const PUT_BUILDING_BY_ID_ACTIVE = 'buildings/PUT_BUILDING_BY_ID_ACTIVE';
export const PUT_BUILDING_BY_ID_AREASIZE = 'buildings/PUT_BUILDING_BY_ID_AREASIZE';
export const POST_BUILDINGS_BY_ID_ROOMS = 'buildings/POST_BUILDINGS_BY_ID_ROOMS';
export const GET_BUILDINGS_BY_ID = 'buildings/GET_BUILDINGS_BY_ID';
export const PUT_BUILDINGS_BY_ID = 'buildings/PUT_BUILDINGS_BY_ID';
export const GET_BUILDINGS_BY_ID_ROOMS = 'buildings/GET_BUILDINGS_BY_ID_ROOMS';
export const GET_BUILDINGS_STATISTICS = 'buildings/GET_BUILDINGS_STATISTICS';

const initialState = {
  buildingDetail: {},
  buildingFeedback: {},
  buildingsApply: [],
  buildingsList: {},
  export: {},
  buildingById: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_BUIDLING_BUILDINGID_DETAIL, { buildingDetail: {} }),
  buildAsyncState(GET_BUILDING_GROUPS_FEEDBACK, { buildingFeedback: {} }),
  buildAsyncState(GET_BUILDINGS_APPLY, { buildingsApply: [] }),
  buildAsyncState(GET_BUILDINGS, { buildingsList: {} }),
  buildAsyncState(GET_BUILDINGS_EXPORT, { export: {} }),
  buildAsyncState(GET_BUILDINGS_BY_ID, { buildingById: {} }),
  buildAsyncState(GET_BUILDINGS_STATISTICS, { headerStatics: {} }),
);


// 楼盘详情
export const getBuildingBuildingIdDetail = makeActionCreator(buildingId => ({
  type: GET_BUIDLING_BUILDINGID_DETAIL,
  method: 'GET',
  url: `buildings/${buildingId}/detail`,
}));

// 报错反馈列表
export const getBuildingGroupsFeedback = makeActionCreator(query => ({
  type: GET_BUILDING_GROUPS_FEEDBACK,
  method: 'GET',
  url: 'building-groups/feedback',
  query,
}));

// 处理房源报错反馈
export const putBuildingGroupsFeedbackId = makeActionCreator((id, success) => ({
  type: PUT_BUILDING_GROUPS_FEEDBACK_ID,
  method: 'PUT',
  url: `building-groups/feedback/${id}`,
  success,
}));

// 查询楼盘入驻申请列表
export const getBuildingsApply = makeActionCreator(query => ({
  type: GET_BUILDINGS_APPLY,
  method: 'GET',
  url: 'buildings/apply',
  query,
}));
// 删除楼盘入驻申请
export const deleteBuildingsApply = makeActionCreator((query, success) => ({
  type: DELETE_BUILDINGS_APPLY,
  method: 'DELETE',
  url: 'buildings/apply',
  query,
  success,
}));

// 楼宇列表
export const getBuildings = makeActionCreator(query => ({
  type: GET_BUILDINGS,
  method: 'GET',
  url: 'buildings',
  query,
}));
// 楼宇列表头部数据
export const getBuildingsStatistics = makeActionCreator(query => ({
  type: GET_BUILDINGS_STATISTICS,
  method: 'GET',
  url: 'buildings/statistics',
  query,
}));
// 给客户创建新楼盘
export const postBuildings = makeActionCreator((body, success) => ({
  type: POST_BUILDINGS,
  method: 'POST',
  url: 'buildings',
  body,
  success,
}));
// 导出正式客户excel
export const getBuildingsExport = makeActionCreator((query, success) => ({
  type: GET_BUILDINGS_EXPORT,
  method: 'GET',
  url: 'buildings/export',
  success,
  query,
}));
// 清空楼盘下房源
export const deleteBuildingsRoom = makeActionCreator((id, success) => ({
  type: DELETE_BUILDINGS_BY_ID_ROOM,
  method: 'DELETE',
  url: `buildings/${id}/room`,
  success,
}));
// 修改楼盘启用状态
export const putBuildingsByIdActive = makeActionCreator((id, body, success) => ({
  type: PUT_BUILDING_BY_ID_ACTIVE,
  method: 'PUT',
  url: `buildings/${id}/active`,
  body,
  success,
}));
// 重新计算并保存楼盘面积
export const putBuildingsByIdAreaSize = makeActionCreator((id, success) => ({
  type: PUT_BUILDING_BY_ID_ACTIVE,
  method: 'PUT',
  url: `buildings/${id}/areaSize`,
  success,
}));
// 导入房源
export const postBuildingsByIdRooms = makeActionCreator((id, file, success) => ({
  type: POST_BUILDINGS,
  method: 'POST',
  url: `buildings/${id}/rooms`,
  file,
  success,
}));
// 楼盘详情
export const getBuildingsById = makeActionCreator(id => ({
  type: GET_BUILDINGS_BY_ID,
  method: 'GET',
  url: `buildings/${id}`,
}));
// 更新楼盘
export const putBuildingsById = makeActionCreator((id, body, success) => ({
  type: PUT_BUILDINGS_BY_ID,
  method: 'PUT',
  url: `buildings/${id}`,
  body,
  success,
}));
// 楼盘房源列表
export const getBuildingsByIdRooms = makeActionCreator((id, success) => ({
  type: GET_BUILDINGS_BY_ID_ROOMS,
  method: 'GET',
  url: `buildings/${id}/rooms`,
  success,
}));
