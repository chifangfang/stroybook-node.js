import combineParam from 'static/js/combine-param';
import fetch from '../fetch';
import { CREAM_API } from '../constants';

let alreadyToRefresh = false; // 如果已经去请求新token,先不让其他action发送
const actionBox = []; // 用来保存token刷新期间触发的action

export default store => next => (action) => {
  // 如果action不是向服务器发送或不需要token验证的，直接到下一个中间件
  if (!action[CREAM_API] || action[CREAM_API].nonuseToken) {
    next(action);
  }
  const { refreshToken } = window.localStorage;
  const nowadays = new Date().getTime();
  let tokenTime = nowadays;
  try {
    tokenTime = window.localStorage.getItem('tokenExp') * 1000;
  } catch (e) { console.log(e); }
  if (nowadays - tokenTime > 10000 && window.location.pathname !== '/') {
    actionBox.push(action);
    if (!alreadyToRefresh) {
      alreadyToRefresh = true;
      console.log('token refresh begin');
      fetch({
        url: 'users/refresh-token',
        method: 'POST',
        body: {
          clientId: 'web_app',
          refreshToken,
        },
        nonuseToken: true,
      }).then((data) => {
        alreadyToRefresh = false;
        const localStorage = window.localStorage;
        if (data.accessToken) {
          localStorage.accessToken = data.accessToken;
          localStorage.refreshToken = data.refreshToken;
          localStorage.tokenExp = combineParam(data.accessToken).exp;

          // 如果页面是重新打开，就把用户信息请求出来
          next({
            type: 'user/USER_LOGIN_SUCCESS',
            data,
          });

          // 讲保存的action逐个释放
          actionBox.map((act) => {
            console.log(action);
            next(act);
            return null;
          });
        } else {
          return Promise.reject(data);
        }
        return null;
      }).catch((err) => {
        if (err.ok === false) {
          console.warn('登录超时，请重新登录！');
          window.location.href = '/';
          window.localStorage.clear();
        }
      });
    }
  } else {
    return next(action);
  }
  return null;
};
