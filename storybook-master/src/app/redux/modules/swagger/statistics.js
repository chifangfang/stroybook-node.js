import {
  makeActionCreator,
  createReducer,
  buildAsyncState,
} from '../../utils';

export const GET_BUILDING_ASSETS_STATISTICS = 'statistics/GET_BUILDING_ASSETS_STATISTICS';
export const GET_BUILDING_TYPE_STATISTICS = 'statistics/GET_BUILDING_TYPE_STATISTICS';
export const GET_CITY_STATISTICS = 'statistics/GET_CITY_STATISTICS';
export const GET_CUSTOMER_TYPE_STATISTICS = 'statistics/GET_CUSTOMER_TYPE_STATISTICS';
export const GET_CUSTOMERS_LOGIN_STATISTICS = 'statistics/GET_CUSTOMERS_LOGIN_STATISTICS';
export const GET_AVERAGE_DATA = 'statistics/GET_AVERAGE_DATA';
export const GET_REMIAN_RATE = 'statistics/GET_REMIAN_RATE';
export const GET_PERDAYDATA = 'statistic/GET_PERDAYDATA';
export const GET_TRANSFORMDATA = 'statistic/GET_TRANSFORMDATA';

const initialState = {
  buildingAssets: {},
  buildingType: {},
  city: {},
  customerType: {},
  customersLogin: {},
};

export default createReducer(initialState,
  buildAsyncState(GET_BUILDING_ASSETS_STATISTICS, { buildingAssets: {} }),
  buildAsyncState(GET_BUILDING_TYPE_STATISTICS, { buildingType: {} }),
  buildAsyncState(GET_CITY_STATISTICS, { city: [] }),
  buildAsyncState(GET_CUSTOMER_TYPE_STATISTICS, { customerType: {} }),
  buildAsyncState(GET_CUSTOMERS_LOGIN_STATISTICS, { customersLogin: {} }),
  buildAsyncState(GET_AVERAGE_DATA, { averageData: {} }),
  buildAsyncState(GET_REMIAN_RATE, { remainRate: [] }),
  buildAsyncState(GET_PERDAYDATA, { perDayData: {} }),
  buildAsyncState(GET_TRANSFORMDATA, { transformData: {} }),
);

// 转化量
export const getTransformData = makeActionCreator((startDate, endDate) => ({
  type: GET_TRANSFORMDATA,
  method: 'GET',
  url: `admin/agents/statistic/transformData?startDate=${startDate}&endDate=${endDate}`,
}));

// 每日活跃用户 ， 注册用户 - 折线图
export const getPerDayData = makeActionCreator((startDate, endDate) => ({
  type: GET_PERDAYDATA,
  method: 'GET',
  url: `admin/agents/statistic/perDayData?startDate=${startDate}&endDate=${endDate}`,
}));


// 留存数据分析
export const getRemainRate = makeActionCreator((startDate, endDate) => ({
  type: GET_REMIAN_RATE,
  method: 'GET',
  url: `admin/agents/statistic/remainRate?startDate=${startDate}&endDate=${endDate}`,
}));

// 日均数据
export const getAverageData = makeActionCreator((startDate, endDate) => ({
  type: GET_AVERAGE_DATA,
  method: 'GET',
  url: `admin/agents/statistic/averageData?startDate=${startDate}&endDate=${endDate}`,
}));

// 楼宇资产属性饼图
export const getBuildingAssetsStatistics = makeActionCreator(query => ({
  type: GET_BUILDING_ASSETS_STATISTICS,
  method: 'GET',
  url: 'building-assets/statistics',
  query,
}));
// 楼宇类型饼图
export const getBuildingTypeStatistics = makeActionCreator(query => ({
  type: GET_BUILDING_TYPE_STATISTICS,
  method: 'GET',
  url: 'building-type/statistics',
  query,
}));
// 城市统计饼图
export const getCityStatistics = makeActionCreator(query => ({
  type: GET_CITY_STATISTICS,
  method: 'GET',
  url: 'city/statistics',
  query,
}));
// 客户类型统计饼图
export const getCustomerTypeStatistics = makeActionCreator(query => ({
  type: GET_CUSTOMER_TYPE_STATISTICS,
  method: 'GET',
  url: 'customer-type/statistics',
  query,
}));
// 所有登录数据统计（creams客户下统计图表）
export const getCustomersLoginStatistics = makeActionCreator(query => ({
  type: GET_CUSTOMERS_LOGIN_STATISTICS,
  method: 'GET',
  url: 'customers/login-statistics',
  query,
}));
