import React from "react";
import {GetSystems} from "../../api/api";
import {useParams} from "react-router-dom";

import Graph from "./Graph";
import SystemLogs from "./SystemLogs";
import SystemSettings from "./SystemSettings";
import SystemRules from "./SystemRules";

class SystemPage extends React.Component {
    constructor(props) {
        super(props);

        this.conn = null;
        this.tabs = {
            specifications: [0, "fa-info-circle"],
            performance: [1, "fa-line-chart"],
            logs: [2, "fa-file-lines"],
            rules: [3, "fa-info-circle"],
            settings: [4, "fa-gear"]
        }
        this.state = {
            data: false,
            status: 'connecting...',
            activeTab: 0
        };

        this.createConnection = this.createConnection.bind(this);
        this.handleTab = this.handleTab.bind(this);

        this.getStats = this.getStats.bind(this);
    }

    createConnection() {
        if(!this.conn && this.state.system?.enable_mon) {
            this.conn = new WebSocket(`wss://${this.state.system.ip_addr}`);
            this.conn.onopen = () => {
                this.conn.send('spec');
                this.setState({
                    status: 'online'
                })
            }
            this.conn.onclose = () => {
                this.setState({
                    status: 'offline'
                })
            }
            this.conn.onmessage = (m) => {
                this.setState({
                    ...JSON.parse(m.data)
                })
                this.getStats();
            }
        }

    }

    getStats() {
        this.conn.send("cpd");
    }

    handleTab(e, tab) {
        document.querySelector("li[class=active-tab]")?.classList.remove('active-tab');
        if(['i', 'span'].includes(e.target.nodeName.toLowerCase())) {
            e.target.parentElement.classList.add('active-tab')
        } else {
            e.target.classList.add('active-tab')
        }
        this.setState({activeTab: this.tabs[tab][0]});
    }

    componentDidMount() {
        GetSystems(this.props.params.system_id).then((res) => {
            if(res.status === 200) {
                this.setState({
                    data: true,
                    system: res.data
                });
                console.log(this.state)
            }
        });
    }

    render() {
        this.createConnection();
        const RenderSpecs = ({spec}) => {
            return Object.keys(spec).map((k) => {
                if(spec[k] instanceof Object) {
                    return <>
                        <span key={k} className={"my-4 pb-2 border-b"}>{k}</span>
                        {
                            <RenderSpecs spec={spec[k]}/>
                        }
                    </>
                }
                return <div key={k} className={"flex py-2 lg:items-center justify-between"}>
                    <span className={"opacity-60 text-sm lg:text-[16px] sec-text mr-4"}>{k}:</span>
                    <span className={"sec-text text-sm lg:text-[16px] text-right"}>{spec[k]}</span>
                </div>
            })
        }

        const Specifications = () => {
            if(this.conn && this.state.spec)
                return <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}><RenderSpecs spec={this.state.spec} /></div>
            return <i className={"m-auto p-8 animate-spin fas fa-spinner"} />
        }

