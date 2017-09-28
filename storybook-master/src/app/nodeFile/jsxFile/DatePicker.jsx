import React from 'react';
import {DatePicker} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DatePickerTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<DatePicker/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default DatePickerTest;
