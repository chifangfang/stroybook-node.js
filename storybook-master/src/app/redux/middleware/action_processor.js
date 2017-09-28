import fetch from '../fetch';
import { CREAM_API } from '../constants';

const ActionMap = {};
const UrlLockMap = [];

export default store => next => (action) => {
  const creamAPI = action[CREAM_API];
  if (typeof creamAPI === 'undefined') {
    return next(action);
  }
  const {
    // orginUrl,
    types,
    body,
    url,
    file,
    formData,
    config,
    method,
    query,
    nonuseToken,
    success,
    failure,
    noInit,
  } = creamAPI;
  const [startType, successType, errorType] = types;

  const timestamp = Date.now();
  const actionKey = successType;

  // 默认清空原来相关action的值
  if (!noInit) {
    try {
      next({
        data: {},
        type: startType,
      });
    } catch (e) { console.warn(e); }
  }

  const lockKey = JSON.stringify(creamAPI);
  if (UrlLockMap.includes(lockKey)) {
    return null;
  }
  UrlLockMap.push(lockKey);

  function resDo(res, ts) {
    const lockKey = JSON.stringify(creamAPI);
    const lockKeyIndex = UrlLockMap.indexOf(lockKey);
    if (lockKeyIndex !== -1) {
      UrlLockMap.splice(lockKeyIndex, 1);
    }
  }
  (function (ts) {
    fetch({
      url,
      method,
      config,
      nonuseToken,
      body,
      file,
      formData,
      query,
      success,
      failure,
    }).then((response) => {
      next({
        data: response,
        type: successType,
      });
      resDo(response, ts);
    }, (error) => {
      next({
        error: error.error,
        type: errorType,
      });
      resDo(error, ts);
    });
  }(timestamp));
};
