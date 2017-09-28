import React from 'react';
import { connect } from 'react-redux';
import { formDataToRedux } from './actions/action';


@connect(state => ({

}), {
  formDataToRedux,
})
export default class Form extends React.Component {
    // componentDidMount(){
    //     this.props.formDataToRedux({})
    // }
  componentWillReceiveProps(nextProps) {
    if (this.props.clear !== nextProps.clear) {
      this.props.formDataToRedux({});
    }
  }
  componentWillUnmount() {
    this.props.formDataToRedux({});
  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
