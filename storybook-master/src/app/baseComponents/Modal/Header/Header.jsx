import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./Header.less');

export default class Header extends React.Component {
  static propTypes={
    title: PropTypes.string,
    closeFunc: PropTypes.func,
  }
  static defaultProps={
    title: '我是标题',
    closeFunc: () => { alert('我是关闭按钮'); },
  }
  render() {
    const { title, closeFunc } = this.props;

    return (
      <div className={`${styles.headerContainer}`}>
        <span
          className={`${styles.title}`}
        >{title}</span>
        <span
          className={`creamsicon ${styles.closeIcon}`}
          onClick={() => { closeFunc(); }}
        >&#xe667;</span>
      </div>
    );
  }
}
