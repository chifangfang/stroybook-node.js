import React from 'react';
import {Textarea} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class TextareaTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Textarea/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default TextareaTest;
