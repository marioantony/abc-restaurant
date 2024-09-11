// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms} = require('../controllers/roomController');

// POST /api/rooms/create
router.post('/create', createRoom);
router.get('/', getAllRooms);

module.exports = router;
