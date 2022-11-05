import React from "react";
import SystemCard from "./systemCard";
import {GetSystems} from "../../api/api";
import {notify} from "../../components/notifier";

export default class Systems extends React.Component {

    componentDidMount() {
        GetSystems().then((res) => {
            if(res.status === 200) {
                this.props.set_systems(res.data);
            }
        }).catch((err) => {
            console.log(err);
            notify("Failed to fetch systems", "failed");
        })
    }

    render() {
        return (
            <div id={"systems"} className={"flex-1 flex flex-col mx-2 mt-8"}>
                <span className={"text-xl font-bold mx-2 mb-5 block"}>Your Systems</span>
                {
                    this.props.systems.map((s, i) => <SystemCard key={i} data={s} set_as={this.props.set_as} active_systems={this.props.active_systems}/>)
                }
                <SystemCard/>
            </div>
        )
    }
}
