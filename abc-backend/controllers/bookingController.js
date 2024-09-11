
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { DateTime } = require('luxon');

// POST /api/rooms/book
exports.bookRoom = async (req, res) => {
    try {
        const { userId, roomId, fromDate, toDate, childrenCount, adultCount, roomCategory,vacatingInSeconds } = req.body;

        // Validate input
        if (!userId || !roomId || !fromDate || !toDate || !adultCount || !roomCategory || vacatingInSeconds) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Convert dates using Luxon for validation and formatting
        const start = DateTime.fromISO(fromDate);
        const end = DateTime.fromISO(toDate);

        if (start >= end) {
            return res.status(400).json({ error: 'Invalid booking dates' });
        }

        // Check room availability (for simplicity assuming no overlapping bookings are allowed)
        const existingBooking = await Booking.findOne({
            roomId,
            $or: [
                { fromDate: { $lte: end.toJSDate() }, toDate: { $gte: start.toJSDate() } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Room is not available for the selected dates' });
        }

        // Create new booking
        const newBooking = new Booking({
            userId,
            roomId,
            fromDate: start.toJSDate(),
            toDate: end.toJSDate(),
            vacatingInSeconds,
            childrenCount,
            adultCount,
            roomCategory
        });

        await newBooking.save();

        return res.status(201).json({
            message: 'Room booked successfully!',
            booking: newBooking
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.bookings = async (req, res) => {
    try {
        // Fetch all rooms from the database
        const booking = await Booking.find(); // Find all rooms
        return res.status(200).json({
            message: 'Rooms fetched successfully!',
            data: booking
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
