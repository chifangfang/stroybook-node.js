import React from 'react';
import {Form} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class FormTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Form/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default FormTest;
