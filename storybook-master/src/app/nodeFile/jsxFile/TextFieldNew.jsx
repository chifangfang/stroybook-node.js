import React from 'react';
import {TextFieldNew} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class TextFieldNewTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<TextFieldNew/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default TextFieldNewTest;
