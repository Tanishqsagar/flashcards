import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import MainLayout from "./layout/mainLayout";
import Learn from './pages/Learn';
import CreateCard from './pages/CreateCard';


const router=createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home />}></Route>
        <Route path='learn' element={<Learn/>}></Route>
        <Route path='create' element={<CreateCard/>}></Route>
      </Route>
    </>
  )
) 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
