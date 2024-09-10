// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/user/register', formData);
            console.log(response,"response")
            alert(response.data.message);
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <h2 className="text-center my-4">Register</h2>
                <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f9f9f9' }}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="customer">Customer</option>
                        </Form.Control>

                    </Form.Group>
                   

                    <Button variant="primary" type="submit" className="w-100">
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
)
};

export default RegisterForm;
