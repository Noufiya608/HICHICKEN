import { useState } from 'react'

import './App.css'
import Price from "./components/Price/money.jsx";
import Payment from "./components/Payment/pay.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from './components/Order/Shop.jsx';
import Signup from './components/Signup/signup.jsx';
import Login from './components/Signup/login.jsx';
import Forgot from './components/Signup/Forgot.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import AdminRoute from './components/Admin/AdminRoute.jsx';
import Contact from './components/Contact/contact.jsx';
import About from './components/Aboutus/About.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';


function App() {
  

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Price />} />
         <Route path="/order" element={<Order />} />
      <Route
  path="/pay"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>
         <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/forgot" element={<Forgot />} />
         <Route path="/adminlogin" element={<AdminLogin />} /> 
          <Route path="/contactus" element={<Contact />} /> 
          <Route path="/About" element={<About />} /> 
      
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
      
      </Routes>
     
    </Router>
  )
}

export default App
