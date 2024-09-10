import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { FaShoppingCart,FaTimes } from 'react-icons/fa'; // Import cart icon
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css'; // Import your CSS file

function NavigationBar({ cartItems, clearCart, removeFromCart }) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const handleOrderNow = () => {
        // Handle the order logic here
        navigate('/paymentGateway', { state: { totalPrice } }); // Navigate with state
        alert('Order placed!');
        clearCart();
        setShowModal(false);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

    console.log("totalPrice", totalPrice)
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ABC ResTauRant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Food Menus</Nav.Link>
                            <Nav.Link href="/roomBooking">Rooms</Nav.Link>
                            <Nav.Link href="/overview">Overview</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link onClick={handleShow}>
                                <FaShoppingCart size={24} style={{ cursor: 'pointer' }} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for cart items */}
            {/* Modal for cart items */}
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-items-container">
                            <ul>
                                {cartItems
                                    .sort((a, b) => a.id - b.id) // Sort items numerically by ID
                                    .map((item, index) => (
                                        <li key={index} className="cart-item">
                                            <img src={item.image} alt={item.name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <p className="cart-item-name">{item.name}</p>
                                                <p className="cart-item-price">${item.price}</p>
                                            </div>
                                            <Button
                                                variant="link"
                                                onClick={() => removeFromCart(item.id)}
                                                className="cart-item-remove">
                                                <FaTimes size={20} />
                                            </Button>
                                        </li>
                                    ))}
                            </ul>
                            <hr />
                            <h5 className="cart-total">Total: ${totalPrice}</h5>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOrderNow}>
                        Order Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NavigationBar;
