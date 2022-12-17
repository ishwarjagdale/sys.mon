import React from 'react';
import {DeleteLogs, GetLogs} from "../../api/api";
import Button from "../../components/Button";
import {notify} from "../../components/notifier";
import Topbar from "../../components/Topbar";

class ActivityLogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        DeleteLogs().then((res) => {
            if(res.status === 200) {
                notify("Logs deleted", 'success');
            }
        }).catch((e) => {
            notify(e, 'failed');
        })
    }

    componentDidMount() {
        GetLogs().then((res) => {
            if(res.status === 200) {
                this.setState({alerts: res.data.logs});
            }
        })
    }

    render() {
        return (
            <div className={"flex flex-col h-full lg:m-2 py-6 px-4 lg:p-8 flex-1"}>
                <Topbar />
                <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex py-8 flex-col"}>
                <div className={"flex py-6 font-bold text-xl lg:text-3xl text-gray-400 items-center mx-2"}>
                    <span className={"mr-2"}>Dashboard > </span>
                    <span className={"text-gray-800 text-highlight"}>Alerts</span>
                    </div>
                    <div className={"flex justify-end my-4"}>
                        {this.state.alerts && this.state.alerts.length !== 0 && <Button type={'button'} fill={false} onclick={this.handleDelete} border={2}
                                 classList={"rounded-xl text-sm flex items-center"}>
                            <i className={"fas fa-close text-md mr-2"}/>
                            <span>Clear All</span>
                        </Button>}
                    </div>
                    <div className={"flex-1 flex flex-col mt-4"}>
                        {
                            this.state.alerts ?
                            this.state.alerts.length ?

                            this.state.alerts.map((k, i) =>

                                // <tr key={k.activity_id}>
                                // <td>{k.type}</td>
                                // <td>{k.description}</td>
                                // <td>{new Date(k.date_happened).toDateString()} {new Date(k.date_happened).toLocaleTimeString()}</td>
                                // </tr>
                                <div className={"flex flex-col border p-4 px-6 mb-4 rounded-xl"} key={i}>
                                    <div className={"flex items-center justify-between"}>
                                        <span className={"font-bold whitespace-nowrap"}>{k.name}</span>
                                        <span className={"sec-text text-xs ml-4 overflow-hidden"}>{new Date(k.date_happened).toString()}</span>
                                    </div>
                                    <p className={"mt-4 text-sm"}>{k.message} - {k.description}</p>
                                </div>

                            )
                                :
                                <span className={"mx-2"}>No logs</span>
                            :
                            <i className={"m-auto animate-spin p-8 fas fa-spinner"} />
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default ActivityLogs;
