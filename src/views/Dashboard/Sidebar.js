import {Logout} from "../../api/authentication";
import React from "react";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.removeItem('user');
        Logout().then(res => {
            if(res.status === 200)
                window.location.href = '/';
        }).catch((e) => {
            console.log(e);
            window.location.href = '/';
        })
    }


    render() {
        return <div id={"side-bar"}
                    className={"flex hidden md:flex flex-col w-full lg:w-[350px] items-start justify-between m-2 rounded-xl py-5 lg:py-8 overflow-hidden flex-col lg:pb-12 border text-gray-800"}>
            <div className={"flex items-center justify-start"}>
                <a href={"/dashboard"}>
                    <i className="fas fa-server py-6"/>
                    <span className={"font-bold p-6 pl-0"}>sys.mon</span>
                </a>
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
                <li onClick={this.handleLogout}>
                    <i className={"fas fa-sign-out"}/>
                    <span>Log out</span>
                </li>
            </ul>
            <i id={"side-toggle"} onClick={(e) => {
                document.getElementById("side-bar").classList.toggle("short-side");
                e.target.classList.toggle("fa-chevron-circle-left");
                e.target.classList.toggle("fa-chevron-circle-right");
            }} className={"mt-8 mb-6 cursor-pointer fas fa-chevron-circle-left "}/>
        </div>
    }
}

export default Sidebar;
