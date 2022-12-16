import Button from "./Button";

function Navigation() {
    return (
        <div id={"navbar"} className={"flex w-full bg-transparent p-8 lg:px-24 justify-between items-center sticky top-0 z-10"}>
            <a href={"/"} className={"flex text-xl md:text-2xl items-center"}>
                <span className={"fas fa-server mr-2"}/>
                <span className={"font-[900]"}>sys.mon</span>
            </a>
            <div id={"side-menu"} className={"items-center hidden w-full lg:flex"}>
                <ul className={"nav-links flex items-center text-lg ml-32 mr-auto"}>
                    <li><a href={"https://github.com/ishwarjagdale/sys.mon"}>Documentation</a></li>
                    <li><a href={"/dashboard"}>Dashboard</a></li>
                </ul>
                <div className={"flex flex-col-reverse md:flex-row items-center"}>
                    <a href={"/login"} className={"px-4 md:p-0 md:mr-4 w-full md:w-fit"}><Button children={"Log In"} classList={"sec-btn hover:bg-gray-200 w-full"}/></a>
                </div>
            </div>
            <span onClick={() => document.getElementById("side-menu").classList.toggle('hidden')} className={"fas fa-bars lg:hidden text-xl"}/>
        </div>
    )
}

export default Navigation;
