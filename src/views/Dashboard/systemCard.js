import {notify} from "../../components/notifier";
import React from "react";


class SystemCard extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.data) {
            this.conn = null;
        }
        this.state = {
            conn: null,
            active: false,
            stats: {
                cpu: undefined,
                mem: undefined,
                disk: undefined
            }
        }

        this.getStats = this.getStats.bind(this);
        this.createConnection = this.createConnection.bind(this);
    }

    createConnection() {
        if (this.props.data) {
            this.conn = new WebSocket(`wss://${this.props.data.ip_addr}/`);
            this.conn.onopen = () => {
                this.setState({active: true});
                this.props.set_as(new Set([...this.props.active_systems.add(this.props.data.sys_id)]));
                this.conn.send("Connection from " + window.location.href);
            }
            this.conn.onmessage = (event) => {
                // console.log(event.data);
                this.setState({stats: {...this.state.stats, ...JSON.parse(event.data)}});
                this.getStats();
            }
            this.conn.onclose = (event) => {
                this.setState({active: false, stats: {}});
                let temp = [...this.props.active_systems];
                if(temp.includes(this.props.data.sys_id))
                    temp.pop(this.props.data.sys_id);
                console.log(temp);
                this.props.set_as(new Set(temp));
                console.log("this.conn closed", this.props.data.ip_addr);
            }
            console.log(this.conn);
        }
    }

    getStats() {
        this.conn.send("cpd");
        // this.getStats();
    }

    componentDidMount() {
            this.createConnection();
    }

    render() {
        if (this.props.data === undefined)
            return (
                <div
                    className={"border-2 text-gray-800 border-dashed w-full rounded-md p-6 mb-2 flex flex-col items-center justify-center cursor-pointer"}>
                    <i className={"fas fa-plus"}/>
                    <span className={"mt-4"}>Add new system</span>
                </div>
            )
        return (
            <div className={"border-2 w-full rounded-md p-4 mb-2 flex items-center justify-between"} aria-label={this.state.active ? "Active" : "DC"}>
                <i className={"fas fa-server p-6 lg:p-8 md:px-10 text-center"}/>
                <div className={"flex flex-col lg:flex-row lg:items-center flex-1"}>
                    <div className={"flex flex-col items-start w-fit mx-4 mr-auto"}>
                        <div className={"flex items-center"}>
                            <a className={"text-lg font-bold"} href={`/system/${this.props.data.sys_id}`}>{this.props.data.name}</a>
                            <span onClick={this.createConnection} className={`ml-2 text-${this.state.active? "green" : "gray"}-600 font-bold text-sm cursor-pointer`}>({this.state.active ? "Active" : "DC"})</span>
                        </div>
                        <span className={"text-gray-600 text-sm cursor-pointer"} onClick={(e) => {
                            navigator.clipboard.writeText(e.target.innerText);
                            notify("Copied to clipboard", 'success');
                        }}>{this.props.data.ip_addr}</span>
                    </div>
                    {
                        this.state.active && <div className={"flex items-center my-4"}>
                            <div className={"flex items-center mx-4 block"}>
                                <i className={"w-[18px] text-center fas fa-microchip mr-2"}/>
                                <span className={"text-lg font-bold text-green-600"}>{this.state.stats.cpu}</span>
                            </div>
                            <div className={"flex items-center mx-4 block"}>
                                <i className={"w-[18px] text-center fas fa-memory mr-2"}/>
                                <span className={"text-lg font-bold text-yellow-600"}>{this.state.stats.mem}</span>
                            </div>
                            <div className={"flex items-center mx-4 block"}>
                                <i className={"w-[18px] text-center fas fa-database mr-2"}/>
                                <span className={"text-lg font-bold text-red-600"}>{this.state.stats.disk}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>)
    }
}

export default SystemCard;
