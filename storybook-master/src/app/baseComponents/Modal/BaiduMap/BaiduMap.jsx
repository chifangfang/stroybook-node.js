import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./BaiduMap.less');

export default class BaiduMap extends React.Component {

  static propTypes={
    ak: PropTypes.string,
    callback: PropTypes.func,
    id: PropTypes.string,
  }
  static defaultProps={
    ak: '7I3BNVligfjurkSCQxn3oFNSwMDRGHKK',
    callback(map) {},
    id: `itminus_bmap${parseInt(Math.random() * 10000000)}`,
  }

  componentWillMount() {
        // 注意callback=init参数不能去掉，因为这是百度地图异步加载的接口，
        // 否则，会因为React异步创建了script，百度返回的script中又调用document.write()，从而触发错误
        // const bmapSrc = `http://api.map.baidu.com/api?v=2.0&ak=${this.props.ak}&callback=init`;
        // if (typeof BMap != 'undefined') {
        //
        // }
        // let script = document.querySelector(`script[src='${bmapSrc}']`);
        // if (!script) {
        //     script = document.createElement('script');
        //     script.src = bmapSrc;
        //     document.body.appendChild(script);
        // }
  }
  componentDidMount() {
    this.waitUntil(this.props).then((map) => {
      console.log('[+] bmap loaded', map);
      this.props.callback(map);
      this.setState({
        map,
      });
    });
  }
  timeoutPromise(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
  waitUntil(props) {
    return new Promise((resolve, reject) => {
      const map = new BMap.Map(props.id);
      resolve(map);
    }).catch((err) => {
      console.log("there's no BMap yet. Waitting ...", err);
      return this.timeoutPromise(300).then(() => this.waitUntil(props));
    });
  }
  render() {
    const { className } = this.props;
    return <div className={`${styles.container} ${className}`} id={this.props.id} />;
  }
}
