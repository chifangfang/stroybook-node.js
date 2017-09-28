import React from 'react';
import {InputBasis} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class InputBasisTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<InputBasis/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default InputBasisTest;
