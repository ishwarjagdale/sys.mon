export default function Topbar() {
    return <div id={"top-bar"} className={" pb-0 lg:pb-0 flex items-center flex-1 justify-between"}>
        <div className={"flex items-center m-2 w-full border-b"}>
            <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 py-4 cursor-pointer"}/>
            <span className={"font-bold text-lg text-gray-500 block"}>Dashboard</span>
        </div>
        <i className={"fas fa-bars-staggered md:hidden rounded p-2 z-50 cursor-pointer"} onClick={(e) => {
            e.target.classList.toggle("bg-[#161b22]");
            document.getElementById("side-bar").classList.toggle("hidden");
            document.getElementById("side-bar").classList.toggle("short-side");
        }}/>
    </div>
}
