import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Button } from 'app/baseComponents';

const styles = require('./Footer.less');

// const buttons = [
//   {
//     title: '取消',
//     onClick: () => { alert('我是取消'); },
//     type: 'base',
//   }, {
//     title: '上架',
//     onClick: () => { alert('我是上架'); },
//     type: 'submit',
//   },
// ];
export default class Footer extends React.Component {
  static propTypes={
    buttons: PropTypes.array,
  }
  static defaultProps={
    buttons: [
      {
        title: '取消',
        onClick: () => { alert('我是取消'); },
        type: 'base',
        className: '',
      }, {
        title: '上架',
        onClick: () => { alert('我是上架'); },
        type: 'submit',
        className: '',
      },
    ],
  }
  render() {
    const { buttons, className } = this.props;
    return (
      <div className={`${styles.container} ${className}`}>
        {buttons.map(b =>
          (<Button
            className={b.className}
            key={shortid.generate()}
            type={b.type}
            title={b.title}
            onClick={() => { b.onClick(); }}
          />),
        )}
      </div>
    );
  }
}
