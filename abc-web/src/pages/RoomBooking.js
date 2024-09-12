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
    const [newRoom, setNewRoom] = useState({
        name: '',
        category: 'Standard',
        capacity: 1,
        price: 0,
        availability:true
    });
    const [availableRooms, setAvailableRooms] = useState([]);

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
            vacatingInSeconds: Duration.fromMillis(
                DateTime.fromISO(newBooking.toDate).toMillis() - DateTime.now().toMillis()
            ).as('seconds'),
        };

        try {
            const response = await axios.post('/api/room/booking', newBookingEntry);
            setBookings([...bookings, response.data.booking]);
            // After booking, set room availability to false
            await axios.patch(`/api/rooms/${newBooking.roomId}/availability`, { availability: false });
            setNewBooking({
                userId:'66e04be8bc0dc28f69aa183b',
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

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setNewBooking((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'roomCategory') {
            // Fetch rooms based on the selected category
            try {
                const response = await axios.get(`/api/rooms?category=${value}`);

                let cat = response.data.data.filter((e) => {
                   return e.category === value;
                });
                setAvailableRooms(cat); // Assuming rooms are returned in this structure
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        }
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
            await axios.delete(`/api/room/rooms/${bookingId}`);
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            console.error('Error vacating booking:', error);
        }
    };

    // Handle input change
    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom((prev) => ({
            ...prev,
            [name]: value
        }));
    };

// Handle room creation submission
    const handleRoomCreation = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/rooms/create', newRoom); // Your room creation API endpoint
            console.log('Room created:', response.data);
            setNewRoom({
                name: '',
                category: 'Standard',
                capacity: 1,
                price: 0,
                availability:true
            });
            alert('Room created successfully');
        } catch (error) {
            console.error('Error creating room:', error);
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
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomSelection">
                                        <Form.Label>Select Room</Form.Label>
                                        <Form.Select
                                            name="roomId"
                                            value={newBooking.roomId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {availableRooms.length === 0 ? (
                                                <option value="">No rooms available</option>
                                            ) : (
                                                availableRooms.map((room) => (
                                                    <option key={room._id} value={room._id}>
                                                        {room.name} - Capacity: {room.capacity}, Price: {room.price}
                                                    </option>
                                                ))
                                            )}
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


                <Tab eventKey="createRoom" title="Create Room">
                    <Card className="p-4 shadow booking-card">
                        <h4 className="mb-3">Create a New Room</h4>
                        <Form onSubmit={handleRoomCreation}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomName">
                                        <Form.Label>Room Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={newRoom.name}
                                            onChange={handleRoomInputChange}
                                            placeholder="Enter room name"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomCategory">
                                        <Form.Label>Room Category</Form.Label>
                                        <Form.Select
                                            name="category"
                                            value={newRoom.category}
                                            onChange={handleRoomInputChange}
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
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomCapacity">
                                        <Form.Label>Capacity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="capacity"
                                            value={newRoom.capacity}
                                            onChange={handleRoomInputChange}
                                            min="1"
                                            placeholder="Enter room capacity"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="roomPrice">
                                        <Form.Label>Price (per day)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={newRoom.price}
                                            onChange={handleRoomInputChange}
                                            placeholder="Enter price"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Create Room
                            </Button>
                        </Form>
                    </Card>
                </Tab>

            </Tabs>
        </div>
    );
}

export default RoomBooking;
