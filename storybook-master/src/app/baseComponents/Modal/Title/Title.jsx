import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./Title.less');

export default class Title extends React.Component {
  static propTypes={
    title: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps={
    title: '我是标题',
    className: '',
  }
  render() {
    const { title, className } = this.props;
    return (
      <div className={`${styles.container} ${className}`}>
        <i style={{ color: '#4494f0' }} className="material-icons">donut_large</i>
        <span className={styles.title}>
          {title}
        </span>
        {this.props.children}
      </div>
    );
  }
}
