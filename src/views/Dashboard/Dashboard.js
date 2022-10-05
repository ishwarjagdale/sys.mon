import "./Dashboard.css";
import {is_login, Logout} from "../../api/authentication";
import {useEffect, useState} from "react";
import Systems from "./Systems";
import Search from "./Search";

export default function Dashboard() {

    const [user, set_user] = useState(JSON.parse(localStorage.getItem('user')));
    const [systems, set_systems] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        Logout().then(res => {
            if(res.status === 200)
                window.location.href = "/";
        }).catch((e) => {
            console.log(e);
            window.location.href = "/";
        })
    }

    useEffect(() => {
        is_login().then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                set_user(res.data);
            }
        }).catch((e) => {
            console.log(e);
            window.location.href = "/login";
        })
    }, []);

    return (
        user ?
            <div id={"dashboard"} className={"w-full flex"}>
                <div id={"side-bar"}
                     className={"flex hidden md:flex flex-col w-full lg:w-[350px] items-start justify-between m-2 rounded-xl py-5 lg:py-8 overflow-hidden flex-col lg:pb-12 border text-gray-800"}>
                    <div className={"flex items-center justify-start"}>
                        <i className="fas fa-server py-6"/>
                        <a href={"/dashboard"} className={"font-bold p-6 pl-0"}>sys.mon</a>
                    </div>
                    <hr className={"border-1 w-4"}/>
                    <ul className={"flex flex-col w-full items-start mt-20 mb-auto m-0"}>
                        <li className={"active"}>
                            <i className={"fas fa-home"}/>
                            <span>Dashboard</span>
                        </li>
                        <li>
                            <i className={"fas fa-line-chart"}/>
                            <span>Performance</span>
                        </li>
                        <li>
                            <i className={"fas fa-file-lines"}/>
                            <span>Activity Logs</span>
                        </li>
                    </ul>
                    <hr className={"border-1 w-4"}/>
                    <ul className={"flex flex-col items-start justify-center w-full"}>
                        <li>
                            <i className={"fas fa-book"}/>
                            <span>Documentation</span>
                        </li>
                        <li>
                            <i className={"fas fa-gear"}/>
                            <span>Settings</span>
                        </li>
                        <li onClick={handleLogout}>
                            <i className={"fas fa-sign-out"}/>
                            <span>Log out</span>
                        </li>
                    </ul>
                    <i id={"side-toggle"} onClick={(e) => {
                        document.getElementById("side-bar").classList.toggle("short-side");
                        e.target.classList.toggle("fa-chevron-circle-left");
                        e.target.classList.toggle("fa-chevron-circle-right");
                    }} className={"mt-8 cursor-pointer fas fa-chevron-circle-left "}/>
                </div>
                <div className={"flex-1 flex flex-col h-auto"}>
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
                        <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex p-8 px-4 lg:px-8 flex-col"}>
                            <div className={"mx-2 flex flex-col"}>
                                <div className={"flex flex-1"}>
                                    <span className={"font-bold text-3xl lg:text-6xl text-gray-400 mr-2 lg:mr-4"}>Welcome,</span>
                                    <span className={"font-bold text-3xl lg:text-6xl text-gray-800"}>{user.name.split(" ")[0]}</span>
                                </div>
                                <span className={"m-1 lg:m-2 text-xs w-5/6 lg:text-sm"}>{
                                    systems.length ?
                                        "Everything seems fine 😗"
                                        :
                                        "hey! you have zero systems connected, we are waiting 🥲"
                                }</span>
                            </div>
                            <Systems systems={systems} set_systems={set_systems} />
                        </div>
                        <div id={"right-side-bar"}
                             className={"flex m-2 hidden bg-white lg:block flex-col w-[350px] items-start justify-between rounded-xl p-5 lg:p-8 overflow-hidden flex-col lg:pb-12 text-gray-800 border"}>
                        </div>
                    </div>
                </div>

            </div>
            :
            <></>
    )
}