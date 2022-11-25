import React from "react";
import {DeleteSystem, GetSystems, UpdateSystem} from "../../api/api";
import {useParams} from "react-router-dom";
import Button from "../../components/Button";
import {notify} from "../../components/notifier";

import PerformanceGraphs from "./PerformanceGraphs";

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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleUpdate(e, attr) {
        e.preventDefault();
        let payload = null;
        switch (attr) {
            case 'enable_mon': {
                payload = {enable_mon: !this.state.system.enable_mon};
                break;
            }
            case 'alert': {
                payload = {alert: false};
                break;
            }
            case 'name': {
                if(e.target.name.value !== this.state.system.name)
                    payload = {name: e.target.name.value};
                break;
            }
            default: {}
        }
        if(payload)
        UpdateSystem(this.state.system.sys_id, payload).then((res) => {
            if(res.status === 200) {
                this.setState({system: res.data});
                notify('Changes saved!', 'success');
            } else {
                notify(`${res.status} Changes failed!`, 'failed');
            }
        })
    }

    handleDelete() {
        if(window.confirm("Are you sure?"))
        DeleteSystem(this.state.system.sys_id).then((res) => {
            if(res.status === 200) {
                notify('System removed successfully!', 'success');
                window.location.href = '/dashboard';
            } else {
                notify(`${res.status} System removal failed!`, 'failed');
            }
        })
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
            if(this.conn && this.state.spec) {
                return <RenderSpecs spec={this.state.spec} />
            }
            return <></>
        }

        const Performance = () => {
            return this.state.stats ? <>
                <div className={"flex flex-col w-full mb-4"}>
                    <div className={"my-4 pb-2 border-b flex items-center justify-between w-full"}>
                        <span><i className={"fas fa-microchip mx-2"}/>CPU</span>
                        <span className={"text-sm"}>{this.state.spec && this.state.spec["Processor"]["Processor Name"]}</span>
                    </div>
                    <PerformanceGraphs id={'cpu-chart'} stats={this.state.stats.cpu}/>
                </div>
                <div className={"flex flex-col w-full mb-4"}>
                    <div className={"my-4 pb-2 border-b flex items-center justify-between w-full"}>
                        <span><i className={"fas fa-memory mx-2"}/>Memory</span>
                    </div>
                    <PerformanceGraphs id={'mem-chart'} stats={this.state.stats.mem}/>
                </div>
            </> : <></>

        }

        const Settings = () => <>
            <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"sec-text mr-4"}>Name</span>
                    <p className={"text-sm sec-text sec-text"}>A name for the system, helpful for you to recognize.</p>
                </div>
                <form onSubmit={(e) => this.handleUpdate(e, 'name')} className={"form-element"}>
                    <input type={"text"} name={'name'} placeholder={"Name"} defaultValue={this.state.system.name} className={"sec-text"}/>
                </form>
            </div>
            <div className={"flex py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"sec-text mr-4"}>Enable Mon</span>
                    <p className={"text-sm sec-text sec-text"}>Enable or disable Mon, Mon is an monitoring agent installed on the system.</p>
                </div>
                <i onClick={(e) => this.handleUpdate(e, 'enable_mon')} className={`border-2 cursor-pointer flex items-center p-1 justify-${this.state.system.enable_mon ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                    <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.enable_mon ? 'bg-green-400': 'bg-red-400'}`}></i>
                </i>
            </div>
            <div className={"flex py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"sec-text mr-4"}>Email Alerts</span>
                    <p className={"text-sm sec-text sec-text"}>Receive alerts of the system's activities on registered email address.</p>
                </div>
                <i onClick={(e) => this.handleUpdate(e, 'alert')} className={`border-2 cursor-pointer flex items-center p-1 justify-${this.state.system.alert ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                    <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.alert ? 'bg-green-400': 'bg-red-400'}`}></i>
                </i>
            </div>
            <hr className={"border-slate-400 my-4"}/>
            <div className={"flex flex-col lg:flex-row py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"text-red-700 mr-4"}>Remove System</span>
                    <p className={"text-sm sec-text sec-text"}>This will permanently remove mon and unregistered this system from your account.<br/>All the data and logs will be deleted permanently!</p>
                </div>
                <Button border={2} type={'button'} onclick={this.handleDelete} fill={true} classList={"danger-btn mt-4 lg:m-0 w-full lg:w-fit"}>
                    Remove
                </Button>
            </div>
        </>

        return (
            this.state.data ?
                <div className={"flex flex-col h-full m-2 py-6 px-4 lg:p-8 flex-1"}>
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
                    <div className={"flex py-8 items-center"}>
                        <i className={`hidden lg:block fab fa-${this.state.system.os.toLowerCase()} text-9xl px-8`}/>
                        <div className={"flex flex-col flex-1 mx-2"}>
                            <span className={"text-2xl font-bold my-4 text-white"}>{this.state.system.name}</span>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>IP address:</span><span>{this.state.system.ip_addr ? this.state.system.ip_addr.toString().split(":")[0] : 'null'}</span></div>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Operating System:</span><span>{this.state.system.os}</span></div><br/>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Status:</span><p onClick={this.createConnection} className={`cursor-pointer ${this.state.system.enable_mon ? 
                                this.state.status === 'online' ? 'text-green-600' : this.state.status === 'offline' ? 'text-red-500' : 'text-gray-400' : 'text-gray-400'}`}>{this.state.system.enable_mon ? this.state.status : 'monitoring disabled'}</p></div>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <ul className={"flex tabs w-full justify-evenly mb-4 lg:mb-0 lg:justify-start border-b"}>
                            {
                                Object.keys(this.tabs).map((k) =>
                                    <li onClick={(e) => this.handleTab(e, k)} className={this.state.activeTab === this.tabs[k][0] ? "active-tab": undefined}><i className={`fas ${this.tabs[k][1]}`}/><span className={'hidden capitalize lg:inline-block'}>{k}</span></li>)
                            }
                        </ul>
                        <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}>
                            {this.state.activeTab === 0 && <Specifications/>}
                            {this.state.activeTab === 1 && <Performance/>}
                            {this.state.activeTab === 4 && <Settings/>}
                        </div>
                    </div>
                </div>
                :
                <></>
        );
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    )

}

export default withRouter(SystemPage);
