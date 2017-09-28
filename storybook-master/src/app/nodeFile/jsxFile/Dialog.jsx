import React from 'react';
import {Dialog} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DialogTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Dialog/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default DialogTest;
