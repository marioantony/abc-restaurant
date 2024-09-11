import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Button, Table, Row, Col, Card } from 'react-bootstrap';
import { DateTime, Duration } from 'luxon';
import axios from '../services/api';
import './css/RoomBooking.css'; // Import the CSS file for additional styling

const roomCategories = ['Standard', 'Deluxe', 'Suite'];

function RoomBooking() {
    const [activeTab, setActiveTab] = useState('booking');
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        userId:'66e04be8bc0dc28f69aa183b',
        roomId:'66e19b0021caf61bbee53a13',
        fromDate: '',
        toDate: '',
        childrenCount: 0,
        adultCount: 1,
        roomCategory: 'Standard',

    });

    // Handle the countdown for each booking
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/room');
                console.log(response.data);  // This is the complete response object
                setBookings(response.data.data);  // Set the "data" array into the "bookings" state
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Handle form submission
    const handleBooking = async (e) => {
        e.preventDefault();
        const newBookingEntry = {
            ...newBooking,
            // vacatingInSeconds: Duration.fromMillis(
            //     DateTime.fromISO(newBooking.toDate).toMillis() - DateTime.now().toMillis()
            // ).as('seconds'),
        };

        try {
            const response = await axios.post('/api/room/booking', newBookingEntry);
            setBookings([...bookings, response.data.booking]);
            setNewBooking({
                userId:'',
                roomId:'',
                fromDate: '',
                toDate: '',
                childrenCount: 0,
                adultCount: 1,
                roomCategory: 'Standard',

            });
        } catch (error) {
            console.error('Error creating booking:', error);
        }
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

    const handleVacate = async (bookingId) => {
        try {
            // Assuming you have a DELETE API to remove a booking
            await axios.delete(`/api/room/${bookingId}`);
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            console.error('Error vacating booking:', error);
        }
    };
    return (
        <div className="room-booking-container">
            <h2 className="text-center my-4">Room reservation</h2>
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
                                            name="adultCount"
                                            value={newBooking.adultCount}
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
                                            name="childrenCount"
                                            value={newBooking.childrenCount}
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
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        <td>{DateTime.fromISO(booking.fromDate).toFormat('yyyy-MM-dd')}</td>
                                        <td>{DateTime.fromISO(booking.toDate).toFormat('yyyy-MM-dd')}</td>
                                        <td>{booking.adultCount}</td>
                                        <td>{booking.childrenCount}</td>
                                        <td>{booking.roomCategory}</td>
                                        <td>{formatSeconds(booking.vacatingInSeconds)}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleVacate(booking._id)}
                                            >
                                                Vacate
                                            </Button>
                                        </td>
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
