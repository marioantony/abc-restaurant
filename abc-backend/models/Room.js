// models/Room.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', RoomSchema);
