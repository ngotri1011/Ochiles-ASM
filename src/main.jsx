import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './features/Users';
import "./scss/MainButton.scss";
import { ThemeProvider as CustomThemeProvider } from './darkmode/ThemeContext.jsx';


export const store = configureStore({
  reducer: { users: userReducer, },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
