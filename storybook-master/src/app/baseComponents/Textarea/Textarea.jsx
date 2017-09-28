import React from 'react';
const styles = require('./Textarea.less');

export default class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    this.setState({
      value: this.props.defaultValue,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      let newValue = nextProps.defaultValue;
      if (!nextProps.defaultValue) {
        newValue = '';
      }
      this.setState({
        value: newValue,
      });
    }
  }
  handleChange(e) {
    const { onChange, getFieldValue, name } = this.props;
    onChange && onChange(e.target.value);
    getFieldValue && getFieldValue(e.target.value, name);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { name, id, className, onChange, defaultValue, placeholder } = this.props;
    const { value } = this.state;
    return (
      <textarea
        className={`${styles.base} ${className}`}
        name={name}
        id={id}
        onChange={(e) => { this.handleChange(e); }}
        value={value}
        placeholder={placeholder}
      />
    );
  }
}
