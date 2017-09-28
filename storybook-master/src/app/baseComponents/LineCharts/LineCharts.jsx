import * as React from 'react';
import * as echarts from 'echarts';
import * as shortid from 'shortid';

const option = {
  title: {
    text: '',
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [], // x轴
  },
  yAxis: {
    type: 'value',
  },
  series: [],
};
const style = {
  width: '100%',
  height: '100%',
};
interface MyProps { series: object[]; title?: string; xAxisData: obejct[]; }

export default class LineCharts extends React.Component<MyProps, {}> {
  constructor(props) {
    super(props);
    const { series, title, xAxisData } = this.props;
    option.series = series;
    option.title.text = title;
    option.xAxis.data = xAxisData;
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
  // 绘图
  drawCharts = (option) => {
    const myDiv = echarts.init(document.getElementById(this.state.chartKey));
    myDiv.showLoading();
    myDiv.setOption(option);
    myDiv.hideLoading();
  }

  componentWillReceiveProps(nextProps) {
    const { series } = this.props;
    const { option } = this.state;
    if (nextProps.series && nextProps.series != series) {
      const newOption = Object.assign({}, option, { series: nextProps.series });
      this.setState({
        option: newOption,
      });
      this.drawCharts(newOption);
    }
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
