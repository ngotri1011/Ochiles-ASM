import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/Footer"
import * as React from "react";
import { useEffect } from "react";

function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <div>
            <Navbar />
            <div className="">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout