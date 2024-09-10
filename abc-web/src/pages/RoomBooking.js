import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Button, Table, Row, Col, Card } from 'react-bootstrap';
import { DateTime, Duration } from 'luxon';
import './css/RoomBooking.css'; // Import the CSS file for additional styling

const roomCategories = ['Standard', 'Deluxe', 'Suite'];

function RoomBooking() {
    const [activeTab, setActiveTab] = useState('booking');
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        fromDate: '',
        toDate: '',
        adults: 1,
        children: 0,
        roomCategory: 'Standard',
    });

    // Handle the countdown for each booking
    useEffect(() => {
        const interval = setInterval(() => {
            setBookings((prevBookings) =>
                prevBookings.map((booking) => {
                    const vacatingInSeconds = Duration.fromMillis(
                        DateTime.fromISO(booking.toDate).toMillis() - DateTime.now().toMillis()
                    ).as('seconds');
                    return { ...booking, vacatingInSeconds: vacatingInSeconds > 0 ? vacatingInSeconds : 0 };
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [bookings]);

    // Handle form submission
    const handleBooking = (e) => {
        e.preventDefault();
        const newBookingEntry = {
            ...newBooking,
            vacatingInSeconds: Duration.fromMillis(
                DateTime.fromISO(newBooking.toDate).toMillis() - DateTime.now().toMillis()
            ).as('seconds'),
        };
        setBookings([...bookings, newBookingEntry]);
        setNewBooking({
            fromDate: '',
            toDate: '',
            adults: 1,
            children: 0,
            roomCategory: 'Standard',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBooking((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formatSeconds = (seconds) => {
        const duration = Duration.fromObject({ seconds });
        const days = duration.days;
        const hours = duration.hours;
        const minutes = duration.minutes;
        return `${days}d ${hours}h ${minutes}m`;
    };

    return (
        <div className="room-booking-container">
            <Tabs
                id="room-booking-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                {/* Room Booking Tab */}
                <Tab eventKey="booking" title="Room Booking">
                    <Card className="p-4 shadow booking-card">
                        <h4 className="mb-3">Book a Room</h4>
                        <Form onSubmit={handleBooking}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="fromDate">
                                        <Form.Label>From Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="fromDate"
                                            value={newBooking.fromDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="toDate">
                                        <Form.Label>To Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="toDate"
                                            value={newBooking.toDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="adults">
                                        <Form.Label>Adults</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="adults"
                                            value={newBooking.adults}
                                            min="1"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="children">
                                        <Form.Label>Children</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="children"
                                            value={newBooking.children}
                                            min="0"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomCategory">
                                        <Form.Label>Room Category</Form.Label>
                                        <Form.Select
                                            name="roomCategory"
                                            value={newBooking.roomCategory}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {roomCategories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Book Now
                            </Button>
                        </Form>
                    </Card>
                </Tab>

                {/* Booking History Tab */}
                <Tab eventKey="history" title="Booking History">
                    <Card className="p-4 shadow booking-card">
                        <h4 className="mb-3">Booking History</h4>
                        {bookings.length === 0 ? (
                            <p>No bookings found.</p>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Adults</th>
                                    <th>Children</th>
                                    <th>Room Category</th>
                                    <th>Vacating Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{DateTime.fromISO(booking.fromDate).toFormat('yyyy-MM-dd')}</td>
                                        <td>{DateTime.fromISO(booking.toDate).toFormat('yyyy-MM-dd')}</td>
                                        <td>{booking.adults}</td>
                                        <td>{booking.children}</td>
                                        <td>{booking.roomCategory}</td>
                                        <td>{formatSeconds(booking.vacatingInSeconds)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}

export default RoomBooking;
