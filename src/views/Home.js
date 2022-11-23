import Button from "./../components/Button";
import heroImage from "../img/2794209.png";


function Home() {

    return (
        <>
            <div className={"w-full lg:max-w-[50%] p-4 md:p-8 lg:p-4 flex-col items-center "}>
                <h1 className={"font-bold text-[30px] xl:text-[48px]"}>Automating system monitoring
                </h1>
                <p className={"sec-text text-md text-gray-800 lg:text-lg max-w-[450px] md:font-normal pt-5 pb-5"}>
                    Monitor health & performance of all your systems
                    even from remote location
                </p>
                <div className={"mt-2 lg:mt-6 lg:flex"}>
                    <a href={"/get-started"}><Button children={"Get Started"} fill={'black'} border={2} classList={"w-full primary-btn lg:w-fit lg:mr-1"} /></a>
                    <Button children={"Watch Demo"} classList={"hidden sec-btn lg:block font-bold mx-1 hover:bg-gray-200"}/>
                </div>
                <div className={"flex-col mt-2 lg:mt-12 md:mt-[40px] flex items-center lg:items-start mx-1 text-lg"}>
                    <span className={"hidden lg:block text-gray-500"}>Available on</span>
                    <ul className={"flex font-bold text-[16px]"}>
                        <li className={"lg:mr-[10px] mt-[10px] flex items-center"}><span
                            className={"fab fa-windows mx-2 flex items-center"}/><span className={"sec-text hidden lg:block"}>Windows</span></li>
                        <li className={"lg:mr-[10px] mt-[10px] flex items-center"}><span
                            className={"fab fa-apple mx-2"}/><span className={"sec-text hidden lg:block"}>Mac</span></li>
                        <li className={"lg:mr-[10px] mt-[10px] flex items-center"}><span
                            className={"fab fa-linux mx-2"}/><span className={"sec-text hidden lg:block"}>Linux</span></li>
                    </ul>
                </div>
            </div>
            <img id={"heroImage"} src={heroImage} className={"lg:hidden md:max-w-[50%] px-4"} alt={"process"} title={"Designed by slidesgo / Freepik"}/>
        </>
    )
}

export default Home;
