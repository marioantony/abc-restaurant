// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavigationBar';
// import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import RegisterForm from './components/RegisterForm';
// import LoginForm from './components/LoginForm';
import Login from "./pages/Login";
import FoodGrid from "./pages/FoodGrid";
import RoomBooking from "./pages/RoomBooking";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<FoodGrid />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/roomBooking" element={<RoomBooking />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
