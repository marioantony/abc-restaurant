// src/App.js
import React, { useState } from 'react';
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
import PaymentGateway from "./pages/PaymentGateway";

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
                <Route path="/menu" element={<Menu />} />
                <Route path="/roomBooking" element={<RoomBooking />} />
                <Route path="/paymentGateway" element={<PaymentGateway />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
