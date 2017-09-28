// import 'whatwg-fetch'
// console.log(process);
// 说明webpack并不是将环境变量添加到游览器的全局变量，而是单纯把代码中的相关环境变量给替换了
import jwt from 'jsonwebtoken';
import combineParam from 'static/js/combine-param';
import checkFun from 'static/js/check-function';

const API_URL = process.env.api_url;


// parse begin
function parseJwt(token) {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });
  return decodedToken.payload;
}
function parseJSON(response) {
  return response.json();
}

function parseTEXT(response) {
  return response.text();
}

function parseReponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType) {
    if (contentType.indexOf('application/json') !== -1) {
      return parseJSON(response);
    }
    if (contentType.indexOf('text/plain') !== -1) {
      return parseTEXT(response);
    }
  } else {
    return null;
  }
  return null;
}
// end
export function saveToken(response) {
  const localStorage = window.localStorage;
  localStorage.accessToken = response.accessToken;
  localStorage.refreshToken = response.refreshToken;
  localStorage.tokenExp = parseJwt(response.accessToken).exp;
  console.log('token is save');
}
// check begin
function checkToken(originUrl) {
  const nowadays = new Date().getTime();
  const { refreshToken } = window.localStorage;
  const tokenExp = window.localStorage.getItem('tokenExp');
  if ((tokenExp * 1000) - nowadays < 10000 || tokenExp === 'undefined') {
    console.warn('update token');
    return fetch(`${originUrl}users/refresh-token`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        clientId: 'web_app',
        refreshToken,
      }),
    }).then((response) => {
      if (response.accessToken) {
        const res = parseJSON(response);
        saveToken(res);
        return res;
      }
      // window.location.href='/'
      console.warn('back to index');
      window.location.pathname = '/';
      window.localStorage.clear();
      return Promise.reject('Timeout!');
    });
  }
  return new Promise((resolve) => {
    resolve();
  });
}
function checkMethod(method) {
  if (!method) {
    return console.warn('未发现method参数，请检查!');
  }
  return null;
}
function checkUrl(url) {
  if (!url) {
    return console.warn('未发现url参数，请检查!');
  }
  return null;
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return new Promise((resolve, reject) => {
    reject(response);
  });
}
// end

// 跑自动化测试用的div
function addErrorDom(err) {
  const box = document.querySelector('.errorMsgHiddenBox');
  if (box) {
    box.setAttribute('data-err', err);
  } else {
    const newbox = document.createElement('div');
    newbox.setAttribute('class', 'errorMsgHiddenBox');
    newbox.setAttribute('data-err', err);
    // newbox.innerHTML = err;
    document.querySelector('body').appendChild(newbox);
  }
}

export default function action({
  orginUrl = API_URL,
  body,
  url,
  config,
  method,
  query,
  nonuseToken = false,
  success,
  failure,
  file,
}) {
  const conf = config || file ? {} : { headers: {
    'Content-Type': file ? 'multipart/form-data' : 'application/json',
  } };
  checkMethod(method);
  checkUrl(url);
  checkFun(success);
  if (!nonuseToken) {
    return checkToken(orginUrl).then(
      () => {
        const token = localStorage.getItem('accessToken') || null;
        conf.headers = Object.assign({}, conf.headers, {
          Authorization: `Bearer ${token}`,
        });
        return fetch(`${orginUrl}${url}${combineParam(query)}`, Object.assign({}, conf, {
          method,
          body: file || JSON.stringify(body),
        }))
            .then(checkStatus)
            .then(parseReponse)
            .then((data) => {
              console.log('request succeeded with JSON response', data);
              if (success) {
                success(data);
              }
              return data;
            })
            .catch((error) => {
              error.json().then((err) => {
                let myError = err.error;
                if (err.error === '用户数据不正确') {
                  myError = '登录超时，为了您的账户安全，请重新登录';
                }
                addErrorDom(myError);
                alert(myError);
              });
              console.log('request failed', error);
              if (failure) {
                failure();
              }
              return error;
            });
      }, (err) => { console.error(err); },
    );
  }
  return fetch(`${orginUrl}${url}${combineParam(query)}`, Object.assign({}, conf, {
    method,
    body: file || JSON.stringify(body),
  }))
        .then(checkStatus)
        .then(parseReponse)
        .then((data) => {
          console.log('request succeeded with JSON response', data);
          if (success) {
            success(data);
          }
          return data;
        })
        .catch((error) => {
          error.json().then((err) => {
            let myError = err.error;
            if (err.error === '用户数据不正确') {
              myError = '登录超时，为了您的账户安全，请重新登录';
            }
            addErrorDom(myError);
            alert(myError);
          });
          console.log('request failed', error);
          if (failure) {
            failure();
          }
          return error;
        });
}
