import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import OrchidDetail from "../pages/OrchidDetail";
import Contact from "../pages/Contact";
import OrchidHome from "../pages/OrchidHome";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLayout from "../layouts/AdminLayout";
import News from "../pages/News";
import About from "../pages/About";
import ManageOrchid from "../pages/ManageOrchid";
import * as React from "react";
import OrchidAdd from "../pages/OrchidAdd";
import OrchidEdit from "../pages/OrchidEdit";
import OrchidCollections from "../pages/OrchidCollections";
import ODCollections from "../pages/ODCollections";
import ProfileSettings from "../pages/ProfileSettings";

const Routes = () => {
    const routing = useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <OrchidHome />
                },
                {
                    path: "detail/:id",
                    element: <OrchidDetail />
                },
                {
                    path: "contact",
                    element: <Contact />
                },
                {
                    path: "news",
                    element: <News />
                },
                {
                    path: "about",
                    element: <About />
                },
                {
                    path: "collections",
                    element: <OrchidCollections />
                },
                {
                    path: "collections/detail/:id",
                    element: <ODCollections />
                },
                {
                    path: "profile",
                    element: <ProfileSettings />
                }
            ]
        },
        {
            path: "dashboard",
            element: <ProtectedRoutes />,
            children: [
                {
                    element: <AdminLayout />,
                    children: [
                        {
                            index: true,
                            element: <ManageOrchid />
                        },
                        {
                            path: "add",
                            element: <OrchidAdd />
                        },
                        {
                            path: "edit/:id",
                            element: <OrchidEdit />
                        },
                        
                    ]
                }
            ]
        }
    ]);
    return routing;
};

export default Routes;