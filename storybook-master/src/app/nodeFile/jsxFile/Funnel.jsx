import React from 'react';
import {Funnel} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class FunnelTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<Funnel/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default FunnelTest;
