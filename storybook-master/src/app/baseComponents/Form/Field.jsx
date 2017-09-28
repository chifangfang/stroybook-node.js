// Field的children会获getFieldValue方法，需要val和name（必填），index，nameInObj(选填)
// val 把state的值设为val
// val，name设置一条字段的key和vlaue
// val,name,index设置一条数字字段的key=name，index为其中第几个数，value为index位置的值
// val，name,index,nameInObj设置一条数组中都是对象的字段的key=name，的第index的对象中的key为nameInObj的值为val
// index可选，代表数组，会从数组里处理相应index的值
// nameInObj,代表val所在名为name的Object中的字段，nameInObj为remove代表删除该条index
// 还需要定义required(必填性)和vaild(正确性
import React from 'react';
import { connect } from 'react-redux';
import { formDataToRedux } from './actions/action';

@connect(state => ({
  formData: state.ReducerForForm,
}), {
  formDataToRedux,
})
export default class Field extends React.Component {
  componentDidMount() {
    document.addEventListener('Fucking', (e) => {
      console.log('yes,sir,I am fucking', e);
    }, false);
  }
  getValue(val, name, index, nameInObj) {
    const { formData = {} } = this.props;
    let newVal;
    if (nameInObj) {
      if (index === 0 || index > 0) {
        const obj = {};
        obj[nameInObj] = val;
        newVal = [obj];
        if (formData[name]) {
          newVal = formData[name];
          if (newVal[index]) {
            if (nameInObj !== 'remove') {
              newVal[index][nameInObj] = val;
            } else {
              newVal.splice(index, 1);
            }
          } else {
            newVal[index] = {};
            newVal[index][nameInObj] = val;
          }
        }
      }
    } else if (index > 0 || index === 0) {
      newVal = [val];
      if (formData[name]) {
        newVal = formData[name];
        if (newVal[index]) {
          if (val) {
            newVal[index] = val;
          } else {
            newVal.splice(index, 1);
          }
        } else {
          newVal[index] = val;
        }
      }
    } else {
      newVal = val;
    }
    this.props.formDataToRedux(newVal, name);
  }
  renderChild(props) {
    return React.Children.map(props.children, child => React.cloneElement(child, {
      getFieldValue: (val, name, index, nameInObj) => {
        this.getValue(val, name, index, nameInObj);
      },
    }));
  }

  render() {
    return (
      <div
        ref={(ref) => { this.field = ref; }}
        className={this.props.className}
        style={this.props.style}
      >
        {this.renderChild(this.props)}
      </div>
    );
  }
}
