import React from "react";
import {GetLogs} from "../../api/api";

class Logs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        GetLogs(this.props.id).then((res) => {
            if(res.status === 200) {
                this.setState({logs: res.data[this.props.id]})
            }
        })
    }

    render() {

        return this.state.logs && this.state.logs.length ?
            <>
                <table className={"lg:m-4 border-2"} >
                    <thead className={"m-2"}>
                    <tr>
                        <th>Activity Type</th>
                        <th>Description</th>
                        <th>Date Happened</th>
                    </tr>
                    </thead>
                    <tbody className={"text-sm"}>
                    {
                        this.state.logs.map((k) =>
                            <tr key={k.activity_id}>
                                <td>{k.type}</td>
                                <td>{k.description}</td>
                                <td>{new Date(k.date_happened).toDateString()} {new Date(k.date_happened).toLocaleTimeString()}</td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </>
            :
            <></>
    }

}

export default Logs;
