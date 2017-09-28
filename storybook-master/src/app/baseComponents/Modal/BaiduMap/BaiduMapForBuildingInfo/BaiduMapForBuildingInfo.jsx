import React from 'react';
import { InputBasis } from 'app/baseComponents';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { changeSnakerInfo } from 'app/redux/modules/global/snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import BaiduMap from '../BaiduMap';
import Footer from '../../Footer/Footer';

const styles = require('./BaiduMapForBuildingInfo.less');
// 暂时要确定默认值来了再渲染控件

@connect(() => ({}), {
  changeSnakerInfo,
})
export default class BaiduMapForBuildingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: shortid.generate(),
      searchVal: '请搜索',
      address: '请搜索',
      map: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
        //     const { map } = this.state;
        //     let pp = new BMap.Point(116.400244, 39.92556);
        //     if (nextProps.defaultValue.lat && nextProps.defaultValue.lng) {
        //         pp = new BMap.Point(nextProps.defaultValue.lng, nextProps.defaultValue.lat);
        //     }
        //     // console.log(pp)
        //     map.clearOverlays();
        //     map.centerAndZoom(pp, 18);
        //             map.addOverlay(new BMap.Marker(pp));    // 添加标注
        //     const _that = this;
        // function myFun() {
        //     try {
        //         map.centerAndZoom(pp, 18);
        //         map.addOverlay(new BMap.Marker(pp));    // 添加标注
        //         map.addEventListener('click', (e) => {
        //             map.clearOverlays();
        //             const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
        //             map.addOverlay(marker);
        //             map.addEventListener('mousemove', getAttr);
        //             function getAttr() {
        //                 const p = marker.getPosition();       // 获取marker的位置
        //                 _that.getAddressAndCoordinate(p);
        //                 _that.props.onChange(p.lat, 'lat');
        //                 _that.props.onChange(p.lng, 'lng');
        //             }
        //             marker.enableDragging();
        //             _that.getAddressAndCoordinate(e.point);
        //             _that.props.onChange(e.point.lat, 'lat');
        //             _that.props.onChange(e.point.lng, 'lng');
        //         });
        //
        //         map.enableScrollWheelZoom();
        //     } catch (err) {
        //         alert('请输入更加详细的地址');
        //     }
        // }
        //
        //
        // const local = new BMap.LocalSearch(map, { // 智能搜索
        //     onSearchComplete: ()=>{},
        // });
        // local.search(this.state.searchVal);
        //     this.setState({
        //         address: this.state.searchVal,
        //     });
    }
  }
  onChange(val) {
    this.setState({
      searchVal: val,
    });
  }
  onKeyDown(e) {
    if (e.keyCode == 13) {
      this.searchBtnClick();
    }
  }
  getAddressAndCoordinate(point) {
    const geoc = new BMap.Geocoder();
    geoc.getLocation(point, (rs) => {
      const addComp = rs.addressComponents;
      this.setState({
        coordinate: point,
        address: `${addComp.province} ,${addComp.city} ,${addComp.district} ,${addComp.street} ,${addComp.streetNumber}`,

      });
    });
  }
  searchBtnClick() {
    const map = this.state.map;
    map.clearOverlays();    // 清除地图上所有覆盖物
    const _that = this;
    function myFun() {
      try {
        const pp = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
        _that.props.onChange(pp.lat, 'lat');
        _that.props.onChange(pp.lng, 'lng');
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    // 添加标注
        map.addEventListener('click', (e) => {
          map.clearOverlays();
          const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
          map.addOverlay(marker);
          // map.addEventListener('mousemove', getAttr);
          function getAttr() {
            const p = marker.getPosition();       // 获取marker的位置
            _that.getAddressAndCoordinate(p);
            _that.props.onChange(p.lat, 'lat');
            _that.props.onChange(p.lng, 'lng');
          }
          marker.enableDragging();
          _that.getAddressAndCoordinate(e.point);
          _that.props.onChange(e.point.lat, 'lat');
          _that.props.onChange(e.point.lng, 'lng');
        });

        map.enableScrollWheelZoom();
      } catch (err) {
        _that.props.changeSnakerInfo({ content: '请输入更加详细的地址', isShow: true });
      }
    }


    let local = new BMap.LocalSearch(map, { // 智能搜索
      onSearchComplete: myFun,
    });
    local.search(this.state.searchVal);
    this.setState({
      address: this.state.searchVal,
    });
  }
  render() {
    const { className, defaultValue } = this.props;
    return (
      <div className={styles.relative}>
        <BaiduMap
          id={this.state.id}
          className={`${className}`}
          callback={(map) => {
            const _that = this;
            if (this.state.map === '') {
              this.setState({
                map,
              });
            }
            let pp = new BMap.Point(116.400244, 39.92556);
            map.centerAndZoom(pp, 18);
            if (defaultValue.lat && defaultValue.lng) {
              pp = new BMap.Point(defaultValue.lng, defaultValue.lat);
              map.centerAndZoom(pp, 18);
            } else {
              const geolocation = new BMap.Geolocation();
              geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                  const mk = new BMap.Marker(r.point);
                  map.addOverlay(mk);
                  map.panTo(r.point);
                  _that.props.onChange(r.point.lat, 'lat');
                  _that.props.onChange(r.point.lng, 'lng');
                                    // alert('您的位置：'+r.point.lng+','+r.point.lat);
                } else {
                  alert(`failed${this.getStatus()}`);
                }
              }, { enableHighAccuracy: true });
            }
                        // console.log(pp)

                        // const _that = this;
            function myFun() {
              try {
                map.addOverlay(new BMap.Marker(pp));    // 添加标注
                map.addEventListener('mousedown', (e) => {
                  map.clearOverlays();
                  const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                  map.addOverlay(marker);

                  function getAttr() {
                    const p = marker.getPosition();       // 获取marker的位置
                    _that.getAddressAndCoordinate(p);
                    // console.log(p);
                    _that.props.onChange(p.lat, 'lat');
                    _that.props.onChange(p.lng, 'lng');
                  }
                  // marker.addEventListener('mousemove', getAttr);
                  marker.addEventListener('mouseup', getAttr);
                  getAttr();
                  // marker.enableDragging();
                                    // _that.getAddressAndCoordinate(e.point);
                                    // _that.props.onChange(e.point.lat, 'lat');
                                    // _that.props.onChange(e.point.lng, 'lng');
                });

                map.enableScrollWheelZoom();
              } catch (err) {
                                // alert('请输入更加详细的地址');
              }
            }


            const local = new BMap.LocalSearch(map, { // 智能搜索
              onSearchComplete: myFun,
            });
            local.search(this.state.searchVal);
            this.setState({
              address: this.state.searchVal,
            });
          }}
        />
        <SearchBar
          onKeyDown={(e) => { this.onKeyDown(e); }}
          onChange={(val) => { this.onChange(val); }}
          onFocus={() => { }}
          onClick={() => { this.searchBtnClick(); }}
        />
        <div className={`${styles.infoAndBtn}`}>
          <AddressInfo address={this.state.address} className={`${styles.addressShowContainer}`} />
          <Btn
            onClick={() => {
                            // this.props.onChange(this.state.address, 'address');
            }}
          />
        </div>

      </div>
    );
  }
}

function Btn(props) {
  return (
    <div onClick={() => { props.onClick(); }} className={`${styles.btn}`}>
            保存
        </div>
  );
}

function SearchBar(props) {
  const { onClick, onFocus, onChange, onKeyDown } = props;
  return (
    <div className={`${styles.searchContainer}`}>
      <InputBasis
        onFocus={() => { onFocus(); }}
        id="suggestId"
        className={`${styles.searchInput}`}
        onChange={(val) => { onChange(val); }}
        handleKeyDown={(e) => { onKeyDown(e); }}
      />
      <RaisedButton
        label="搜索"
        primary
        onTouchTap={() => { onClick(); }}
        className={`${styles.btnContainer}`}
      />
    </div>
  );
}

function AddressInfo(props) {
  const { address, className } = props;
  return (
    <div className={`${styles.showAddress} ${className}`}>{address}</div>
  );
}
