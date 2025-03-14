import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Login, Register } from './components/Auth/Auth'
import ProtectedRoutes from './route/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<Layout />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
