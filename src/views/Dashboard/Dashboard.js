import "./Dashboard.css";
import {useState} from "react";
import Systems from "./Systems";
import Search from "./Search";

export default function Dashboard() {

    const [systems, set_systems] = useState([]);
    const [active_systems, set_as] = useState(new Set());

    const user = JSON.parse(localStorage.getItem('user'));

    return <div className={"flex-1 flex flex-col h-auto"}>
        <div id={"top-bar"} className={"m-2 p-6 pb-0 lg:p-8 lg:pb-0 flex items-center flex-1 justify-between"}>
            <Search/>
            <i className={"fas fa-bars-staggered md:hidden rounded p-2 z-50 cursor-pointer"} onClick={(e) => {
                e.target.classList.toggle("bg-white");
                document.getElementById("side-bar").classList.toggle("hidden");
                document.getElementById("side-bar").classList.toggle("short-side");
            }}/>
            <div className={"items-center hidden lg:flex w-[300px] overflow-hidden justify-between"}>
                <i className="fas fa-bell mr-16"/>
                <div className={"flex items-center "}>
                    <span className={"px-2 font-bold"}>{user.name}</span>
                    <i className="fas fa-circle-user text-xl py-4"/>
                </div>
            </div>
        </div>
        <div className={"flex w-full h-full"}>
            <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex py-8 px-2 lg:px-8 flex-col"}>
                <div className={"mx-2 flex flex-col"}>
                    <div className={"flex flex-1"}>
                        <span className={"font-bold text-3xl lg:text-6xl text-gray-400 mr-2 lg:mr-4"}>Welcome,</span>
                        <span className={"font-bold text-3xl lg:text-6xl text-gray-800"}>{user.name.split(" ")[0]}</span>
                    </div>
                    <span className={"m-1 lg:m-2 text-xs w-5/6 lg:text-sm"}>{
                        systems.length ?
                            active_systems.size === systems.length ? "Everything seems fine 😗" : `🫡 Looks like you have ${systems.length - active_systems.size} system(s) down`
                            :
                            "hey! you have zero systems connected, we are waiting 🥲"
                    }</span>
                </div>
                <Systems systems={systems} set_systems={set_systems} set_as={set_as} active_systems={active_systems} />
            </div>
            <div id={"right-side-bar"}
                 className={"flex m-2 hidden bg-white lg:block flex-col w-[400px] items-start rounded-2xl justify-between p-8 overflow-hidden flex-col text-gray-800 border"}>
                <span className={"font-bold text-lg"}>Stats</span><hr className={"mt-2 mb-4"}/>

                <div className={"flex items-center py-2 justify-between"}>
                    <span className={"text-md"}>Total Systems</span>
                    <span className={"font-bold text-xl font-monospace"}>{systems.length.toString().padStart(2, '0')}</span>
                </div>
                <div className={"py-2"}>
                    <div className={"flex items-center justify-between"}>
                        <span className={"text-md"}>Active Systems</span>
                        <span className={"font-bold text-green-600 text-xl"}>{active_systems.size.toString().padStart(2, '0')}</span>
                    </div>
                    <progress value={active_systems.size} max={systems.length} className={"w-full h-[4px] my-2"} />
                </div>
            </div>
        </div>
    </div>
}
