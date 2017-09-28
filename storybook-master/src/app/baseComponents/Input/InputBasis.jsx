// author:钱俊
// 任何功能上不满足请找作者，请勿擅自改动

import React from 'react';

const scssStyle = require('./inputStyle.less');

/*
 InputBasis can check type /num/tel/email/password
 you can use it like a usual input
 and you can use onChange(val) to get input's value
 */

export class InputBasisExample extends React.Component {
  static limitDecimals(val, num) {
    let newVal = val;
    if ((/^(-?\d+)(\.\d+)?$/.test(val))) {
      if (num) {
        newVal = val.toString();
        newVal = newVal.slice(0, (newVal.indexOf('.') + num + 1));
      }
    }
    return newVal;
  }
  componentWillMount() {
    this.state = {
      valid: true,
      myValue: '',
      myType: this.props.type,
      flag: 1,
      canShowMes: false,
      numValue: '',
    };
  }
  componentDidMount() {
    this.setState({
      myValue: InputBasisExample.limitDecimals(this.props.defaultValue, this.props.fixNum),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({
        myValue: InputBasisExample.limitDecimals(nextProps.defaultValue, this.props.fixNum),
      });
      if (this.props.onChange) {
        this.props.onChange(nextProps.defaultValue);
      }
    }
  }
  checkType(type, val) {
    // console.log(type, val);
        // if (this.props.onBlur) {
        //     this.props.onBlur();
        // }
    let valid = true;
    if (val) {
            // || (/(0\d{2,3}-)?\d{7,8}(-\d{3,4})?/.test(val)) 座机
      switch (type) {
        case 'password':// 6-20数字或字母大小写组成，必须有大小写
          valid = (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,20}$/).test(val);
          break;
        case 'tel':
          valid = (/^1[3|4|5|8][0-9]\d{8}$/.test(val));
                    // valid=(/^(-?\d+)(\.\d+)?$/.test(val))//只做数字验证
          break;
        case 'email':
          valid = (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val));
          break;
        case 'num':
          valid = (/^(-?\d+)(\.\d+)?$/.test(val));
          break;
        default:
          valid = true;
          break;
      }
    }
    this.setState({ valid });
    return valid;
  }
  handleChange(e) {
    const { type, name, getFieldValue } = this.props;
    const value = InputBasisExample.limitDecimals(e.target.value, this.props.fixNum);
    if (getFieldValue) {
      if (this.props.field) {
        getFieldValue(value, this.props.field[0], this.props.index, this.props.field[1]);
      } else {
        getFieldValue(value, this.props.name);
      }
    }

    this.setState({
      myValue: value,
    });


    if (this.props.onChange) {
      if (type) {
        this.props.onChange(value, name, this.checkType(type, value));
      } else {
        this.props.onChange(value);
      }
    }
  }
  showRightMes() {
    let Mes = '';
    const type = this.state.myType;
    switch (type) {
      case 'tel':
        Mes = '电话号码';
        break;
      case 'email':
        Mes = '邮箱';
        break;
      case 'num':
        Mes = '数字';
        break;
      default:
        break;
    }
    return `请输入正确的${Mes}`;
  }
  handleFocus() {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus();
    }
  }
  render() {
    const {
            defaultValue,
            name,
            style = {},
            type = 'text',
            className,
            disabled = false,
            value,
            isEdit = true,
            unit = '',
            inputRef,
            handleKeyDown = () => {
                // console.log(e);
            },
            onBlur,
        }
            = this.props;
    return (
      <div className={className || scssStyle.mes} style={{ border: 'none' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <input
            ref={inputRef}
            className={`${scssStyle.base} ${className}`}
            onKeyDown={(e) => { handleKeyDown(e); }}
            onFocus={() => { this.handleFocus(); }}
            onChange={(e) => { this.handleChange(e); }}
            onBlur={() => {
              // this.checkType('blur');
              // console.log('blur');
              if (onBlur) {
                onBlur();
              }
            }}
            placeholder={this.props.placeholder}
            style={Object.assign({ paddingLeft: '5px', margin: '0px' }, style, !isEdit && { background: '#f9f9f9', color: '#bbbfcc' })}
            name={name}
            id={name}
            type={type}
            disabled={disabled || !isEdit}
            value={
              (defaultValue != null && defaultValue !== undefined) ?
               this.state.myValue : value}
          />
          <span className={`${scssStyle.unit}`}>{unit}</span>
          {this.props.children}
          {disabled && <div className={scssStyle.mask} />}
        </div>
      </div>
    );
  }
}

export default InputBasisExample;
