import React from 'react';
// import { Counter } from './features/counter/Counter';
import { Route, Routes, } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/Dashboard';



const Routing = () => {
  // var isLoggedIn = localStorage.getItem("token");

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}





function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