        const Performance = () => {
            if(this.state.stats)
                return <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}>
                    <div className={"flex flex-col w-full mb-4"}>
                        <div className={"my-4 pb-2 border-b flex items-center justify-between w-full"}>
                            <span><i className={"fas fa-microchip mx-2"}/>CPU</span>
                            <span className={"text-sm"}>{this.state.spec && this.state.spec["Processor"]["Processor Name"]}</span>
                        </div>
                        <Graph id={'cpu-chart'} stats={this.state.stats.cpu}/>
                    </div>
                    <div className={"flex flex-col w-full mb-4"}>
                        <div className={"my-4 pb-2 border-b flex items-center justify-between w-full"}>
                            <span><i className={"fas fa-memory mx-2"}/>Memory</span>
                        </div>
                        <Graph id={'mem-chart'} stats={this.state.stats.mem}/>
                    </div>
                </div>
            return <i className={"m-auto p-8 animate-spin fas fa-spinner"} />

        }

        if(this.state.data)
            return <div className={"flex flex-col h-full lg:m-2 py-6 px-4 lg:p-8 flex-1"}>
                <div id={"top-bar"} className={" pb-0 lg:pb-0 flex items-center flex-1 justify-between"}>
                    <div className={"flex items-center m-2 w-full border-b"}>
                        <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 py-4 cursor-pointer"}/>
                        <span className={"font-bold text-lg text-gray-500 block"}>Dashboard</span>
                    </div>
                    <i className={"fas fa-bars-staggered md:hidden rounded p-2 z-50 cursor-pointer"} onClick={(e) => {
                        e.target.classList.toggle("bg-[#161b22]");
                        document.getElementById("side-bar").classList.toggle("hidden");
                        document.getElementById("side-bar").classList.toggle("short-side");
                    }}/>
                </div>
                <div className={"flex flex-col lg:flex-row lg:items-center w-full"}>
                    <div className={"flex py-8 items-center"}>
                        <i className={`hidden lg:block fab fa-${this.state.system.os.toLowerCase()} text-9xl px-8`}/>
                        <div className={"flex flex-col flex-1 mx-2"}>
                            <span className={"text-2xl font-bold my-4"}>{this.state.system.name}</span>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>IP address:</span><span>{this.state.system.ip_addr ? this.state.system.ip_addr.toString().split(":")[0] : 'null'}</span></div>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Operating System:</span><span>{this.state.system.os}</span></div><br/>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Status:</span><p onClick={this.createConnection} className={`cursor-pointer ${this.state.system.enable_mon ?
                                this.state.status === 'online' ? 'text-green-600' : this.state.status === 'offline' ? 'text-red-500' : 'text-gray-400' : 'text-gray-400'}`}>{this.state.system.enable_mon ? this.state.status : 'monitoring disabled'}</p></div>
                        </div>
                    </div>
                    { this.state.stats && <div className={"flex pb-8 lg:pb-0 lg:flex-col items-center lg:items-start justify-evenly lg:ml-4 lg:pl-4 lg:border-l"}>
                        <div className={"flex items-center mx-2 lg:my-2 block"}>
                            <i className={"w-[18px] text-center fas fa-microchip mr-2"}/>
                            <span className={"text-lg font-bold text-green-600"}>{this.state.stats.cpu}%</span>
                        </div>
                        <div className={"flex items-center mx-2 lg:my-2 block"}>
                            <i className={"w-[18px] text-center fas fa-memory mr-2"}/>
                            <span className={"text-lg font-bold text-yellow-600"}>{this.state.stats.mem}%</span>
                        </div>
                        <div className={"flex items-center mx-2 lg:my-2 block"}>
                            <i className={"w-[18px] text-center fas fa-database mr-2"}/>
                            <span className={"text-lg font-bold text-red-600"}>{this.state.stats.disk}%</span>
                        </div>
                    </div>}
                </div>
                <div className={"flex flex-col mx-2 lg:mx-0"}>
                    <ul className={"flex tabs w-full justify-evenly mb-4 lg:mb-0 lg:justify-start border-b"}>
                        {
                            Object.keys(this.tabs).map((k) =>
                                <li onClick={(e) => this.handleTab(e, k)} className={this.state.activeTab === this.tabs[k][0] ? "active-tab": undefined}><i className={`fas ${this.tabs[k][1]}`}/><span className={'hidden capitalize lg:inline-block'}>{k}</span></li>)
                        }
                    </ul>

                        {this.state.activeTab === 0 && <Specifications/>}
                        {this.state.activeTab === 1 && <Performance/>}
                        {this.state.activeTab === 2 && <SystemLogs id={this.state.system.sys_id}/>}
                        {this.state.activeTab === 3 && <SystemRules id={this.state.system.sys_id} conn={this.conn}/>}
                        {this.state.activeTab === 4 && <SystemSettings system={this.state.system}/>}

                </div>
            </div>
        return <i className={"m-auto p-8 animate-spin fas fa-spinner"} />
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    )

}

export default withRouter(SystemPage);
