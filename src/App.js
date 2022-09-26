import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import {useState} from "react";
import "./App.css";

function App({page=0}) {

    const [currentPage, setPage] = useState(page);

    return (
        <>
            <Navigation setPage={setPage}/>
            <HeroSection page={currentPage} setPage={setPage}/>
            <Footer/>
        </>
    );
}

export default App;
