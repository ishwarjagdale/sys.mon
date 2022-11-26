import React from "react";
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';

let arr = {
    // cpu: [...]
    // mem: [...]
}

class PerformanceGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.chart = null;
        if(!arr.hasOwnProperty(this.props.id))
            arr[this.props.id] = new Array(60).fill(0)
    }

    componentDidMount() {
        if(!this.chart) {
            this.chart = Chart.getChart(document.getElementById(this.props.id).getContext('2d'));
        }
        if(arr[this.props.id].length === 60) {
            arr[this.props.id].shift();
        }
        arr[this.props.id].push(Number.parseFloat(this.props.stats?.slice(0, -1)));
        this.chart?.update()
    }

    render() {
        const labels = [0,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59,
        ]
        const options = {
            responsive: true,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    display: false,
                    max: 60,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    },
                    border: {
                        display: true
                    },
                },
                y: {
                    display: true,
                    max: Math.min(Math.max(...arr[this.props.id]) + 10, 100),
                    min: Math.max(Math.min(...arr[this.props.id]) - 10, 0),
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
        const data = {
            labels,
            datasets: [
                {
                    data: arr[this.props.id]
                }
            ]
        }

        return (
            <Line id={this.props.id} options={options} data={data}/>
        )
    }
}

export default PerformanceGraphs;
