// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    return (
        <Router>
            {/* Navbar is placed inside the Router context */}
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/reservations" element={<ReservationPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Add other routes as needed */}
            </Routes>

        </Router>
    );
};

export default App;
