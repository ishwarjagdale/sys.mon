import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import {Outlet} from 'react-router-dom';
import heroImage from "./img/2794209.png";

function App() {
    return (
        <>
            <Navigation/>
            <div id={"hero-section"} className={`flex flex-col-reverse lg:flex-row w-full lg:w-4/5 items-center relative overflow-hidden flex-shrink m-auto`}>
                <Outlet/>

            </div>
            <Footer/>
        </>
    );
}

export default App;
