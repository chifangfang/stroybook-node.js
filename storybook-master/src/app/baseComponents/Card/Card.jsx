import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

// canExpand

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }
  componentWillMount() {
    this.setState({
      expanded: !this.props.canExpand,
    });
  }
  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    const { title, children, canExpand, containerStyle = {} } = this.props;
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={Object.assign({}, { width: '100%' })}
        containerStyle={containerStyle}
      >
        {
          !this.state.expanded &&
          <CardHeader
            title={title}
            // subtitle="Subtitle"
            // avatar="images/ok-128.jpg"
            actAsExpander
            showExpandableButton
          />
        }

        {/* <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="This toggle controls the expanded state of the component."
          />
        </CardText> */}
        {/* <CardMedia
          expandable
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" alt="" />
        </CardMedia> */}
        {
          title &&
          <CardTitle
            title={title}
            // subtitle="Card subtitle"
            expandable
            showExpandableButton={!!canExpand}
          />
        }

        <CardText style={{ width: '100%', height: '100%' }} expandable>
          {children}
        </CardText>
        {/* <CardActions>
          <FlatButton label="Expand" onClick={this.handleExpand} />
          <FlatButton label="Reduce" onClick={this.handleReduce} />
        </CardActions> */}
      </Card>
    );
  }
}
