import Button from "../components/Button";

export default function Oops() {

    return (
        <div className={"flex flex-col my-auto h-full justify-center items-center"}>
            <h1 className={"text-3xl lg:text-6xl xl:text-8xl font-Poppins font-bold text-slate-700"}>oops! 🥲</h1>
            <p className={"mt-4 lg:mt-20 text-center p-2"}>Hi, I am Ishwar (the developer)<br/>this is gonna take time, why don't you follow me till then</p>
            <ul className={"p-6 flex"}>
                <li><a href={"https://www.linkedin.com/in/ishwar-jagdale/"} className={"fab fa-linkedin mx-4 text-2xl"}> </a></li>
                <li><a href={"https://www.github.com/ishwarjagdale/"} className={"fab fa-github mx-4 text-2xl"}> </a></li>
                <li><a href={"https://www.instagram.com/ishwarjagdale_/"} className={"fab fa-instagram mx-4 text-2xl"}> </a></li>
            </ul>
            <div className={"my-6"}/>
            <Button children={"Go back"} onclick={() => window.history.back()} border={2} classList={"w-[200px] rounded-lg hover:bg-black hover:text-white"}/>
        </div>
    )
}
