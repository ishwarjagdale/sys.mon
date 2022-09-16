import Button from "./Button";

function Navigation({setPage}) {
    return (
        <div className={"flex w-full h-fit sticky top-0 items-center"}>
            <div id={"navbar"} className={"flex w-full px-24 py-[20px] items-center h-[80px]"}>
                <a href={"/"} className={"flex items-center"}>
                    <span className={"fas fa-server mr-2 text-2xl"}/>
                    <span className={"font-[900] text-2xl"}>sys.mon</span>
                </a>
                <ul className={"nav-links flex items-center text-lg ml-32 mr-auto"}>
                    <li><a href={"/"}>Platforms</a></li>
                    <li><a href={"/"}>Solution</a></li>
                    <li><a href={"/"}>Resources</a></li>
                    <li><a href={"/"}>Pricing</a></li>
                </ul>
                <div className={"flex items-center"}>
                    <a href={"/login"}><Button children={"Log In"} classList={"mr-4 hover:bg-gray-200"}/></a>
                    <a href={"/get-started"}><Button children={"Get Started"} border={2} classList={"hover:bg-black hover:text-white rounded-md hover:border-black"}/></a>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
