import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import './css/Reservation.css';

const statuses = ['Order Received', 'Preparing', 'Prepared', 'On the Way'];

function ReservationPage() {
    const [currentStatus, setCurrentStatus] = useState('Order Received');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'System', text: 'Order has been received.', timestamp: new Date().toLocaleTimeString() },
    ]);
    const [chatInput, setChatInput] = useState('');

    // Handles order status change and auto chat message for status update
    const handleStatusChange = (status) => {
        setCurrentStatus(status);
        const statusMessage = `Status updated: ${status}`;
        addChatMessage('System', statusMessage);
    };

    // Handles manual chat messages from the staff
    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim()) {
            addChatMessage('Staff', chatInput);
            setChatInput('');
        }
    };

    // Adds new chat message
    const addChatMessage = (sender, text) => {
        setChatMessages([...chatMessages, { sender, text, timestamp: new Date().toLocaleTimeString() }]);
    };

    return (
        <Container className="reservation-container">
            <Row>
                <Col md={8}>
                    <Card className="order-details-card">
                        <Card.Body>
                            <Card.Title>Order Details</Card.Title>
                            <p><strong>Customer:</strong> John Doe</p>
                            <p><strong>Food Items:</strong> Pizza Margherita, Caesar Salad, Chicken Alfredo</p>
                            <p><strong>Total Price:</strong> $37</p>
                            <p><strong>Status:</strong> {currentStatus}</p>

                            {/* Status Change Buttons */}
                            <div className="status-buttons">
                                {statuses.map((status, index) => (
                                    <Button
                                        key={index}
                                        variant={status === currentStatus ? 'primary' : 'outline-primary'}
                                        onClick={() => handleStatusChange(status)}
                                        className="me-2"
                                    >
                                        {status}
                                    </Button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="chat-card">
                        <Card.Header className="text-center">
                            <h5>Customer Chat</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="chat-window">
                                <ListGroup variant="flush">
                                    {chatMessages.map((message, index) => (
                                        <ListGroup.Item key={index} className={message.sender === 'Staff' ? 'staff-message' : 'system-message'}>
                                            <strong>{message.sender}: </strong> {message.text}
                                            <span className="timestamp">{message.timestamp}</span>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                            <Form onSubmit={handleChatSubmit} className="mt-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type your message..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="success" className="w-100 mt-2">
                                    Send Message
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ReservationPage;
