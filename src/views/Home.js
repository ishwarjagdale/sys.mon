import heroImage from "../img/2794209.jpg";
import Button from "./../components/Button";
import Form from "./../components/Form";


function Home() {

    return (
        <>
            <div className={"w-full lg:max-w-[50%] p-4 md:p-8 lg:p-4 flex-col items-center backdrop-blur-[4px]"}>
                <h1 className={"font-bold text-[42px] xl:text-[64px]"}>Integrate your<br/>
                    systems <span className={"fas fa-arrow-right"}/> monitor<br/>
                    em' all
                </h1>
                <p className={"sec-text text-md text-gray-800 lg:text-lg font-bold md:font-normal py-5"}>
                    Monitor all your system's health & performance<br/>
                    even from remote locations
                </p>
                <div className={"mt-6"}>
                    <a href={"/get-started"}><Button children={"Get Started"} fill={'black'} border={2} classList={"mx-1"} /></a>
                    <Button children={"Watch Demo"} classList={"font-bold mx-1 hover:bg-gray-200"}/>
                </div>
                <div className={"flex-col mt-12 md:mt-[40px] mx-1 text-lg"}>
                    <span className={"text-gray-500"}>Available on</span>
                    <ul className={"flex font-bold text-[16px]"}>
                        <li className={"mx-[10px] mt-[10px]"}><span
                            className={"fab fa-windows mr-2"}/><span>Windows</span></li>
                        <li className={"mx-[10px] mt-[10px]"}><span
                            className={"fab fa-apple mr-2"}/><span>Mac</span></li>
                        <li className={"mx-[10px] mt-[10px]"}><span
                            className={"fab fa-linux mr-2"}/><span>Linux</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;
