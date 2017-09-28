import React from 'react';
import TextField from 'material-ui/TextField';
// import shortid from 'shortid';
import styles from './TextFieldNew.less';

class TextFieldNew extends React.Component {
  componentWillMount() {
    this.setState({
      value: this.props.value || '',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  handleChange(e) {
    const { onChange, getFieldValue } = this.props;
    if (onChange) {
      onChange(e);
    } else {
      console.warn('你的onChange呢');
    }
    if (getFieldValue) {
      if (this.props.field) {
        getFieldValue(e.target.value, this.props.field[0], this.props.index, this.props.field[1]);
      } else {
        getFieldValue(e.target.value, this.props.name);
      }
    }
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { floatingLabelText, floatingLabelFixed, hintText, className, disabled,
      multiLine, linkValue = false, value = '' } = this.props;
    return (
      <TextField
        multiLine={multiLine}
        disabled={disabled}
        className={`${styles.widthAuto} ${className}`}
        value={linkValue ? value : this.state.value}
        onKeyDown={this.props.onKeyDown}
        name={this.props.name}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        floatingLabelFixed={floatingLabelFixed}
        onChange={(e) => { this.handleChange(e); }}
      />
    );
  }
}

export default TextFieldNew;
