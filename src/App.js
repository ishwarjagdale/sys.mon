import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";
import {Outlet} from 'react-router-dom';

function App() {
    return (
        <div id={'web'}>
            <Navigation/>
            <div id={"hero-section"} className={`flex flex-col-reverse lg:flex-row w-full lg:w-4/5 items-center relative overflow-hidden flex-shrink m-auto`}>
                <Outlet/>

            </div>
            <Footer/>
        </div>
    );
}

export default App;
