import {
  createReducer,
} from '../../utils';

const SNACKBAR_INFO = 'global/SNACKBAR_INFO';
const DIALOG_INFO = 'global/DIALOG_INFO';
const LEFT_DRAWER_INFO = 'global/LEFT_DRAWER_INFO';

const initialState = {
  snackbarInfo: {
    content: '',
    isShow: false,
    autoHideDuration: 4000,
  },
  dialogInfo: {
    content: '',
    isShow: false,
  },
  leftDrawerInfo: {
    isShow: true,
  },
};


// snackbarInfo
export const changeSnakerInfo = info => ({
  type: SNACKBAR_INFO,
  info,
});


// dialogInfo
export const changeDialogInfo = info => ({
  type: DIALOG_INFO,
  info,
});

// leftDrawer
export const changeLeftDrawerInfo = info => ({
  type: LEFT_DRAWER_INFO,
  info,
});

export default createReducer(initialState, {
  [SNACKBAR_INFO]: (state, action) => ({
    ...state,
    snackbarInfo: action.info,
  }),
  [DIALOG_INFO]: (state, action) => ({
    ...state,
    dialogInfo: action.info,
  }),
  [LEFT_DRAWER_INFO]: (state, action) => ({
    ...state,
    leftDrawerInfo: action.info,
  }),
});
