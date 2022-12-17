import "./Dashboard.css";
import React from "react";
import {GetSystems} from "../../api/api";
import {notify} from "../../components/notifier";
import SystemPerformanceHistory from "./SystemPerformanceHistory";
import Topbar from "../../components/Topbar";


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
            <div className={"flex flex-col h-full lg:m-2 py-6 px-4 lg:p-8 flex-1"}>
                <Topbar />
                <div id={"content"} className={"rounded-xl flex-1 h-full flex py-8 flex-col"}>
                <div className={"flex py-6 font-bold text-xl lg:text-3xl text-gray-400 items-center mx-2"}>
                    <span className={"mr-2"}>Dashboard > </span>
                    <span className={"text-gray-800 text-highlight"}>Performance</span>
                </div>
                <div id={"systems"} className={"flex-1 flex flex-col mt-4"}>
                    <span className={"text-lg font-bold mx-2 mb-5 block"}>Your Systems</span>
                    {
                        this.state.systems.map((s, i) => <SystemPerformanceHistory data={s} />)
                    }
                </div>
            </div>
            </div>
        )
    }
}
