import React, {Component} from 'react';
import Chart from 'chart.js';

import { connect } from 'react-redux';
import { chartDataSelector } from './../redux/selectors/chartDataSelector';

class LineChart extends Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

      componentDidUpdate() {
        this.myChart.data.labels = this.props.chart.lineData.map(d => new Date(d.timestamp).toLocaleTimeString("en-US") );
        this.myChart.data.datasets[0].data = this.props.chart.lineData.map(d => d.value);
        this.myChart.update();
      }

      componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
          type: 'line',
          data: {
            labels:this.props.chart.lineData.map(d => d.timestamp),
            datasets: [{
                label: 'LINE CHART',
              data: this.props.chart.lineData.map(d => d.value),
            }]
          }
        });
      }
    
      render() {
        return   <canvas ref={this.chartRef} /> 
    }
}

const mapStateToProps = (state) => ({
    chart: chartDataSelector(state)
})
export default connect(mapStateToProps)(LineChart)