import SystemCard from "./systemCard";
import {useEffect} from "react";
import {GetSystems} from "../../api/api";
import {notify} from "../../components/notifier";

export default function Systems({systems, set_systems, set_as, active_systems}) {

    useEffect(() => {
        GetSystems().then((res) => {
            if(res.status === 200) {
                set_systems(res.data);
            }
        }).catch((err) => {
            console.log(err);
            notify("Failed to fetch systems", "failed");
        })
    }, []);

    return (
        <div id={"systems"} className={"flex-1 flex flex-col mx-2 mt-8"}>
            <span className={"text-xl font-bold mx-2 mb-5 block"}>Your Systems</span>
            {
                systems.map((s, i) => <SystemCard key={i} data={s} set_as={set_as} active_systems={active_systems}/>)
            }
            <SystemCard/>
        </div>
    )
}
