import React from 'react';
import {SelectField} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SelectFieldTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<SelectField/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default SelectFieldTest;
