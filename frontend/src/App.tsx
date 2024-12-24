import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { HomePage } from "./pages/HomePage"

import "./global.css"
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "./components/RouterProvider"

export function App() {

  return (
    <>
      <BrowserRouter>
        <RouterProvider />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> 
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}
