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
import DashLayout from "./views/Dashboard/DashLayout";
import SystemPage from "./views/Dashboard/SystemPage";
import PerformancePage from "./views/Dashboard/PerformancePage";
import Settings from "./views/Dashboard/Settings";

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
        ],
        errorElement: <Oops/>
    }, {
        path: "/oops",
        element: <Oops/>,
        errorElement: <Oops/>
    }, {
        element: <DashLayout/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>,
                errorElement: <Oops/>
            }, {
                path: "/dashboard/system/:system_id",
                element: <SystemPage/>,
                errorElement: <Oops/>
            }, {
                path: "/dashboard/performance",
                element: <PerformancePage/>,
                errorElement: <Oops/>
            }, {
                path: "/dashboard/activity",
                element: <PerformancePage/>,
                errorElement: <Oops/>
            }, {
                path: "/dashboard/settings",
                element: <Settings/>,
                errorElement: <Oops/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
