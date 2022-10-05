// import {useState} from "react";

export default function Search() {

    // const [res, set_res] = useState([{
    //     name: "heroku app",
    //     sys_id: "adoawd0que22h1ehd0129ue192h1o2e12ne1",
    //     ip_addr: "192.168.0.1"
    // }]);
    //
    // const toggleRes = (e) => {
    //     if(e.type === 'keydown' && e.key === 'Escape') {
    //         e.target.blur();
    //     }
    //     if((e.type === 'keydown' && e.key === 'Escape') || (e.type === 'focus')) {
    //         document.getElementById('search-res').classList.toggle('hidden')
    //     }
    // }
    //
    // const handleSearch = () => {
    //
    // }

    return (
        <div id={"search-bar"} className={"flex flex-col relative items-start py-2 md:px-2 w-3/4"}>
            <div className={"flex items-center w-3/4"}>
                <i className={"fas fa-search"}/>
                <input type={"text"} placeholder={"Search"} className={"bg-transparent pl-4 w-2/3 outline-0"}/>
            </div>
            {/*<div id={"search-res"} className={"mt-10 hidden bg-blue-200 w-full absolute"}>*/}
            {/*    <ul className={""}>*/}
            {/*        {*/}
            {/*            res.map((r, i) => <li key={i} className={"p-2 flex"}><span>{r.name}</span></li>)*/}
            {/*        }*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )
}
