import React from "react";
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';

let arr = {
    // cpu: [...]
    // mem: [...]
}

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.chart = null;
        if(!arr.hasOwnProperty(this.props.id)) {
            if(typeof this.props.stats === "number") {
                arr[this.props.id] = {0: []}
            } else {
                arr[this.props.id] = {cpu: [], mem: [], disk: []}

            }
        }
    }

    componentDidMount() {
        if(!this.chart) {
            this.chart = Chart.getChart(document.getElementById(this.props.id).getContext('2d'));
        }
        if(typeof this.props.stats === "number") {
            if(arr[this.props.id][0].length === 60) {
                arr[this.props.id][0].shift();
            }
            arr[this.props.id][0].push(this.props.stats);
        } else {
            for(let i in arr[this.props.id]) {
                if(arr[this.props.id][i].length === 60) {
                    arr[this.props.id][i].shift();
                }
                arr[this.props.id][i].push(this.props.stats[i]);
            }
        }
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
                    display: typeof this.props.stats === 'object'
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
                    max: typeof this.props.stats === 'number' ? Math.min(Math.max(...arr[this.props.id][0]) + 10, 100) : 100,
                    min: typeof this.props.stats === 'number' ? Math.max(Math.min(...arr[this.props.id][0]) - 10, 0) : 0,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
        const data = {
            labels,
            datasets: [
                ...Object.keys(arr[this.props.id]).map((k) => {
                   return {
                       label: k,
                       data: arr[this.props.id][k]
                   }
               })
            ]
        }
        console.log(this.props.id, data);

        return (
            <Line id={this.props.id} options={options} data={data}/>
        )
    }
}

export default Graph;
