import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Home from "./pages/Home";
import UpdateMusic from './pages/UpdateMusic';
import CreateMusic from './pages/CreateMusic';

 function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/create-Music" element={<CreateMusic />} />
          <Route path="/edit-music/:id" element={<UpdateMusic />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;