import React from "react";
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

class SystemPerformanceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.conn = null;
        this.state = {
            timePeriod: 'hour',
            unit: {
                'hour': 'hour',
                'week': 'day',
                'month': 'week'
            }
        };

        this.createConnection = this.createConnection.bind(this);
        this.handleOption = this.handleOption.bind(this);
    }

    handleOption(e) {
        this.setState({timePeriod: e.target.value});
        this.send(`report-${e.target.value}`);
    }

    send = (message) => {
        if(this.conn.readyState === 1) {
            this.conn.send(message);
        } else {
            setTimeout(this.send, 1000, message)
        }
    }

    createConnection() {
        if (this.props.data && this.props.data.enable_mon && this.props.data.ip_addr) {
            this.conn = new WebSocket(`wss://${this.props.data.ip_addr}/`);
            this.conn.onopen = () => {
                this.setState({active: true});
            }
            this.conn.onmessage = (event) => {
                this.setState({...JSON.parse(event.data)});
                console.log(this.state);
            }
            this.conn.onclose = (event) => {
                this.setState({active: false, stats: {}});
                console.log("this.conn closed", this.props.data.ip_addr);
            }
            console.log(this.conn);
        }
    }

    componentDidMount() {
        this.createConnection();
        this.send(`report-${this.state.timePeriod}`);
    }

    render() {
        if(this.state.report) {
            const data = {

                datasets: [
                    ...Object.keys(this.state.report).map((k) => {
                        return {
                            label: k,
                            data: Object.keys(this.state.report[k]).map((kk) => {
                                return {
                                    x: Date.parse(kk),
                                    y: this.state.report[k][kk]
                                }
                            })
                        }
                    })
                ]
            }

            console.log(data);
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: {
                        type: 'time',
                        time: {
                            unit: this.state.unit[this.state.timePeriod]
                        },
                    },
                }
            };
            return (
                <>
                    <div className={"border-2 w-full rounded-md p-4 mb-2 flex flex-col lg:flex-row lg:items-center"} aria-label={this.state.active ? "Active" : "DC"}>
                        <div className={"flex flex-row items-center flex-1"}>
                            <i onClick={this.createConnection} className={`fab fa-${this.props.data.os.toString().toLowerCase()} text-${this.state.active? "green" : "gray"}-600 cursor-pointer my-6 mx-12 text-2xl text-center`}/>
                            <div className={"flex flex-col items-start w-fit mr-auto"}>
                                <span className={"text-lg"}>{this.props.data.name}</span>
                            </div>
                        </div>
                        <div className={"mx-6"}>
                            { this.state.active &&
                                <select onInput={this.handleOption} className={"w-full rounded p-2 px-4 outline-0 text-sm"} defaultValue={this.state.timePeriod}>
                                    <option value={'hour'}>24 Hours</option>
                                    <option value={'week'}>Last Week</option>
                                    <option value={'month'}>Last Month</option>
                                </select>
                            }
                        </div>
                    </div>
                    <Line id={this.props.data.sys_id} className={"max-h-[400px] w-full"} data={data} options={options} />
                </>
            )
        }
        return <>
            <i className={"fas fa-spinner"} />
        </>
    }

}

export default SystemPerformanceHistory;
