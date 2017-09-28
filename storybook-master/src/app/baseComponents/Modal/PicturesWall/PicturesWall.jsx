import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { getCommonsUploadSignature } from 'app/redux/modules/swagger/common';
import { Upload, Icon, Modal } from 'antd';

const styles = require('./PicturesWall.less');

@connect(state => ({
  policy: state.common.signature.policy,
  signature: state.common.signature.signature,
}), { getCommonsUploadSignature })
export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      failed: false,
      isFilled: false,
    };
  }
  componentWillMount() {
    // const { fetchSignature } = this.props;
    this.props.getCommonsUploadSignature();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.defaultValue &&
       nextProps.defaultValue.length > 0 &&
        nextProps.defaultValue[0].imageUrl
      ) {
      if (
        this.state.fileList.length < nextProps.defaultValue.length &&
         this.state.isFilled === false
       ) {
        const fileList = this.state.fileList;
        nextProps.defaultValue.map((f) => {
          fileList.push({
            uid: shortid.generate(),
            name: f.name,
            status: 'done',
            url: `https://images.creams.io${f.imageUrl}`,
            response: {
              url: f.imageUrl,
              'image-width': f.width,
              'image-height': f.height,
              name: f.name,
            },
          });
          return null;
        });
        this.setState({
          fileList,
          isFilled: true,
        });
      }
    }
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    const { getFieldValue, name } = this.props;
    const formPics = [];
    let newFailed = this.state.failed;
    fileList.map((file, i) => {
      if (file.response) {
        formPics[i] = {
          imageUrl: file.response.url,
          width: file.response['image-width'],
          height: file.response['image-height'],
          name: file.name,
        };
      }

      return null;
    });
    if (getFieldValue) {
      getFieldValue(formPics, name);
    }
    newFailed = fileList.find(e => e.status === 'error');
    this.setState({
      fileList,
      failed: newFailed,
    });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { picCount = 100 } = this.props;
    const { className, signature, policy } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
        );
    const props = {
      name: 'img',
      action: 'https://v0.api.upyun.com/creams',
      data(file) {
        const formDatePart = {
          signature,
          policy,
          file,
        };
        return formDatePart;
      },
      headers: {
        'X-Requested-With': null,
      },
    };
    return (
      <div className={`clearfix ${className}`}>
        <Upload
          {...props}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= picCount ? null : uploadButton}
        </Upload>
        {
            this.state.failed &&
            <div style={{ color: 'red' }}>红框内图片为未上传成功，请检查网络后重新上传╮(╯3╰)╭</div>
        }
        <Modal
          wrapClassName={styles.publishRoomsInfo}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
