import React from "react";
import {GetSystems} from "../../api/api";
import {useParams} from "react-router-dom";

class SystemPage extends React.Component {
    constructor(props) {
        super(props);

        this.conn = null;
        this.state = {
            data: false,
            status: 'connecting...',
        };

        this.createConnection = this.createConnection.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

    createConnection() {
        if(this.state.system?.enable_mon) {
            this.conn = new WebSocket(`wss://${this.state.system.ip_addr}`);
            this.conn.onopen = () => {
                this.setState({
                    status: 'online'
                })
            }
            this.conn.onclose = () => {
                this.setState({
                    status: 'offline'
                })
            }
        }

    }

    handleTab(e) {
        document.querySelector("li[class=active-tab]")?.classList.remove('active-tab');
        if(e.target.nodeName.toLowerCase() === 'i') {
            e.target.parentElement.classList.add('active-tab')
        } else {
            e.target.classList.add('active-tab')
        }
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

    render() {
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
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>IP address:</span><span>{this.state.system.ip_addr.toString().split(":")[0]}</span></div>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Operating System:</span><span>{this.state.system.os}</span></div><br/>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Status:</span><p onClick={this.createConnection} className={`cursor-pointer ${this.state.status === 'online' ? 'text-green-600' :
                                this.state.status === 'offline' ? 'text-red-500' : 'text-gray-400'}`}>{this.state.system.enable_mon ? this.state.status : 'monitoring disabled'}</p></div>
                        </div>
                    </div>
                    <div className={"flex"}>
                        <ul className={"flex tabs w-full border-b"}>
                            <li onClick={this.handleTab} className={"active-tab"}><i className={"fas fa-info-circle"}/>Specification</li>
                            <li onClick={this.handleTab}><i className={"fas fa-line-chart"}/>Performance</li>
                            <li onClick={this.handleTab}><i className={"fas fa-file-lines"}/>Activity Logs</li>
                            <li onClick={this.handleTab}><i className={"fas fa-circle-exclamation"}/>Rules</li>
                            <li onClick={this.handleTab}><i className={"fas fa-gear"}/>Settings</li>
                        </ul>
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
