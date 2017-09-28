// 简单的确认提交提示弹出框
import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { changeDialogInfo } from '../../redux/modules/global/dialog';

@connect(state => ({
  dialogInfo: state.global.dialogInfo,
}), {
  changeDialogInfo,
})
export default class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.changeDialogInfo({
      title: '我是标题',
      content: '我是内容',
      isShow: false,
      submit: () => {},
    });
  };

  render() {
    const { children, buttons = [], title = '我是标题', content = '我是内容', isShow = false, submit } = this.props.dialogInfo;
    const actions = [
      <FlatButton
        label="取消"
        primary
        onTouchTap={() => { this.handleClose(); }}
      />,
      <FlatButton
        label="确认"
        primary
        keyboardFocused
        onTouchTap={submit}
      />,
    ];

    return (
      <div>
        <Dialog
          style={{ zIndex: '999999' }}
          title={title}
          actions={buttons.length > 0 ? buttons : actions}
          modal={false}
          open={isShow}
          onRequestClose={this.handleClose}
        >
          {children || content}
        </Dialog>
      </div>
    );
  }
}
