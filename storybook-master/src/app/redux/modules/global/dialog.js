import {
  createReducer,
} from '../../utils';

const DIALOG_INFO = 'global/DIALOG_INFO';

const initialState = {
  dialogInfo: {
    buttons: [], title: '我是标题', content: '我是内容', isShow: false, submit: () => {},
  },
};

export const changeDialogInfo = info => ({
  type: DIALOG_INFO,
  info,
});

export default createReducer(initialState, {
  [DIALOG_INFO]: (state, action) => ({
    ...state,
    dialogInfo: action.info,
  }),
});
