import React from "react";
import {GetSystems} from "../../api/api";
import {useParams} from "react-router-dom";

class SystemPage extends React.Component {
    constructor(props) {
        super(props);

        this.conn = null;
        this.state = {
            data: false,
            status: 'connecting...'
        };

        this.createConnection = this.createConnection.bind(this);
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
        }).then(() => {

        });
    }

    render() {
        return (
            this.state.data ?
                <div className={"flex flex-col h-full flex-1"}>
                    <div id={"top-bar"} className={"m-2 p-6 pb-0 lg:p-8 lg:pb-0 flex items-center flex-1 justify-between"}>
                        <div className={"flex items-center m-2 w-full border-b"}>
                            <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 py-4 cursor-pointer"}/>
                            <span className={"font-bold text-lg text-gray-500 block"}>Dashboard</span>
                        </div>
                    </div>
                    <div className={"flex py-8 px-2 mx-2 lg:px-8 items-center"}>
                        <i className={`fab fa-${this.state.system.os.toLowerCase()} text-9xl px-8`}/>
                        <div className={"flex flex-col flex-1 mx-2"}>
                            <span className={"text-2xl font-bold my-4 text-white"}>{this.state.system.name}</span>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>IP address:</span><span>{this.state.system.ip_addr.toString().split(":")[0]}</span></div>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Operating System:</span><span>{this.state.system.os}</span></div><br/>
                            <div className={"flex items-center"}><span className={"opacity-60 mr-2"}>Status:</span><p onClick={this.createConnection} className={`cursor-pointer ${this.state.status === 'online' ? 'text-green-600' :
                                this.state.status === 'offline' ? 'text-red-500' : 'text-gray-400'}`}>{this.state.system.enable_mon ? this.state.status : 'monitoring disabled'}</p></div>
                        </div>
                    </div>
                    <div className={"flex "}>
                        <div className={"flex flex-col flex-1"}>

                        </div>
                        <div className={"flex flex-[7]"}>

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
