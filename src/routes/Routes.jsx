import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import OrchidDetail from "../components/Orchid/OrchidDetail";
import Contact from "../components/Contact";
import Orchid from "../components/Orchid/Orchid";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLayout from "../layouts/AdminLayout";
import News from "../components/News";
import About from "../components/About";
import ManageOrchid from "../components/Orchid/ManageOrchid";
import * as React from "react";
import OrchidAdd from "../components/Orchid/OrchidAdd";
import OrchidEdit from "../components/Orchid/OrchidEdit";

const Routes = () => {
    const routing = useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Orchid />
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
                        }
                    ]
                }
            ]
        }
    ]);
    return routing;
};

export default Routes;