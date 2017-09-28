import * as types from '../ActionTypes';

function formDataLoad(val, name) {
  let formData = {};
  if (name) {
    formData[name] = val;
  } else {
    formData = val;
  }
  return {
    type: types.FORM_DATA_LOAD_TO_REDUX,
    formData,
  };
}

function formDataCLear(data) {
  return {
    type: types.FORM_DATA_CLEAR_TO_REDUX,
    data,
  };
}

function formDataRemove(name, index) {
  return {
    type: types.FORM_DATA_REMOVE_TO_REDUX,
    name,
    index,
  };
}

const initialState = {};

export function ReducerForForm(state = initialState, action = { formData: {} }) {
  switch (action.type) {
    case types.FORM_DATA_LOAD_TO_REDUX:
      if (Object.keys(action.formData).length === 0) {
        return {};
      }
      return Object.assign({}, state, action.formData);

    case types.FORM_DATA_CLEAR_TO_REDUX:
      return state;
    case types.FORM_DATA_REMOVE_TO_REDUX: {
      let newState = {};
      if (action.name.constructor === Array) {
        for (let i = 0; i < action.name.length; i += 1) {
          newState = Object.assign({}, state, state[action.name[i]] = '');
        }
      } else if (action.index > 0 || action === 0) {
        state[action.name].splice(action.index, 1);
        newState = Object.assign({}, state);
      } else {
        newState = Object.assign({}, state, state[action.name] = '');
      }

      return newState;
    }
    default:
      return state;
  }
}


export function formDataToRedux(val, name) {
  return (dispatch) => {
    dispatch(formDataLoad(val, name));
  };
}

// 1.不填index----如果name是字符串，清空相应字段的值；如果name是数组，依次清空数值中字符相应字段的值
// 2.填index----清空字段name的第index的值
export function removeDataToRedux(name, index) {
  return (dispatch) => {
    dispatch(formDataRemove(name, index));
  };
}
