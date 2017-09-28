import React from 'react';
import Toggle from 'material-ui/Toggle';

class ToggleNew extends React.Component {
  state={
    isInputChecked: '',
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && nextProps.value) {
      this.setState({
        isInputChecked: nextProps.value,
      });
    }
  }
  handleToggle(e, isInputChecked) {
    console.log(isInputChecked);
    this.setState({
      isInputChecked,
    });
    const { getFieldValue, name, field, index, onToggle } = this.props;
    if (getFieldValue) {
      if (field) {
        getFieldValue(isInputChecked, field[0], index, field[1]);
      } else {
        getFieldValue(isInputChecked, name);
      }
    }
    if (onToggle) {
      onToggle(isInputChecked);
    }
  }
  render() {
    const { linkValue, value } = this.props;
    return (
      <Toggle
        toggled={linkValue ? value : Boolean(this.state.isInputChecked)}
        onToggle={(e, isInputChecked) => { this.handleToggle(e, isInputChecked); }}
      />
    );
  }
}

export default ToggleNew;
