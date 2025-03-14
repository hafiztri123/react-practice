import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './route/ProtectedRoute'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import DashboardLayout from './components/DashboardLayout'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Route>
        
      </Routes>
      <ToastContainer position='top-right' autoClose={3000}/>
    </BrowserRouter>
  )
}

export default App
