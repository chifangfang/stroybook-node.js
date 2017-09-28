import React from 'react';
import {LineCharts} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LineChartsTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<LineCharts/>
            
</MuiThemeProvider>
</div>
    );
  }
}
export default LineChartsTest;
