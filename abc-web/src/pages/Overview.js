import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';
import { FaDollarSign, FaShoppingCart, FaUsers, FaBed } from 'react-icons/fa';
import './css/Overview.css';

function Overview() {
    // Example data for visualization (these could be dynamically fetched)
    const totalOrders = 120;
    const totalRevenue = 3580;
    const totalCustomers = 85;
    const bookedRooms = 14;
    const availableRooms = 26;

    return (
        <Container fluid className="overview-container">
            {/* Page Header */}
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center overview-header">Dashboard Overview</h1>
                    <p className="text-center text-muted">Welcome! Here's a snapshot of your business today.</p>
                </Col>
            </Row>

            {/* Statistic Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaShoppingCart size={40} className="stat-icon" />
                            <Card.Title>Total Orders</Card.Title>
                            <Card.Text>{totalOrders}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaDollarSign size={40} className="stat-icon" />
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>${totalRevenue}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaUsers size={40} className="stat-icon" />
                            <Card.Title>Total Customers</Card.Title>
                            <Card.Text>{totalCustomers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaBed size={40} className="stat-icon" />
                            <Card.Title>Booked Rooms</Card.Title>
                            <Card.Text>{bookedRooms}/{availableRooms}</Card.Text>
                            <ProgressBar now={(bookedRooms / (bookedRooms + availableRooms)) * 100} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Recent Orders Table */}
            <Row className="mb-4">
                <Col>
                    <Card className="orders-card">
                        <Card.Header className="text-center">
                            <h5>Recent Orders</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Customer Name</th>
                                    <th>Food Item</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Burger</td>
                                    <td>$8.99</td>
                                    <td>Sept 12, 2024</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jane Smith</td>
                                    <td>Pizza</td>
                                    <td>$15.49</td>
                                    <td>Sept 12, 2024</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Sam Wilson</td>
                                    <td>Pasta</td>
                                    <td>$12.89</td>
                                    <td>Sept 11, 2024</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Room Booking Status */}
            <Row>
                <Col md={6}>
                    <Card className="room-status-card">
                        <Card.Header className="text-center">
                            <h5>Room Booking Status</h5>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Booked Rooms:</strong> {bookedRooms}</p>
                            <p><strong>Available Rooms:</strong> {availableRooms}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="vacating-card">
                        <Card.Header className="text-center">
                            <h5>Vacating Time Countdown</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Room #102 vacating in 1 hour, 30 minutes.</p>
                            <p>Room #201 vacating in 2 hours, 45 minutes.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Overview;
