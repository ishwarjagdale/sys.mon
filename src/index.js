import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Oops from "./views/oops";
import Dashboard from "./views/Dashboard/Dashboard";
import Home from "./views/Home";
import Auth from "./views/Auth";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/get-started',
                element: <Auth page={1}/>
            },
            {
                path: '/login',
                element: <Auth page={2}/>
            },
            {
                path: '/forgot-password',
                element: <Auth page={3}/>
            },
            {
                path: '/forgot-password/:resetToken',
                element: <Auth page={3}/>
            },
            {
                path: '/verification',
                element: <Auth page={4}/>
            }
        ]
    }, {
        path: "/oops",
        element: <Oops/>
    }, {
        path: "/dashboard",
        element: <Dashboard/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} errorElement={<Oops/>}/>
    </React.StrictMode>
);
