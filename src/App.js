
import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
// } from "react-router-dom";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/Notes/noteState';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <NoteState>

   <BrowserRouter>
    <Navbar></Navbar>
    <Alert />
      <div className='container'>
    <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
      </div>
</BrowserRouter>

    </NoteState>
    </>
  )
}

export default App;
