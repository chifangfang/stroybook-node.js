import {
  createReducer,
} from '../../utils';

const SNACKBAR_INFO = 'global/SNACKBAR_INFO';

const initialState = {
  snackbarInfo: {
    content: '',
    isShow: false,
  },
};

export const changeSnakerInfo = info => ({
  type: SNACKBAR_INFO,
  info,
});

export default createReducer(initialState, {
  [SNACKBAR_INFO]: (state, action) => ({
    ...state,
    snackbarInfo: action.info,
  }),
});
