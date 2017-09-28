// author:钱俊
// 任何功能上不满足请找作者，请勿擅自改动


import React from 'react';
import { Icon } from 'antd';
// import { InputBasis } from 'app/baseComponents';
import { InputBasis } from '../../baseComponents';

const styles = require('./styles.less');


// interface myProps{
//     currentData?:any;  //选中的值
//     data?:any;         //所有可选的值
//     click?:any;
//     checkProp?:string; //是否能选择
//     className?:any;
//     blockProp?:string; //显示的属性
//     tips?:any;         //提示文字
//     unit?:string       //单位
//     canImport:fool     //是否可选可填
// }

export default class DropDowForBuildingEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  changeShow(bool) {
        // this.textInput.focus()
    this.setState({
      isShow: bool,
    });
  }
  inputFocus() {
    const { canImport } = this.props;
    if (canImport) {
      this.setState({
        isShow: !this.state.isShow,
      });
    } else if (this.state.isShow) {
      this.textInput.blur();
    } else {
      this.textInput.focus();
    }
  }
  itemClick(d, index) {
    const { click } = this.props;
    this.changeShow(false);
    click(d, index);
        // getFieldValue && getFieldValue(d, name);
  }
  inputBlur() {
    setTimeout(() => { this.changeShow(false); }, 200);
  }
  inputChange(val) {
    const { blockProp, click } = this.props;
    const d = {};
    d[blockProp] = val;
    click(d);
  }
  render() {
    const {
            currentData = { num: 1 },
            data = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
            canImport = false,
            onChange,
            className,
            disabled,
            blockProp,
            unit,
            checkProp,
            tips,
        } = this.props;
    return (
      <div
        data-tips={tips}
        className={`${styles.relative} ${styles.defaultBorder} ${disabled &&
           styles.tips} ${className}`}
        onClick={() => {
          if (!canImport) {
            this.changeShow(!this.state.isShow);
          }
        }}
      >
        <div
          className={`${styles.dropDown} ${styles.relative}`}
        >
          <InputBasis
            inputRef={(input) => { this.textInput = input; }}
            className={styles.inputNotSee}
            style={Object.assign({}, canImport && { color: 'black' }, !canImport && { pointerEvents: 'none' })}
            onBlur={() => {
              if (!canImport) {
                this.inputBlur();
              }
            }}
            type="text"
            value={currentData[blockProp]}
            onChange={(val) => {
              if (canImport) {
                this.inputChange(val);
                const obj = {};
                obj[blockProp] = val;
                onChange(obj);
              }
            }}
          />
          {
              !canImport &&
              <span
                onClick={() => { this.changeShow(!this.state.isShow); }}
                className={styles.dropDownCurrentData}
              >{currentData[blockProp]}</span>
          }
          <span
            onClick={() => { this.changeShow(!this.state.isShow); }}
            className={`${styles.unit}`}
          >{unit}</span>
          <div
            className={`${styles.rightContainer}`}
            onClick={() => { this.inputFocus(); }}
          >
            <div
              className={styles.dropDownArrowContainer}
            >
              <Icon
                className={`${styles.dropDownArrow} ${this.state.isShow && styles.rotate}`}
                type="down"
              />
            </div>
          </div>
        </div>
        {
          this.state.isShow &&
          <div
            className={`${styles.dropDownContainer}`}
          >
              {data.map((d, i) => {
                const checkResult = checkProp ? d[checkProp] === false : true;
                if (checkResult) {
                  return (
                    <div
                      key={i}
                      onClick={() => { this.itemClick(d, i); }}
                      className={styles.dropDownBlock}
                    >
                      {d[blockProp]}
                    </div>);
                }
                return null;
              })}
          </div>
      }
      </div>
    );
  }
}
