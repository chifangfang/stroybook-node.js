import React from 'react';
import {DragGrid} from "../../baseComponents"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DragGridTest extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
<div>
<MuiThemeProvider>
<DragGrid/>
            
</MuiThemeProvider>
<div style={{clear:'both',marginLeft:'50px'}}>
<p>static propTypes=(</p>
<p>    items: PropTypes.array,</p>
<p>    className: PropTypes.string,</p>
<p>    itemClass: PropTypes.string,</p>
<p>    width: PropTypes.number,</p>
<p>    height: PropTypes.number,</p>
<p>    onSortStart: PropTypes.func,</p>
<p>    onSortEnd: PropTypes.func,</p>
<p>    component: PropTypes.func,</p>
<p>    shouldUseDragHandle: PropTypes.bool,</p>
<p>)</p>

</div>

</div>
    );
  }
}
export default DragGridTest;
