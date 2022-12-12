import "./Dashboard.css";
import React from "react";
import Search from "./Search";
import {GetSystems} from "../../api/api";
import {notify} from "../../components/notifier";
import SystemCard from "./SystemCard.js";

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
                <div id={"top-bar"} className={"m-2 p-6 pb-0 lg:p-8 lg:pb-0 flex items-center flex-1 justify-between"}>
                    <Search/>
                    <i className={"fas fa-bars-staggered md:hidden rounded p-2 z-50 cursor-pointer"} onClick={(e) => {
                        e.target.classList.toggle("bg-[#161b22]");
                        document.getElementById("side-bar").classList.toggle("hidden");
                        document.getElementById("side-bar").classList.toggle("short-side");
                    }}/>
                    <div className={"items-center hidden lg:flex overflow-hidden justify-between"}>
                        {/*<i className="fas fa-bell mr-16"/>*/}
                        <div className={"flex items-center "}>
                            <span className={"px-2 font-bold"}>{this.state.user.email}</span>
                            <i className="fas fa-circle-user text-xl py-4"/>
                        </div>
                    </div>
                </div>
                <div className={"flex w-full h-full"}>
                    <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex py-8 px-2 lg:px-8 flex-col"}>
                        <div className={"mx-2 flex flex-col"}>
                            <div className={"flex flex-1"}>
                                <span className={"font-bold text-3xl lg:text-6xl text-gray-400 mr-2 lg:mr-4"}>Welcome,</span>
                                <span className={"font-bold text-3xl lg:text-6xl text-gray-800 username"}>{this.state.user.name.split(" ")[0]}</span>
                            </div>
                            <span className={"m-1 lg:m-2 text-xs w-5/6 lg:text-sm"}>
                                {
                                    this.state.systems.length ?
                                        this.state.active_systems.size === this.state.systems.length ?
                                            "Everything seems fine 😗"
                                            :
                                            `🫡 Looks like you have ${this.state.systems.length - this.state.active_systems.size} system(s) down`
                                        :
                                        "hey! you have zero systems connected, we are waiting 🥲"
                                }
                            </span>
                        </div>
                        <div id={"systems"} className={"flex-1 flex flex-col mx-2 mt-8"}>
                            <span className={"text-xl font-bold mx-2 mb-5 block"}>Your Systems</span>
                            {
                                this.state.systems.map((s, i) => <SystemCard key={i} data={s} handleActive={this.handleActive}/>)
                            }
                            <SystemCard/>
                        </div>
                    </div>
                    <div id={"right-side-bar"} className={"flex flex-col items-center"}>
                        <div className={"flex m-2 hidden lg:block flex-col w-[400px] items-start rounded-2xl justify-between p-8 overflow-hidden flex-col text-gray-800 border"}>
                            <span className={"font-bold text-lg"}>Stats</span><hr className={"mt-2 mb-4"}/>

                            <div className={"flex items-center py-2 justify-between"}>
                                <span className={"text-md"}>Total Systems</span>
                                <span className={"font-bold text-xl font-monospace"}>{this.state.systems.length.toString().padStart(2, '0')}</span>
                            </div>
                            <div className={"py-2"}>
                                <div className={"flex items-center justify-between"}>
                                    <span className={"text-md"}>Active Systems</span>
                                    <span className={"font-bold text-green-600 text-xl"}>{this.state.active_systems.size.toString().padStart(2, '0')}</span>
                                </div>
                                <progress value={this.state.active_systems.size} max={this.state.systems.length} className={"w-full h-[4px] my-2"} />
                            </div>
                        </div>
                        <div className={"flex m-2 hidden lg:block flex-col w-[400px] items-start rounded-2xl justify-between p-8 overflow-hidden flex-col text-gray-800 border"}>
                            <span className={"font-bold text-lg"}>Alerts</span><hr className={"mt-2 mb-4"}/>
                            <p className={"sec-text text-sm"}>Nothing yet</p>
                        </div>
                        <div className={"flex m-2 hidden lg:block flex-col w-[400px] items-start rounded-2xl justify-between p-8 overflow-hidden flex-col text-gray-800 border"}>
                            <span className={"font-bold text-lg"}><i className={"fab fa-github mr-2"}/>Recent Changes</span><hr className={"mt-2 mb-4"}/>
                            <p className={"sec-text text-sm"}>Nothing yet</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
