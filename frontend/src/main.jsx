import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './index.css'
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
  position="bottom-center"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "14px",
      padding: "18px 22px",
      fontSize: "16px",
      minWidth: "320px",
      textAlign: "center",
      fontWeight: "500",
    },
    success: {
      style: {
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #bbf7d0",
      },
    },
    error: {
      style: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fecaca",
      },
    },
  }}
/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)