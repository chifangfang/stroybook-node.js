import React from 'react';
import {Card} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CardTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Card/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default CardTest;
