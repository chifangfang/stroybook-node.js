import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import styles from './DatePicker.less';


class DatePickerCN extends React.Component {
  componentWillMount() {
    this.setState({
      value: this.props.value ? moment(this.props.value).toDate() : null,
    });
  }
  // state={
  //   value: null,
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value ? moment(nextProps.value).toDate() : null,
      });
    }
  }
  dateTimeFormat(locale, options) {
    const dayAbbreviation = ['日', '一', '二', '三', '四', '五', '六'];
    const dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthLongList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    this.format = function (date) {
      if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
        return `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`;
      } else if (options.year === 'numeric' && options.month === 'numeric' && options.day === 'numeric') {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      } else if (options.year === 'numeric' && options.month === 'long') {
        return `${monthLongList[date.getMonth()]} ${date.getFullYear()}`;
      } else if (options.weekday === 'narrow') {
        return dayAbbreviation[date.getDay()];
      } else if (options.year === 'numeric') {
        return date.getFullYear().toString();
      } else if (options.day === 'numeric') {
        return date.getDate();
      }
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Material-UI: Wrong usage of DateTimeFormat') : void 0;
      return null;
    };
  }
  handleTimeChange(e, date) {
    // console.log(date);
    const { getFieldValue, onChange } = this.props;
    this.setState({
      value: date,
    });
    if (getFieldValue) {
      if (this.props.field) {
        getFieldValue(date, this.props.field[0], this.props.index, this.props.field[1]);
      } else {
        getFieldValue(date, this.props.name);
      }
    }
    if (onChange) {
      onChange(e, moment(date).format('YYYY-MM-DD'));
    }
  }
  render() {
    const { floatingLabelText, floatingLabelFixed, hintText, format = 'YYYY-MM-DD',
     className, disabled, linkValue } = this.props;
    return (
      <DatePicker
        disabled={disabled}
        // onTouchTap={(e)=>{this.props.onTouchTap(e)}}
        value={linkValue ? this.props.value : this.state.value}
        className={`${styles.inputWidth} ${className}`}
        hintText={hintText}
        onChange={(e, date) => { this.handleTimeChange(e, date); }}
        okLabel="确定"
        cancelLabel="取消"
        DateTimeFormat={this.dateTimeFormat}
        locale="en"
        floatingLabelText={floatingLabelText}
        floatingLabelFixed={floatingLabelFixed}
        textFieldStyle={{ width: 'auto!import' }}
        formatDate={date => moment(date).format(format)}
      />
    );
  }
}

export default DatePickerCN;
