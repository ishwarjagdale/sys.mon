import Button from "./Button";

function Navigation() {
    return (
        <div id={"navbar"} className={"flex w-full bg-transparent backdrop-blur p-8 lg:px-24 justify-between items-center  sticky top-0 z-10 pb-1"}>
            <a href={"/"} className={"flex text-xl md:text-2xl items-center"}>
                <span className={"fas fa-server mr-2"}/>
                <span className={"font-[900]"}>sys.mon</span>
            </a>
            <div id={"side-menu"} className={"items-center hidden w-full lg:flex"}>
                <ul className={"nav-links flex items-center text-lg ml-32 mr-auto"}>
                    <li><a href={"/"}>Platforms</a></li>
                    <li><a href={"/"}>Solution</a></li>
                    <li><a href={"/"}>Resources</a></li>
                    <li><a href={"/"}>Pricing</a></li>
                </ul>
                <div className={"flex flex-col-reverse md:flex-row items-center"}>
                    <a href={"/login"}><Button children={"Log In"} classList={"md:mr-4 hover:bg-gray-200"}/></a>
                    <a href={"/get-started"}><Button children={"Get Started"} border={2} classList={"hover:bg-black hover:text-white rounded-md hover:border-black w-full"}/></a>
                </div>
            </div>
            <span onClick={() => document.getElementById("side-menu").classList.toggle('hidden')} className={"fas fa-bars lg:hidden text-xl"}/>
        </div>
    )
}

export default Navigation;
