import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import MainLayout from "./layout/mainLayout";
import Learn from './pages/Learn';
import CreateCard from './pages/CreateCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AuthProvider from './context/AuthContext';



const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
        <Route index element={<Signup></Signup>}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='learn' element={<Learn/>}></Route>
        <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='create' element={<CreateCard/>}></Route>
    </Route>
  )
) 


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>,
    
);
