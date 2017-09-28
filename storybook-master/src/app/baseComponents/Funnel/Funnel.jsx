import * as React from 'react';
import * as echarts from 'echarts';
import * as shortid from 'shortid';

const option = {
  title: {
    text: '',
    subtext: '',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  legend: {
    data: [],
  },
  calculable: true,
  series: [
    {
      name: '',
      type: 'funnel',
      left: '10%',
      top: 60,
          // x2: 80,
      bottom: 60,
      width: '80%',
          // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        normal: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          textStyle: {
            fontSize: 20,
          },
        },
      },
      labelLine: {
        normal: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
        },
      },
      data: [],
    },
  ],
};
const style = {
  width: '100%',
  height: '100%',
};

export default class Funnel extends React.Component{
  constructor(props) {
    super(props);
    const { seriesData, title, legendData } = this.props;
    option.series[0].data = seriesData;
    option.title.text = title;
    option.legend.data = legendData;
    this.state = {
      chartKey: shortid.generate(),
      option,
      style: Object.assign({}, style, this.props.style),
    };
  }
  componentDidMount() {
    const { option } = this.state;
    this.drawCharts(option);
  }

  drawCharts = (option) => {
    const myDiv = echarts.init(document.getElementById(this.state.chartKey));
    myDiv.showLoading();
    myDiv.setOption(option);
    myDiv.hideLoading();
  }

  componentWillReceiveProps(nextProps) {
    const { seriesData } = this.props;
    const { option } = this.state;
    if (nextProps.seriesData && nextProps.seriesData != seriesData) {
      option.series[0].data = nextProps.seriesData;
      this.setState({
        option,
      });
      this.drawCharts(option);
    }
  }

  renderEchartDom = () => {

  }
  render() {
    const { chartKey, style } = this.state;
    return (
      <div
        id={chartKey}
        style={style}
      />
    );
  }
}
