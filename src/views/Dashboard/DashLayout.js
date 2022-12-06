import "./Dashboard.css";
import {is_login} from "../../api/authentication";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
import React from "react";


class DashLayout extends React.Component {
    constructor(props) {
        super(props);

        this.status = {}
    }

    componentDidMount() {
        is_login().then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                this.setState({user: res.data});
            }
        }).catch((e) => {
            console.log(e);
            window.location.href = '/login';
        })
    }

    render() {
        return (
            this.state?.user ?
                <div id={"dashboard"} className={"w-full flex"}>
                    <Sidebar/>
                    <Outlet/>
                </div>
                :
                <i className={"fas fa-spinner m-auto animate-spin"}/>
        )
    }
}

export default DashLayout;
