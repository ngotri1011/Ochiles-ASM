import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import * as React from "react";
import { Container } from "@mui/material";

const AdminLayout = () => {

    return (
        <Container sx={{mt: 5}}>
            <AdminNavbar/>
            <Outlet/>
        </Container>
            
    )
}

export default AdminLayout
