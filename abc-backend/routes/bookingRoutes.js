
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to book a room
router.post('/booking', bookingController.bookRoom);
router.get('/', bookingController.bookings);
router.delete('/rooms/:id', bookingController.deleteBooking);
module.exports = router;
