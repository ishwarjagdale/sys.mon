import {notify} from "../../components/notifier";

export default function SystemCard({data}) {
    /*
        Sample Data

        data {
            name: "heroku app",
            type: "server",
            ip: "192.168.0.1"
        }

     */
    if(data === undefined)
        return (
            <div className={"border-2 text-gray-800 border-dashed w-full rounded-md p-6 mb-2 flex flex-col items-center justify-center cursor-pointer"}>
                <i className={"fas fa-plus"}/>
                <span className={"mt-4"}>Add new system</span>
            </div>
        )
    return (
        <div className={"border-2 w-full h-[150px] rounded-md p-4 mb-2 flex items-center justify-between"}>
            <i className={"fas fa-server p-6 lg:p-8 md:px-10 text-center"}/>
            <div className={"flex flex-col items-start w-fit mx-4 mr-auto"}>
                <a className={"text-lg font-bold"} href={`/system/${data.sys_id}`}>{data.name}</a>
                <span className={"text-gray-600 text-sm cursor-pointer"} onClick={(e) => {
                    navigator.clipboard.writeText(e.target.innerText);
                    notify("Copied to clipboard", 'success');
                }}>{data.ip_addr}</span>
            </div>
            <div className={"md:flex"}>
                <div className={"flex items-center mx-4 block"}>
                    <i className={"w-[18px] text-center fas fa-microchip mr-2"}/>
                    <span className={"text-lg font-bold text-green-600"}>28%</span>
                </div>
                <div className={"flex items-center mx-4 block"}>
                    <i className={"w-[18px] text-center fas fa-memory mr-2"}/>
                    <span className={"text-lg font-bold text-yellow-600"}>76%</span>
                </div>
                <div className={"flex items-center mx-4 block"}>
                    <i className={"w-[18px] text-center fas fa-database mr-2"}/>
                    <span className={"text-lg font-bold text-red-600"}>92%</span>
                </div>
            </div>
        </div>
    )
}
