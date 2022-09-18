import Button from "../components/Button";
import {Logout} from "../api/authentication";

export default function Dashboard() {

    const handleLogout = () => {
        Logout().then(res => {
            if(res.status === 200)
                window.location.href = "/";
        }).catch((e) => {
            console.log(e);
            window.location.href = "/";
        })
    }

    return (
        <div className={"flex flex-col h-full justify-center items-center"}>
            <h1 className={"text-8xl font-Poppins font-bold text-slate-700"}>🚧 Work in progress 🚧</h1>
            <p className={"mt-20 text-center"}>Hi, I am Ishwar<br/>this is gonna take time, why don't you follow me till then</p>
            <ul className={"p-6 flex"}>
                <li><a href={"https://www.linkedin.com/in/ishwar-jagdale/"} className={"fab fa-linkedin mx-4 text-2xl"}> </a></li>
                <li><a href={"https://www.github.com/ishwarjagdale/"} className={"fab fa-github mx-4 text-2xl"}> </a></li>
                <li><a href={"https://www.instagram.com/ishwarjagdale_/"} className={"fab fa-instagram mx-4 text-2xl"}> </a></li>
            </ul>
            <div className={"my-6"}/>
            <Button children={"Logout"} onclick={handleLogout} border={2} classList={"w-[200px] rounded-lg hover:bg-black hover:text-white"}/>
        </div>
    )
}
