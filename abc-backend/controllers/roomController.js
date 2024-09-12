// controllers/roomController.js
const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try {
        const { name, category, capacity, price, availability } = req.body;

        // Input validation
        if (!name || !category || !capacity || price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new room
        const newRoom = new Room({
            name,
            category,
            capacity,
            price,
            availability: availability !== undefined ? availability : true
        });

        // Save room to the database
        await newRoom.save();

        return res.status(201).json({
            message: 'Room created successfully!',
            room: newRoom
        });
    } catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        // Fetch all rooms from the database
        const rooms = await Room.find(); // Find all rooms
        return res.status(200).json({
            message: 'Rooms fetched successfully!',
            data: rooms
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.patchRooms = async (req, res) => {
    const { roomId } = req.params;
    const { availability } = req.body; // Expecting { availability: true/false } in request body

    try {
        // Find the room by ID and update its availability status
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { availability },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json({
            message: 'Room availability updated successfully',
            room: updatedRoom,
        });
    } catch (error) {
        console.error('Error updating room availability:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};