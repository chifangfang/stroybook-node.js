import React from 'react';
import {SnackBar} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SnackBarTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<SnackBar/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default SnackBarTest;
