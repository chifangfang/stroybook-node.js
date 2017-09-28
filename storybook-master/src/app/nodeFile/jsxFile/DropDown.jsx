import React from 'react';
import {DropDown} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DropDownTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<DropDown/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default DropDownTest;
