import "./Dashboard.css";
import React from "react";
import {GetSystems} from "../../api/api";
import {notify} from "../../components/notifier";
import SystemCard from "./systemCard";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systems: [],
            active_systems: new Set(),
            user: JSON.parse(localStorage.getItem("user"))
        }

        this.handleActive = this.handleActive.bind(this);
    }

    componentDidMount() {
        GetSystems().then((res) => {
            if(res.status === 200) {
                this.setState({systems: res.data});
            }
        }).catch((err) => {
            console.log(err);
            notify("Failed to fetch systems", "failed");
        })
    }

    handleActive(system, discard=false) {
        if(discard) {
            let temp = this.state.active_systems;
            temp.delete(system);
            this.setState({active_systems: temp})
        } else {
            this.setState({active_systems: this.state.active_systems.add(system)})
        }
    }

    render() {
        return (
            <div className={"flex-1 flex flex-col h-auto"}>
                <div className={"flex w-full h-full"}>
                    <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex py-8 px-2 lg:px-8 flex-col"}>
                        <div id={"systems"} className={"flex-1 flex flex-col mx-2 mt-8"}>
                            <span className={"text-xl font-bold mx-2 mb-5 block"}>Your Systems</span>
                            {
                                this.state.systems.map((s, i) => <SystemCard key={i} data={s} withGraph={true} handleActive={this.handleActive}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
