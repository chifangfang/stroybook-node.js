import React from 'react';
import { InputBasis, Field } from 'app/baseComponents';

const styles = require('./inputStyle.less');

export default class InputWithTitleForBuildingEdit extends React.Component {
  render() {
    const { field, index, name, valSet, data = '', unit = '', title = '', className, fontClassName } = this.props;
    return (
      <div className={className}>
        <span className={`${styles.operationCenterTitle} ${fontClassName}`}>
          {title}
        </span>
        <Field>
          <InputBasis
            name={name}
            onChange={(val) => { valSet(val); }}
            className={styles.newRoomInput}
            defaultValue={data}
            index={index}
            field={field}
          >
            <span className={styles.newRoomUnit}>{unit}</span>
          </InputBasis>
        </Field>
      </div>
    );
  }
}
