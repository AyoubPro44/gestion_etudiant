import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "next-themes"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <main className="light font-poppins text-black">
          <App />
        </main>
    </ThemeProvider>
  </React.StrictMode >,
)
