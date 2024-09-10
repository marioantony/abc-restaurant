// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Reservation from './pages/Reservation';
import RegisterForm from './pages/RegisterForm';
import Login from "./pages/Login";
import FoodGrid from "./pages/FoodGrid";
import RoomBooking from "./pages/RoomBooking";
import PaymentGateway from "./pages/PaymentGateway";
import Overview from "./pages/Overview";

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (food) => {
        setCartItems([...cartItems, food]);
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <Router>
            <Navbar cartItems={cartItems} clearCart={clearCart} removeFromCart={removeFromCart} />
            <Routes>
                <Route path="/" element={<FoodGrid addToCart={addToCart}/>} />
                <Route path="/roomBooking" element={<RoomBooking />} />
                <Route path="/paymentGateway" element={<PaymentGateway />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
