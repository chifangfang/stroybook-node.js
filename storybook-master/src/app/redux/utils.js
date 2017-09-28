import { CREAM_API } from './constants';

export function makeActionCreator(callback) {
  return function (...args) {
    const action = callback(...args);
    const typeStart = `${action.type}_START`;
    const typeSuccess = `${action.type}_SUCCESS`;
    const typeFailure = `${action.type}_FAILURE`;
    const types = [typeStart, typeSuccess, typeFailure];

    action.types = types;
    return { [CREAM_API]: { ...action } };
  };
}


export const createReducer = (initialState, ...handlers) => {
  let _handlers = {};
  handlers.forEach((handler) => {
    _handlers = Object.assign(_handlers, handler);
  });
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(_handlers, action.type)) {
      return _handlers[action.type](state, action);
    }
    return state;
  };
};

export const buildAsyncState = (type, initialState) => {
  const startType = `${type}_START`;
  const succesType = `${type}_SUCCESS`;
  const failureType = `${type}_FAILURE`;
  return {
    [startType](state) {
      return {
        ...state,
        ...initialState,
      };
    },
    [succesType](state, action) {
      return {
        ...state,
        [Object.keys(initialState)[0]]: action.data,
      };
    },
    [failureType](state) {
      return {
        ...state,
        ...initialState,
      };
    },
  };
};
