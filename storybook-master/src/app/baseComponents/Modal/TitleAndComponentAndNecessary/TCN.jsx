import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./TCN.less');

export default class TCN extends React.Component {
  static propTypes={
    title: PropTypes.string,
    showIcon: PropTypes.bool,
    className: PropTypes.string,
  }
  static defaultProps={
    title: '我是标题',
    showIcon: false,
    className: '',
  }
  render() {
    const { title, showIcon, className, titleStyle } = this.props;
    return (
      <div className={`${styles.container} ${className}`}>
        <span className={`${styles.title} ${titleStyle}`}>{title}：</span>
        {this.props.children}
        {
            showIcon &&
            <i style={{ color: 'red', fontSize: '12px' }} className="material-icons">star</i>
        }
      </div>
    );
  }
}
