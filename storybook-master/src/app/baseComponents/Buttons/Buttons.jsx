import React from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.less';

export default class Button extends React.Component {
  static propTypes={
    title: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps={
    type: 'base',
    title: '我是标题',
    onClick: () => { alert('我是关闭按钮'); },
    className: '',
  }
  render() {
    const { title, onClick, type, className } = this.props;
    return (
      <div className={`${styles.base} ${styles[type]} ${className}`} onClick={() => { onClick(); }}>
        <span>{title}</span>
      </div>
    );
  }
}
