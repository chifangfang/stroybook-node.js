import React from 'react';
import {Toggle} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ToggleTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Toggle/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default ToggleTest;
