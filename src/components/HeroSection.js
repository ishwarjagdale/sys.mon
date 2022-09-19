import heroImage from "../img/8eccea77964ec8a55d70327f6048406e.webp";
import Button from "./Button";
import Form from "./Form";


function HeroSection({page = 0, setPage}) {

    return (
        <>
            <div id={"hero-section"} className={`flex w-full lg:w-4/5 lg:mx-auto items-center relative overflow-hidden flex-shrink`}>
                {
                    page === 0 ?
                        <div className={"w-full lg:max-w-[50%] p-4 md:p-8 lg:p-4 flex-col items-center"}>
                            <h1 className={"font-bold text-[42px] xl:text-[64px]"}>Integrate your<br/>
                                crap <span className={"fas fa-arrow-right"}/> automate<br/>
                                your bullshit
                            </h1>
                            <p className={"text-md text-gray-800 lg:text-xl font-bold md:font-normal py-5"}>
                                Evolve at the speed and scale of your business<br/>
                                with the leader in low-code automation
                            </p>
                            <div className={"mt-6"}>
                                <a href={"/get-started"}><Button children={"Get Started"} fill={'black'} border={2} classList={"mx-1"} /></a>
                                <Button children={"Watch Demo"} classList={"font-bold mx-1 hover:bg-gray-200"}/>
                            </div>
                            <div className={"flex-col mt-12 md:mt-[100px] mx-1 text-lg"}>
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
                        :
                        <Form page={page} setPage={setPage}/>
                }
                <img id={"heroImage"} src={heroImage} className={"hidden lg:block md:max-w-[50%] px-4"} alt={"process"}/>
            </div>
        </>
    )
}

export default HeroSection;
