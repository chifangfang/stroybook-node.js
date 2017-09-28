import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { changeSnakerInfo } from '../../redux/modules/global/snackbar';
import { postAdminBuildingGroup, getAdminBuildingGroup, getAdminBuildingGroupId, putAdminBuildingGroupId } from '../../redux/modules/swagger/promotion';

@connect(state => ({
  formData: state.ReducerForForm,
  snackbarInfo: state.global.snackbarInfo,
}), {
  postAdminBuildingGroup,
  getAdminBuildingGroup,
  getAdminBuildingGroupId,
  putAdminBuildingGroupId,
  changeSnakerInfo,
})
export default class DrawerOpenRightExample extends React.Component {
  render() {
    const { snackbarInfo } = this.props;
    return (
      <Snackbar
        open={snackbarInfo.isShow}
        message={snackbarInfo.content}
        autoHideDuration={4000}
        bodyStyle={{ height: 'auto' }}
        onRequestClose={
            () => {
              this.props.changeSnakerInfo({
                content: '',
                isShow: false,
              });
            }
          }
      />
    );
  }
}
