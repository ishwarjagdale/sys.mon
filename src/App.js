import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Footer from "./components/Footer";
import {useState} from "react";
import "./App.css";
import {Outlet} from 'react-router-dom';
import heroImage from "./img/2794209.jpg";

function App() {
    return (
        <>
            <Navigation/>
            <div id={"hero-section"} className={`flex w-full lg:w-4/5 lg:mx-auto items-center relative overflow-hidden flex-shrink`}>
                <Outlet/>
                <img id={"heroImage"} src={heroImage} className={"hidden lg:block md:max-w-[50%] px-4"} alt={"process"} title={"Designed by slidesgo / Freepik"}/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
