import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import "./scss/MainButton.scss";
import { ThemeProvider as CustomThemeProvider } from './darkmode/ThemeContext.jsx';
import { AuthContextProvider } from './context/AuthContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <CustomThemeProvider>
          {/* <AuthContextProvider> */}
            <App />
          {/* </AuthContextProvider> */}
        </CustomThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
