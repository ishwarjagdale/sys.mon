import "./Dashboard.css";
import {is_login} from "../../api/authentication";
import {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";

export default function DashLayout() {

    const [user, set_user] = useState(false);

    useEffect(() => {
        is_login().then((res) => {
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                set_user(res.data);
            }
        }).catch((e) => {
            console.log(e);
            window.location.href = '/login';
        })
    }, []);

    return (
        user ?
            <div id={"dashboard"} className={"w-full flex"}>
                <Sidebar/>
                <Outlet/>
            </div>
            :
            <></>
    )
}
