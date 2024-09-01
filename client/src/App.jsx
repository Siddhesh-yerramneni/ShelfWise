import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import PRofile from './pages/PRofile.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<PRofile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
