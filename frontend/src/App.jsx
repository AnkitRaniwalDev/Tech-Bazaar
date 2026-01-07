import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Toaster} from 'react-hot-toast'
import Signup from './component/Registration.jsx'
import Login from './component/Login.jsx'
import Card from './component/Card.jsx'
import Cart from './component/Cart.jsx'
import Delivery from './component/Delivery.jsx'
import Orders from './component/Order.jsx'
import Admin from './component/Admin.jsx'
import Shop from './component/Shop.jsx'
import Homepage from './component/Homepage.jsx'
import About from './component/About.jsx'


function App() {
    



  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
           
          <Route path='/' element={<Home />} />
        
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/card' element={<Card />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admin' element={<Admin  />} />
          <Route path='/shop' element={<Shop  />} />
          <Route path='/homepage' element={<Homepage  />} />
          <Route path='/about' element={<About  />} />
         

        </Routes>
      
      </div>
    </>
  )
}

export default App
