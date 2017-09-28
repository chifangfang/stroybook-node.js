import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import styles from './RadioButtonGroup.less';

// const styles = {
//   block: {
//     maxWidth: 250,
//   },
//   radioButton: {
//     marginBottom: 16,
//   },
// };
class RadioButtonExampleSimple extends React.Component {
  state={
    valueSelected: '',
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value) {
      this.setState({
        valueSelected: nextProps.value,
      });
    }
  }
  handleChange(e, value) {
    this.setState({
      valueSelected: value,
    });
    const { getFieldValue, name, field, index, onChange } = this.props;
    if (getFieldValue) {
      if (field) {
        getFieldValue(value, field[0], index, field[1]);
      } else {
        getFieldValue(value, name);
      }
    }
    if (onChange) {
      onChange(value);
    }
  }
  render() {
    const { data, value, linkValue } = this.props;
    return (
      <RadioButtonGroup
        className={styles.container}
        name="shipSpeed"
        defaultSelected=""
        valueSelected={linkValue ? value : this.state.valueSelected}
        onChange={(e, val) => { this.handleChange(e, val); }}
      >
        {
          data.map(d => (
            <RadioButton
              key={d.id}
              value={d.id}
              label={d.name}
              // style={styles.radioButton}
            />
          ))
        }
      </RadioButtonGroup>
    );
  }
}

export default RadioButtonExampleSimple;
