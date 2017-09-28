import React from 'react';
import PropTypes from 'prop-types';
import { DropDown } from 'app/baseComponents';

const styles = require('./ChainedDropDown.less');

export default class ChainedDropDown extends React.Component {
  static propTypes={
    data: PropTypes.array,                      // 所有数据
    defaultValue: PropTypes.object,             // 初始值
    keyWords: PropTypes.array,                  //
    className: PropTypes.string,
    // onLastSelectorChange: PropTypes.func,
    dropDownStyles: PropTypes.array,
  }
  static defaultProps={
    data: [],
    defaultValue: { unit: '', floor: '', roomNumber: '', id: '' },
    keyWords: ['unit', 'floor', 'roomNumber'],
    propKeys: ['floors', 'rooms'],
    onChange: (val) => { console.log(val); },
    className: '',
    // onLastSelectorChange: () => {},
    dropDownStyles: [],
  }
  constructor(props) {
    super(props);
    this.state = {
      currentData: {},
      indexGroup: [],
    };
  }
  componentWillMount() {
    const { keyWords, defaultValue, data } = this.props;
    const indexGroup = this.state.indexGroup;
    const currentData = {};

    if (defaultValue) {
      for (const i in keyWords) {
        if (i === 0) {
          const newData = data.find(n => n[keyWords[i]] === defaultValue[keyWords[i]]);
          const index = data.findIndex(n => n[keyWords[i]] === defaultValue[keyWords[i]]);
          indexGroup.push(index);
          currentData[keyWords[i]] = { data: newData, index };
        } else {
          const index = this.getChainedData(i, indexGroup[i - 1]).findIndex(n => (
            n[keyWords[i]] === defaultValue[keyWords[i]]));
          const newData = this.getChainedData(i, indexGroup[i - 1]).find(n => (
            n[keyWords[i]] === defaultValue[keyWords[i]]));
          indexGroup.push(index);
          currentData[keyWords[i]] = { data: newData, index };
        }
      }
    }

    this.setState({
      indexGroup,
      currentData,
    });
  }
  getChainedData(level) {
    const { data, propKeys } = this.props;
    const { indexGroup } = this.state;
    let newData = data;
    for (let i = 0; i < level; i += 1) {
      if (indexGroup[i] >= 0 && newData[indexGroup[i]]) {
        newData = newData[indexGroup[i]][propKeys[i]];
      }
    }
    return newData;
  }
  handleSelected(data, index, keyIndex) {
    const { keyWords, onChange, name, lineIndex, getRoomData } = this.props;
    const currentData = this.state.currentData;
    currentData[keyWords[keyIndex]] = { data, index };
    const indexGroup = this.state.indexGroup;

    if (indexGroup[keyIndex] !== index) {
      for (let i = keyIndex + 1; i < keyWords.length; i += 1) {
        currentData[keyWords[i]] = { data: {}, index: '' };
      }
    }
    indexGroup[keyIndex] = index;
    this.setState({
      currentData,
      indexGroup,
    });


    if (keyIndex === keyWords.length - 1) {
            // getFieldValue && getFieldValue(data.id, name,lineIndex);
      onChange(data.id, name);
      if (getRoomData) {
        getRoomData(data, lineIndex);
      }
    }

        // onChange(data.id, name);
  }
  render() {
    const { data, keyWords, className, dropDownStyles = [] } = this.props;
    const { currentData } = this.state;
    return (
      <div className={`${styles.container} ${className}`}>
        <DropDown
          click={(d, index) => { this.handleSelected(d, index, 0); }}
          data={data}
          currentData={currentData[keyWords[0]] && currentData[keyWords[0]].data}
          blockProp={keyWords[0]}
          className={`${styles.unit} ${dropDownStyles[0]}`}
        />
        {
            keyWords.map((k, i) => {
              if (i > 0) {
                return (
                    currentData[keyWords[i - 1]] &&
                    (
                      currentData[keyWords[i - 1]].index === 0 ||
                       currentData[keyWords[i - 1]].index > 0) &&
                       <DropDown
                         key={i}
                         click={(d, index) => { this.handleSelected(d, index, i); }}
                         data={this.getChainedData(i)}
                         currentData={currentData[keyWords[i]] && currentData[keyWords[i]].data}
                         blockProp={keyWords[i]}
                         className={`${styles.floor} ${dropDownStyles[i]}`}
                       />
                );
              }
              return null;
            })
        }
      </div>
    );
  }
}
