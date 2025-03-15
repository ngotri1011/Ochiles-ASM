import React from 'react';
import orchidLogo2 from '../assets/images/orchid-logo-dall-E-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from "../darkmode/ThemeContext";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";


export default function Navigation() {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <nav className="navbar navbar-expand-lg Navigation">
      <div class="container-fluid">
        <NavLink to='/' class="navbar-brand-img" style={{ textDecoration: 'none' }}><img src={orchidLogo2} alt='' style={{ width: "50px" }}></img></NavLink>
        <NavLink to='/' class="navbar-brand-text" style={{ textDecoration: 'none', marginRight: '20px', color: '#B03052' }}><h3 style={{ fontWeight: 'bold', marginTop: '10px' }}>Orchiles</h3></NavLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'gray',
                  fontWeight: isActive ? 'bold' : 'normal',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  paddingBottom: '5px',
                })}
              >
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                to="/news"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'gray',
                  fontWeight: isActive ? 'bold' : 'normal',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  paddingBottom: '5px',
                })}
              >
                News
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'gray',
                  fontWeight: isActive ? 'bold' : 'normal',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  paddingBottom: '5px',
                })}
              >
                About
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                to="/contact"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'gray',
                  fontWeight: isActive ? 'bold' : 'normal',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  paddingBottom: '5px',
                })}
              >
                Contact
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                to="/list"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'gray',
                  fontWeight: isActive ? 'bold' : 'normal',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  paddingBottom: '5px',
                })}
              >
                List
              </NavLink>
            </li>
          </ul>

        </div>
      </div>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit" style={{ borderColor: "#B03052", color: "#B03052" }}>Search</button>
      </form>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </nav >
  );
}
