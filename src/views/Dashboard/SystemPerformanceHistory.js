import React from "react";
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';

class SystemPerformanceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.conn = null;
        this.state = {};

        this.createConnection = this.createConnection.bind(this);
    }

    createConnection() {
        if (this.props.data && this.props.data.enable_mon && this.props.data.ip_addr) {
            this.conn = new WebSocket(`wss://${this.props.data.ip_addr}/`);
            this.conn.onopen = () => {
                this.setState({active: true});
            }
            this.conn.onmessage = (event) => {
                this.setState({...JSON.parse(event.data)});
            }
            this.conn.onclose = (event) => {
                this.setState({active: false, stats: {}});
                console.log("this.conn closed", this.props.data.ip_addr);
            }
            console.log(this.conn);
        }
    }

    componentDidMount() {
        this.createConnection()
    }

    render() {
        const labels = [Date.parse("18:00"), Date.parse("23:00")]
        const data = {
            labels,
            datasets: [
                {
                    label: "cpu",
                    data: [10, 20]
                }, {
                    label: "mem",
                    data: [20, 30]
                }, {
                    label: "disk",
                    data: [60, 70]
                }
            ]
        }
        const options = {
            scales: {
                xAxes: {
                    type: 'time',
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
                            <select onInput={this.handleOption} className={"w-full rounded p-2 px-4 outline-0 text-sm"}>
                                <option value={0}>24 Hours</option>
                                <option value={1}>Last Week</option>
                                <option value={2}>Last Month</option>
                            </select>
                        }
                    </div>
                </div>
                <Line redraw={true} id={this.props.data.sys_id} data={data} options={options} />
            </>
        )
    }

}

export default SystemPerformanceHistory;
