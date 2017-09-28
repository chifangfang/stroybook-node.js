import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './SelectField.less';
// data:所有数据
// onSelect:值改变后父组件传进来的方法

export default class SelectFieldExampleSimple extends Component {

  static defaultProps={
    data: [
            { name: '滨江', id: 1 },
            { name: '下沙', id: 2 },
            { name: '西湖', id: 3 },
    ],
        // value:[]
  }
  state = {
    value: '',
  };
  componentWillMount() {
    const { value } = this.props;
    this.setState({
      value,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  handleChange = (event, index, data) => {
    console.log(data);
    // console.log('select');
    // console.log(data);
    const { onSelect, getFieldValue } = this.props;
    if (getFieldValue) {
      if (this.props.field) {
        getFieldValue(data, this.props.field[0], this.props.index, this.props.field[1]);
      } else {
        getFieldValue(data, this.props.name);
      }
    }
    if (onSelect) {
      onSelect({
        index,
        name: this.props.data[index].name,
        id: data,
      });
    } else {
      console.warn('onSelect在哪，好好看控件去');
    }
    this.setState({ value: data });
  };

  render() {
    const { data = [], floatingLabelText, hintText = '', floatingLabelFixed, className,
    disabled, linkValue = false, value } = this.props;
    return (
      <SelectField
        disabled={disabled}
        floatingLabelFixed={floatingLabelFixed}
        hintText={hintText}
        className={`${styles.width100} ${className}`}
        value={linkValue ? value : this.state.value}
        onChange={this.handleChange}
        floatingLabelText={floatingLabelText}
      >
        {
          data.map(d => (
            <MenuItem
              key={d.id}
              value={d.id}
              primaryText={d.name}
            />
          ))
        }
      </SelectField>
    );
  }
}
