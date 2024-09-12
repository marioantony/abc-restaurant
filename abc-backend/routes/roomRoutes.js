// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms, patchRooms} = require('../controllers/roomController');

// POST /api/rooms/create
router.post('/create', createRoom);
router.get('/', getAllRooms);
router.patch('/:roomId/availability', patchRooms);

module.exports = router;
