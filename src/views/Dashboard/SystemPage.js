import React from "react";
import {DeleteSystem, GetSystems, UpdateSystem} from "../../api/api";
import {useParams} from "react-router-dom";
import Button from "../../components/Button";
import {notify} from "../../components/notifier";

class SystemPage extends React.Component {
    constructor(props) {
        super(props);

        this.conn = null;
        this.state = {
            data: false,
            status: 'connecting...',
            activeTab: 0
        };

        this.createConnection = this.createConnection.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    createConnection() {
        if(this.state.system?.enable_mon) {
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
                console.log(JSON.parse(m.data));
                this.setState({
                    spec: JSON.parse(m.data)
                })
            }
        }

    }

    handleTab(e, index) {
        document.querySelector("li[class=active-tab]")?.classList.remove('active-tab');
        if(e.target.nodeName.toLowerCase() === 'i') {
            e.target.parentElement.classList.add('active-tab')
        } else {
            e.target.classList.add('active-tab')
        }
        this.setState({activeTab: index});
    }

    componentDidMount() {
        GetSystems(this.props.params.system_id).then((res) => {
            if(res.status === 200) {
                this.setState({
                    data: true,
                    system: res.data
                });
                if(res.data.enable_mon)
                        this.createConnection();
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

        const RenderSpecs = ({spec}) => {
            return Object.keys(spec).map((k) => {
                if(spec[k] instanceof Object) {
                    return <>
                        <span className={"my-4 pb-2 border-b"}>{k}</span>
                        {
                            <RenderSpecs spec={spec[k]}/>
                        }
                    </>
                }
                return <div className={"flex py-2 lg:items-center justify-between"}>
                    <span className={"opacity-60 sec-text mr-4"}>{k}:</span>
                    <span className={"sec-text"}>{spec[k]}</span>
                </div>
            })
        }

        const Specifications = () => {
            if(this.conn && this.state.spec) {
                return <RenderSpecs spec={this.state.spec} />
            }
            return <span className={"opacity-60"}><i className={"fas fa-exclamation-triangle mr-2"}/>Requires system to be online</span>
        }

        const Settings = () => <>
            <div className={"flex flex-col lg:flex-row py-4 lg:items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"text-lg sec-text mr-4"}>Name</span>
                    <p className={"text-sm sec-text sec-text"}>A name for the system, helpful for you to recognize.</p>
                </div>
                <form onSubmit={(e) => this.handleUpdate(e, 'name')} className={"form-element"}>
                    <input type={"text"} name={'name'} placeholder={"Name"} defaultValue={this.state.system.name} className={"sec-text"}/>
                </form>
            </div>
            <div className={"flex py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"text-lg sec-text mr-4"}>Enable Mon</span>
                    <p className={"text-sm sec-text sec-text"}>Enable or disable Mon, Mon is an monitoring agent installed on the system.</p>
                </div>
                <i onClick={(e) => this.handleUpdate(e, 'enable_mon')} className={`border-2 cursor-pointer flex items-center p-1 justify-${this.state.system.enable_mon ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                    <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.enable_mon ? 'bg-green-400': 'bg-red-400'}`}></i>
                </i>
            </div>
            <div className={"flex py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"text-lg sec-text mr-4"}>Email Alerts</span>
                    <p className={"text-sm sec-text sec-text"}>Receive alerts of the system's activities on registered email address.</p>
                </div>
                <i onClick={(e) => this.handleUpdate(e, 'alert')} className={`border-2 cursor-pointer flex items-center p-1 justify-${this.state.system.alert ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                    <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.alert ? 'bg-green-400': 'bg-red-400'}`}></i>
                </i>
            </div>
            <hr className={"border-slate-400 my-4"}/>
            <div className={"flex py-4 items-center justify-between"}>
                <div className={"flex flex-col mr-4"}>
                    <span className={"text-lg text-red-700 mr-4"}>Remove System</span>
                    <p className={"text-sm sec-text sec-text"}>This will permanently remove mon and unregistered this system from your account.<br/>All the data and logs will be deleted permanently!</p>
                </div>
                <Button border={2} type={'button'} onclick={this.handleDelete} fill={true} classList={"danger-btn"}>
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
                        <ul className={"flex tabs w-full border-b"}>
                            <li onClick={(e) => this.handleTab(e, 0)} className={this.state.activeTab === 0 ? "active-tab": undefined}><i className={"fas fa-info-circle"}/>Specification</li>
                            <li onClick={(e) => this.handleTab(e, 1)} className={this.state.activeTab === 1 ? "active-tab": undefined}><i className={"fas fa-line-chart"}/>Performance</li>
                            <li onClick={(e) => this.handleTab(e, 2)} className={this.state.activeTab === 2 ? "active-tab": undefined}><i className={"fas fa-file-lines"}/>Activity Logs</li>
                            <li onClick={(e) => this.handleTab(e, 3)} className={this.state.activeTab === 3 ? "active-tab": undefined}><i className={"fas fa-circle-exclamation"}/>Rules</li>
                            <li onClick={(e) => this.handleTab(e, 4)} className={this.state.activeTab === 4 ? "active-tab": undefined}><i className={"fas fa-gear"}/>Settings</li>
                        </ul>
                        <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}>
                            {this.state.activeTab === 0 && <Specifications/>}
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
