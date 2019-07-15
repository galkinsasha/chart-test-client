import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';

import { chartDataSelector } from './../redux/selectors/chartDataSelector';

class BarChart extends Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

      componentDidUpdate() {
        this.myChart.data.labels = this.props.chart.barData.map(d => `${d.key*10} - ${d.key*10+10}` )
        this.myChart.data.datasets[0].data = this.props.chart.barData.map(d => d.value)
        this.myChart.update();
      }

      componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
          type: 'bar',
          options : {
            scales: {
                yAxes: [{
                    
                    ticks: {
                        min: 0,
                        suggestedMin: 1,
                        suggestedMax: 3,
                        stepSize: 1
                    }
                }]
            }
        },
          
          data: {
            labels:this.props.chart.barData.map( d => `${d.key*10} - ${d.key*10+10}`),
            datasets: [{
                label: 'BAR CHART',
                data: this.props.chart.barData.map(d => d.value)
            }]
          }
        });
      }
    
      render() {
        return  <canvas ref={this.chartRef} /> 
      }
}

const mapStateToProps = (state) => ({
    chart: chartDataSelector(state)
})

// завдяки Redux  ми отримали дані зі Store в якості props (this.props.chart)
export default connect(mapStateToProps)(BarChart)