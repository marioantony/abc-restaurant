import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/PaymentGateway.css';

function PaymentGateway() {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { totalPrice } = location.state || {}; // Get total price from state

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., payment processing)
        alert('Payment submitted successfully!');

        // Redirect to the food grid page after successful payment
        navigate('/');
    };

    return (
        <Container className="payment-container">
            <Card className="payment-card">
                <Card.Body>
                    <Card.Title className="text-center">Payment Information</Card.Title>
                    <p className="text-center">Total Amount: ${totalPrice}</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name on Card</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name on card"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                placeholder="Enter card number"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvv"
                                placeholder="Enter CVV"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="billingAddress"
                                placeholder="Enter billing address"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Submit Payment
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PaymentGateway;
