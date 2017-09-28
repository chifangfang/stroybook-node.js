import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_COMMONS_UPLOAD_SIGNATURE = 'common/GET_COMMONS_UPLOAD_SIGNATURE';
export const GET_COMMONS_REGIONS_BLOCK = 'common/GET_COMMONS_REGIONS_BLOCK';
export const GET_COMMON_REGIONS = 'common/GET_COMMON_REGIONS';


const initialState = {
  signature: {},
  blocks: {},
  regions: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_COMMONS_UPLOAD_SIGNATURE, { signature: {} }),
  buildAsyncState(GET_COMMONS_REGIONS_BLOCK, { blocks: {} }),
  buildAsyncState(GET_COMMON_REGIONS, { regions: {} }),
);

// 请求授权图片上传
export const getCommonsUploadSignature = makeActionCreator(success => ({
  type: GET_COMMONS_UPLOAD_SIGNATURE,
  method: 'GET',
  url: 'commons/upload/signature',
  success,
}));

// 查出省市区商圈列表
export const getRegionsBlock = makeActionCreator(success => ({
  type: GET_COMMONS_REGIONS_BLOCK,
  method: 'GET',
  url: 'regions/block',
  success,
}));

// 查出省市区列表
export const getRegions = makeActionCreator(success => ({
  type: GET_COMMON_REGIONS,
  method: 'GET',
  url: 'regions',
  success,
}));
