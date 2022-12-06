import {Logout} from "../../api/authentication";
import React from "react";
import {Link} from "react-router-dom";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleLogout = this.handleLogout.bind(this);
        this.changeTab = this.changeTab.bind(this);
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

    changeTab(e) {
        document.querySelector("li[class=active]").classList.remove('active');
        e.target.parentElement.classList.add('active');
    }


    render() {

        const NavItem = ({label, to, children, className}) => {
            return <li onClick={this.changeTab} aria-label={label} className={className}>
                <Link to={to}>
                    {children}
                </Link>
            </li>
        }

        return <div id={"side-bar"}
                    className={"flex hidden md:flex flex-col w-full md:max-w-[350px] items-start justify-between m-2 rounded-xl py-5 lg:py-8 overflow-hidden flex-col lg:pb-12 border text-gray-800"}>
            <div className={"flex items-center justify-start"}>
                <Link to={"/dashboard"}>
                    <i className="fas fa-server py-6"/>
                    <span className={"font-bold p-6 pl-0"}>sys.mon</span>
                </Link>
            </div>
            <hr className={"border-1 w-4"}/>
            <ul className={"flex flex-col w-full items-start mt-20 mb-auto m-0"}>
                <NavItem className={"active"} label={'dashboard'} to={"/dashboard"}>
                    <i className={"fas fa-home"}/>
                    <span>Dashboard</span>
                </NavItem>
                <NavItem label={'performance'} to={"/dashboard/performance"}>
                    <i className={"fas fa-line-chart"}/>
                    <span>Performance</span>
                </NavItem>
                <NavItem label={'activity'} to={"/dashboard/activity"}>
                    <i className={"fas fa-file-lines"}/>
                    <span>Activity Logs</span>
                </NavItem>
            </ul>
            <hr className={"border-1 w-4"}/>
            <ul className={"flex flex-col items-start justify-center w-full"}>
                <li>
                    <NavItem label={'documentation'} to={"/documentation"}>
                    <i className={"fas fa-book"}/>
                    <span>Documentation</span>
                    </NavItem>
                </li>
                <li>
                    <NavItem label={'settings'} to={"/dashboard/settings"}>
                    <i className={"fas fa-gear"}/>
                    <span>Settings</span>
                    </NavItem>
                </li>
                <li className={"cursor-pointer"} onClick={this.handleLogout}>
                    <Link to={"#"}>
                    <i className={"fas fa-sign-out"}/>
                    <span>Log out</span>
                    </Link>
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
