import {
  createReducer,
} from '../../utils';

const SAVE_TOKEN_INFO = 'jwt/SAVE_TOKEN_INFO';

const initialState = {
  info: {

  },
};


// snackbarInfo
export const saveTokenInfo = info => ({
  type: SAVE_TOKEN_INFO,
  info,
});

export default createReducer(initialState, {
  [SAVE_TOKEN_INFO]: (state, action) => ({
    ...state,
    info: action.info,
  }),
});
